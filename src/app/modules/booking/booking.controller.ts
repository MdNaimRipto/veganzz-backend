import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { BookingsService } from "./booking.service";

// Upload Travel
const bookProducts = catchAsync(async (req: Request, res: Response) => {
  const { ...payload } = req.body;

  const result = await BookingsService.bookProducts(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product Booked Successfully",
    data: result,
  });
});

// Upload Travel
const getAllBookedProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingsService.getAllBookedProducts();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booked Products Retrieved Successfully",
    data: result,
  });
});

const getUsersAllBookedProducts = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BookingsService.getUsersAllBookedProducts(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Booked Products Retrieved Successfully",
      data: result,
    });
  },
);

export const BookingsController = {
  bookProducts,
  getAllBookedProducts,
  getUsersAllBookedProducts,
};
