import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/shared";
import { paginationFields } from "../../../constants/pagination.constant";
import { WishlistsService } from "./wishlist.service";

// Upload Travel
const uploadWishlist = catchAsync(async (req: Request, res: Response) => {
  const { ...payload } = req.body;

  const result = await WishlistsService.uploadWishlist(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Wishlist Added Successfully",
    data: result,
  });
});

const getUserWishlists = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await WishlistsService.getUserWishlists(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Wishlists Retrieved Successfully",
    data: result,
  });
});

const isAddedWishlist = catchAsync(async (req: Request, res: Response) => {
  const { userId, productId } = req.query;

  console.log({ userId, productId });

  const result = await WishlistsService.isAddedWishlist(
    String(userId),
    String(productId),
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Wishlists Checked",
    data: result,
  });
});

// Delete
const deleteWishlist = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await WishlistsService.deleteWishlist(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Wishlist Deleted Successfully",
    data: result,
  });
});

export const WishlistsController = {
  uploadWishlist,
  getUserWishlists,
  isAddedWishlist,
  deleteWishlist,
};
