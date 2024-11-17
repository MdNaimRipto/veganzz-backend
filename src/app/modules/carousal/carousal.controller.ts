import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { CarousalService } from "./carousal.service";

// Upload Carousal
const uploadCarousal = catchAsync(async (req: Request, res: Response) => {
  const { ...payload } = req.body;

  const result = await CarousalService.uploadCarousal(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Carousal Uploaded Successfully",
    data: result,
  });
});

// Get All
const getAllCarousals = catchAsync(async (req: Request, res: Response) => {
  const result = await CarousalService.getAllCarousals();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Carousal's Retrieved Successfully",
    data: result,
  });
});

// Get Actives
const getActiveCarousals = catchAsync(async (req: Request, res: Response) => {
  const result = await CarousalService.getActiveCarousals();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Carousal's Retrieved Successfully",
    data: result,
  });
});

// Update
const updateCarousal = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...payload } = req.body;

  const result = await CarousalService.updateCarousal(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Carousal Updated Successfully",
    data: result,
  });
});

// Update
const deleteCarousal = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await CarousalService.deleteCarousal(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Carousal Deleted Successfully",
    data: result,
  });
});

export const CarousalController = {
  uploadCarousal,
  getAllCarousals,
  getActiveCarousals,
  updateCarousal,
  deleteCarousal,
};
