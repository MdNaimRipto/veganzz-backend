import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IBeauty } from "./beauty.interface";
import { Beauty } from "./beauty.schema";

const uploadBeauty = async (payload: IBeauty): Promise<IBeauty | null> => {
  const result = await Beauty.create(payload);
  return result;
};

const getAllBeauty = async (): Promise<IBeauty[]> => {
  const result = await Beauty.find({});
  return result;
};

const updateBeauty = async (
  id: string,
  payload: Partial<IBeauty>,
): Promise<IBeauty | null> => {
  const isProductExists = await Beauty.findOne({ _id: id });
  if (!isProductExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product Not Found!");
  }

  const result = await Beauty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteBeauty = async (id: string): Promise<IBeauty | null> => {
  const isBeautyExists = await Beauty.findOne({ _id: id });
  if (!isBeautyExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Beauty Not Found");
  }

  const result = await Beauty.findOneAndDelete(
    { _id: id },
    {
      new: true,
    },
  );

  return result;
};

export const BeautyService = {
  uploadBeauty,
  getAllBeauty,
  updateBeauty,
  deleteBeauty,
};
