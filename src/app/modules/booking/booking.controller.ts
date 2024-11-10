import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { BookingsService } from "./booking.service";
import { BookingFilterableFields } from "./booking.constant";
import { paginationFields } from "../../../constants/pagination.constant";
import pick from "../../../shared/shared";

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
  const filters = pick(req.query, BookingFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await BookingsService.getAllBookedProducts(filters, options);

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
