import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { BeautyService } from "./beauty.service";
import { Types } from "mongoose";

// Upload Travel
const uploadBeauty = catchAsync(async (req: Request, res: Response) => {
  const { ...payload } = req.body;

  const result = await BeautyService.uploadBeauty(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Beauty Product Uploaded Successfully",
    data: result,
  });
});

// Upload Travel
const getAllBeauty = catchAsync(async (req: Request, res: Response) => {
  const result = await BeautyService.getAllBeauty();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Beauty Products Retrieved Successfully",
    data: result,
  });
});

// Upload Travel
const updateBeauty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...payload } = req.body;

  const result = await BeautyService.updateBeauty(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Beauty Product Updated Successfully",
    data: result,
  });
});

// Delete
const deleteBeauty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await BeautyService.deleteBeauty(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Beauty Deleted Successfully",
    data: result,
  });
});

export const BeautyController = {
  uploadBeauty,
  getAllBeauty,
  updateBeauty,
  deleteBeauty,
};
