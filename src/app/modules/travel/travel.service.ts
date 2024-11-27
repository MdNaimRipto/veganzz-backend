import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { ITravel } from "./travel.interface";
import { Travels } from "./travel.schema";
import { TravelHelpers } from "./helpers/helpers.schema";

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

const deleteTravel = async (id: string): Promise<ITravel | null> => {
  const session = await Travels.startSession();
  session.startTransaction();

  try {
    const isTravelExists = await Travels.findById(id).session(session);
    if (!isTravelExists) {
      throw new ApiError(httpStatus.NOT_FOUND, "Travel Not Found");
    }

    const result = await Travels.findByIdAndDelete(id, { session });
    if (!result) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to delete travel",
      );
    }

    await TravelHelpers.deleteMany({ helperFor: id }).session(session);

    await session.commitTransaction();
    session.endSession();

    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const TravelsService = {
  uploadTravels,
  getAllTravelLocations,
  getTravelLocationDetails,
  updateTravelLocations,
  deleteTravel,
};
