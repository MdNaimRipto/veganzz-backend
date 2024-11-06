import { Request, Response } from "express";
import catchAsync from "../../../../shared/catchAsync";
import sendResponse from "../../../../shared/sendResponse";
import httpStatus from "http-status";
import { TravelHelpersService } from "./helpers.service";
import { Types } from "mongoose";
import { travelHelperCategoryEnums } from "./helpers.interface";

// Upload Travel
const uploadTravelHelpers = catchAsync(async (req: Request, res: Response) => {
  const { ...payload } = req.body;

  const result = await TravelHelpersService.uploadTravelHelpers(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Travel Helper Uploaded Successfully",
    data: result,
  });
});

// Upload Travel
const getAllTravelHelpers = catchAsync(async (req: Request, res: Response) => {
  const { travelId } = req.params;
  const { category } = req.query;
  const result = await TravelHelpersService.getAllTravelHelpers(
    travelId as unknown as Types.ObjectId,
    category as travelHelperCategoryEnums,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Travels Retrieved Successfully",
    data: result,
  });
});

// Upload Travel
const updateTravelHelper = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...payload } = req.body;

  const result = await TravelHelpersService.updateTravelHelper(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Helper Updated Successfully",
    data: result,
  });
});

export const TravelHelpersController = {
  uploadTravelHelpers,
  getAllTravelHelpers,
  updateTravelHelper,
};
