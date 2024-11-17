import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { ICarousal } from "./carousal.interface";
import { Carousal } from "./carousal.schema";

const uploadCarousal = async (payload: ICarousal): Promise<ICarousal> => {
  const result = await Carousal.create(payload);
  return result;
};

const getAllCarousals = async (): Promise<ICarousal[]> => {
  const result = await Carousal.find({});
  return result;
};

const getActiveCarousals = async (): Promise<ICarousal[]> => {
  const result = await Carousal.find({ status: "ACTIVE" });
  return result;
};

const updateCarousal = async (
  id: string,
  payload: Partial<ICarousal>,
): Promise<ICarousal | null> => {
  const isCarousalExists = await Carousal.findOne({ _id: id });
  if (!isCarousalExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Carousal Not Found");
  }

  if (payload.status) {
    const status = payload.status;

    console.log(status);

    if (status !== "ACTIVE" && status !== "PAUSED") {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Status Must Be Active or Paused!",
      );
    }
  }

  const result = await Carousal.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteCarousal = async (id: string): Promise<ICarousal | null> => {
  const isCarousalExists = await Carousal.findOne({ _id: id });
  if (!isCarousalExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Carousal Not Found");
  }

  const result = await Carousal.findOneAndDelete(
    { _id: id },
    {
      new: true,
    },
  );

  return result;
};

export const CarousalService = {
  uploadCarousal,
  getAllCarousals,
  getActiveCarousals,
  updateCarousal,
  deleteCarousal,
};
