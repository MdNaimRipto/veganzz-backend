import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import {
  IReviews,
  IReviewsFilters,
  reviewForEnumTypes,
} from "./reviews.interface";
import { Reviews } from "./reviews.schema";
import { Users } from "../users/users.schema";
import { EBook } from "../eBook/eBook.schema";
import config from "../../../config/config";
import {
  IGenericPaginationResponse,
  IPaginationOptions,
} from "../../../interface/pagination";
import { calculatePaginationFunction } from "../../../helpers/paginationHelpers";
import { SortOrder } from "mongoose";
import { Recipes } from "../recipes/recipes.schema";
import { TravelHelpers } from "../travel/helpers/helpers.schema";

const uploadReview = async (payload: IReviews): Promise<IReviews | null> => {
  const { userId, productId, reviewFor } = payload;

  const isUserExists = await Users.findOne({ _id: userId }, { _id: 1 });
  if (!isUserExists) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "User Does not Exists!");
  }

  if (reviewFor === "BOOK") {
    const isProductExists = await EBook.findOne({ _id: productId }, { _id: 1 });
    if (!isProductExists) {
      throw new ApiError(httpStatus.NOT_FOUND, "Product Does not Exists!");
    }
  }

  if (reviewFor === "RECIPE") {
    const isProductExists = await Recipes.findOne(
      { _id: productId },
      { _id: 1 },
    );
    if (!isProductExists) {
      throw new ApiError(httpStatus.NOT_FOUND, "Recipe Does not Exists!");
    }
  }

  if (
    reviewFor === "TRAVEL_COSMETICS" ||
    reviewFor === "TRAVEL_DINING" ||
    reviewFor === "TRAVEL_FOOD"
  ) {
    const isProductExists = await TravelHelpers.findOne(
      { _id: productId },
      { _id: 1 },
    );
    if (!isProductExists) {
      throw new ApiError(httpStatus.NOT_FOUND, "Helper Does not Exists!");
    }
  }

  const isReviewAlreadyExists = await Reviews.findOne({
    $and: [{ userId }, { productId }],
  });
  if (isReviewAlreadyExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, "One Review Already Added!");
  }

  const result = await Reviews.create(payload);
  return result;
};

const updateReviewStatus = async (payload: {
  userId: string;
  reviewId: string;
  reviewStatus: reviewForEnumTypes;
}): Promise<IReviews | null> => {
  const { userId, reviewId, reviewStatus } = payload;

  const isUserExists = await Users.findOne({ _id: userId });
  if (!isUserExists) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "User Does not Exists!");
  }

  if (isUserExists.uid !== config.admin_uid) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Unauthorized User. Only Admin Can Update Review Status!",
    );
  }

  const isReviewExists = await Reviews.findOne({ _id: reviewId });
  if (!isReviewExists) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Review Does not Exists!");
  }

  const result = await Reviews.findOneAndUpdate(
    { _id: reviewId },
    { reviewStatus: reviewStatus },
    { new: true },
  );

  return result;
};

const getAllReviews = async (
  filters: IReviewsFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericPaginationResponse<IReviews[]>> => {
  const andConditions = [];
  if (Object.keys(filters).length) {
    andConditions.push({
      $and: Object.entries(filters).map(([field, value]) => {
        return { [field]: value };
      }),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePaginationFunction(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const checkAndCondition =
    andConditions?.length > 0 ? { $and: andConditions } : {};

  const result = await Reviews.find(checkAndCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate({
      path: "userId",
      select: "name _id profileImage",
    });

  const total = await Reviews.countDocuments(checkAndCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getAllReviewsByProduct = async (
  productId: string,
): Promise<IReviews[]> => {
  const result = await Reviews.find({
    $and: [{ productId }, { reviewStatus: "APPROVED" }],
  }).populate({
    path: "userId",
    select: "name _id profileImage",
  });
  return result;
};

const getProductsReviewAndRatingCount = async (productId: string) => {
  const totalReviews = await Reviews.countDocuments({
    $and: [{ productId }, { reviewStatus: "APPROVED" }],
  });

  const rating = await Reviews.aggregate([
    { $match: { productId, reviewStatus: "APPROVED" } },
    { $group: { _id: "$productId", avgRating: { $avg: "$rating" } } },
  ]);

  let avgRating = rating.length > 0 ? rating[0] : 0;
  avgRating = Math.min(Math.max(avgRating, 0), 5);
  return {
    totalReviews: totalReviews,
    totalRatings: totalReviews,
    avgRating: avgRating,
  };
};

export const ReviewsService = {
  uploadReview,
  getAllReviews,
  getAllReviewsByProduct,
  getProductsReviewAndRatingCount,
  updateReviewStatus,
};
