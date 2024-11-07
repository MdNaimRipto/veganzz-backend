import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { EBookService } from "./booking.service";

// Upload Travel
const uploadEBook = catchAsync(async (req: Request, res: Response) => {
  const { ...payload } = req.body;

  const result = await EBookService.uploadEBook(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Book Uploaded Successfully",
    data: result,
  });
});

// Upload Travel
const getAllEBook = catchAsync(async (req: Request, res: Response) => {
  const result = await EBookService.getAllEBook();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Books Retrieved Successfully",
    data: result,
  });
});

// Upload Travel
const updateEBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...payload } = req.body;

  const result = await EBookService.updateEBook(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Book Updated Successfully",
    data: result,
  });
});

export const EBookController = {
  uploadEBook,
  getAllEBook,
  updateEBook,
};
