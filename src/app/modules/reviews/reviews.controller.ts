import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ReviewsService } from "./reviews.service";
import { ReviewsFilterableFields } from "./reviews.constant";
import pick from "../../../shared/shared";
import { paginationFields } from "../../../constants/pagination.constant";

// Upload Travel
const uploadReview = catchAsync(async (req: Request, res: Response) => {
  const { ...payload } = req.body;

  const result = await ReviewsService.uploadReview(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Review Added Successfully",
    data: result,
  });
});

// Update Status
const updateReviewStatus = catchAsync(async (req: Request, res: Response) => {
  const { ...payload } = req.body;

  const result = await ReviewsService.updateReviewStatus(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Review Status Updated Successfully",
    data: result,
  });
});

// Upload Travel
const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ReviewsFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await ReviewsService.getAllReviews(filters, options);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Reviews Products Retrieved Successfully",
    data: result,
  });
});

const getAllReviewsByProduct = catchAsync(
  async (req: Request, res: Response) => {
    const { productId } = req.params;
    const result = await ReviewsService.getAllReviewsByProduct(productId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Reviews Retrieved Successfully",
      data: result,
    });
  },
);

const getProductsReviewAndRatingCount = catchAsync(
  async (req: Request, res: Response) => {
    const { productId } = req.params;
    const result =
      await ReviewsService.getProductsReviewAndRatingCount(productId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Reviews Retrieved Successfully",
      data: result,
    });
  },
);

export const ReviewsController = {
  uploadReview,
  updateReviewStatus,
  getAllReviews,
  getAllReviewsByProduct,
  getProductsReviewAndRatingCount,
};
