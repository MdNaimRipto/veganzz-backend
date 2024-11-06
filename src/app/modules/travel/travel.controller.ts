import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { TravelsService } from "./travel.service";

// Upload Travel
const uploadTravels = catchAsync(async (req: Request, res: Response) => {
  const { ...payload } = req.body;

  const result = await TravelsService.uploadTravels(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Travel Location Uploaded Successfully",
    data: result,
  });
});

// Upload Travel
const getAllTravelLocations = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TravelsService.getAllTravelLocations();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Travels Retrieved Successfully",
      data: result,
    });
  },
);

// Upload Travel
const getTravelLocationDetails = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await TravelsService.getTravelLocationDetails(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Travel Retrieved Successfully",
      data: result,
    });
  },
);

// Upload Travel
const updateTravelLocations = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { ...payload } = req.body;

    const result = await TravelsService.updateTravelLocations(id, payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Travel Updated Successfully",
      data: result,
    });
  },
);

export const TravelsController = {
  uploadTravels,
  getAllTravelLocations,
  getTravelLocationDetails,
  updateTravelLocations,
};
