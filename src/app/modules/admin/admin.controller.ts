import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { AdminService } from "./admin.service";

// User Counts
const userCounts = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.userCounts();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Counts Retrieved Successfully",
    data: result,
  });
});

// Review Counts
const reviewCounts = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.reviewCounts();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Review Counts Retrieved Successfully",
    data: result,
  });
});

// Order Counts
const orderCounts = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.orderCounts();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order Counts Retrieved Successfully",
    data: result,
  });
});

export const AdminController = {
  userCounts,
  reviewCounts,
  orderCounts,
};
