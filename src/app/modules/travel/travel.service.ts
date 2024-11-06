import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { ITravel } from "./travel.interface";
import { Travels } from "./travel.schema";

const uploadTravels = async (payload: ITravel): Promise<ITravel | null> => {
  const result = await Travels.create(payload);
  return result;
};

const getAllTravelLocations = async (): Promise<ITravel[]> => {
  const result = await Travels.find({});
  return result;
};

const getTravelLocationDetails = async (
  id: string,
): Promise<ITravel | null> => {
  const result = await Travels.findOne({ _id: id });
  return result;
};

const updateTravelLocations = async (
  id: string,
  payload: Partial<ITravel>,
): Promise<ITravel | null> => {
  const isLocationExists = await Travels.findOne({ _id: id });
  if (!isLocationExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Location Not Found!");
  }

  const result = await Travels.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

export const TravelsService = {
  uploadTravels,
  getAllTravelLocations,
  getTravelLocationDetails,
  updateTravelLocations,
};
