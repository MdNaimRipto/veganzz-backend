import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { Users } from "../users/users.schema";
import { EBook } from "../eBook/eBook.schema";
import { Recipes } from "../recipes/recipes.schema";
import { TravelHelpers } from "../travel/helpers/helpers.schema";
import { IWishlist } from "./wishlist.interface";
import { Wishlists } from "./wishlist.schema";

const uploadWishlist = async (
  payload: IWishlist,
): Promise<IWishlist | null> => {
  const { userId, productId, wishlistFor } = payload;

  const isUserExists = await Users.findOne({ _id: userId }, { _id: 1 });
  if (!isUserExists) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "User Does not Exists!");
  }

  if (wishlistFor === "BOOK") {
    const isProductExists = await EBook.findOne({ _id: productId }, { _id: 1 });
    if (!isProductExists) {
      throw new ApiError(httpStatus.NOT_FOUND, "Product Does not Exists!");
    }
  }

  if (wishlistFor === "RECIPE") {
    const isProductExists = await Recipes.findOne(
      { _id: productId },
      { _id: 1 },
    );
    if (!isProductExists) {
      throw new ApiError(httpStatus.NOT_FOUND, "Recipe Does not Exists!");
    }
  }

  if (
    wishlistFor === "TRAVEL_COSMETICS" ||
    wishlistFor === "TRAVEL_DINING" ||
    wishlistFor === "TRAVEL_FOOD"
  ) {
    const isProductExists = await TravelHelpers.findOne(
      { _id: productId },
      { _id: 1 },
    );
    if (!isProductExists) {
      throw new ApiError(httpStatus.NOT_FOUND, "Helper Does not Exists!");
    }
  }

  const isReviewAlreadyExists = await Wishlists.findOne({
    $and: [{ userId }, { productId }],
  });
  if (isReviewAlreadyExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Already Added to Wishlist!");
  }

  const result = await Wishlists.create(payload);
  return result;
};

const getUserWishlists = async (userId: string): Promise<IWishlist[]> => {
  const result = await Wishlists.find({ userId });
  return result;
};

const isAddedWishlist = async (
  userId: string,
  productId: string,
): Promise<string | null> => {
  const isAdded = await Wishlists.findOne({
    $and: [{ userId }, { productId }],
  });
  if (isAdded) {
    return String(isAdded._id);
  } else {
    return null;
  }
};

const deleteWishlist = async (
  wishlistId: string,
): Promise<IWishlist | null> => {
  const isWishlistExists = await Wishlists.findOne(
    { _id: wishlistId },
    { _id: 1 },
  );
  if (!isWishlistExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Wishlist Does Not Exists");
  }

  const result = await Wishlists.findOneAndDelete(
    { _id: wishlistId },
    {
      new: true,
    },
  );

  return result;
};

export const WishlistsService = {
  uploadWishlist,
  getUserWishlists,
  isAddedWishlist,
  deleteWishlist,
};
