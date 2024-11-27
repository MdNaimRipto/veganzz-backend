import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { HouseHoldService } from "./houseHold.service";
import { Types } from "mongoose";

// Upload Travel
const uploadHouseHold = catchAsync(async (req: Request, res: Response) => {
  const { ...payload } = req.body;

  const result = await HouseHoldService.uploadHouseHold(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "House Hold Product Uploaded Successfully",
    data: result,
  });
});

// Upload Travel
const getAllHouseHold = catchAsync(async (req: Request, res: Response) => {
  const result = await HouseHoldService.getAllHouseHold();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "House Hold Products Retrieved Successfully",
    data: result,
  });
});

// Upload Travel
const updateHouseHold = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...payload } = req.body;

  const result = await HouseHoldService.updateHouseHold(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "House Hold Product Updated Successfully",
    data: result,
  });
});

// Delete
const deleteHouseHold = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await HouseHoldService.deleteHouseHold(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "HouseHold Deleted Successfully",
    data: result,
  });
});

export const HouseHoldController = {
  uploadHouseHold,
  getAllHouseHold,
  updateHouseHold,
  deleteHouseHold,
};
