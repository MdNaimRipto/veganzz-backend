import httpStatus from "http-status";
import { ITravelHelper, travelHelperCategoryEnums } from "./helpers.interface";
import { TravelHelpers } from "./helpers.schema";
import ApiError from "../../../../errors/ApiError";
import { Travels } from "../travel.schema";
import { Types } from "mongoose";

const uploadTravelHelpers = async (
  payload: ITravelHelper,
): Promise<ITravelHelper | null> => {
  const { rating, totalRating, helperFor } = payload;

  if (rating !== undefined || totalRating !== undefined) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Failed to Upload! Please Try Again.",
    );
  }

  const isTravelLocationExists = await Travels.findOne({ _id: helperFor });
  if (!isTravelLocationExists) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Travel Location Dose Not Exists!",
    );
  }

  const result = await TravelHelpers.create(payload);
  return result;
};

const getAllTravelHelpers = async (
  travelId: Types.ObjectId,
  category: travelHelperCategoryEnums,
): Promise<ITravelHelper[]> => {
  const result = await TravelHelpers.find({
    $and: [{ helperFor: travelId }, { category }],
  }).populate({
    path: "helperFor",
    select: "name _id",
  });
  return result;
};

const updateTravelHelper = async (
  id: string,
  payload: Partial<ITravelHelper>,
): Promise<ITravelHelper | null> => {
  const { rating, totalRating, helperFor, category } = payload;
  if (
    rating !== undefined ||
    totalRating !== undefined ||
    helperFor !== undefined ||
    category !== undefined
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Failed to Upload! Please Try Again.",
    );
  }

  const isHelperExists = await TravelHelpers.findOne({ _id: id });
  if (!isHelperExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Helper Not Found!");
  }

  const result = await TravelHelpers.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteTravelHelper = async (
  id: string,
): Promise<ITravelHelper | null> => {
  const isTravelHelperExists = await TravelHelpers.findOne({ _id: id });
  if (!isTravelHelperExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Travel Helper Not Found");
  }

  const result = await TravelHelpers.findOneAndDelete(
    { _id: id },
    {
      new: true,
    },
  );

  return result;
};

export const TravelHelpersService = {
  uploadTravelHelpers,
  getAllTravelHelpers,
  updateTravelHelper,
  deleteTravelHelper,
};
