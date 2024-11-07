import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IHouseHold } from "./houseHold.interface";
import { HouseHold } from "./houseHold.schema";

const uploadHouseHold = async (
  payload: IHouseHold,
): Promise<IHouseHold | null> => {
  const result = await HouseHold.create(payload);
  return result;
};

const getAllHouseHold = async (): Promise<IHouseHold[]> => {
  const result = await HouseHold.find({});
  return result;
};

const updateHouseHold = async (
  id: string,
  payload: Partial<IHouseHold>,
): Promise<IHouseHold | null> => {
  const isProductExists = await HouseHold.findOne({ _id: id });
  if (!isProductExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product Not Found!");
  }

  const result = await HouseHold.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

export const HouseHoldService = {
  uploadHouseHold,
  getAllHouseHold,
  updateHouseHold,
};
