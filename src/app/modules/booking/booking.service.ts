import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IEBook } from "./booking.interface";
import { EBook } from "./booking.schema";

const uploadEBook = async (payload: IEBook): Promise<IEBook | null> => {
  const { otherImages } = payload;

  if (!otherImages.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Other Images Cannot be Empty");
  }

  const result = await EBook.create(payload);
  return result;
};

const getAllEBook = async (): Promise<IEBook[]> => {
  const result = await EBook.find({});
  return result;
};

const updateEBook = async (
  id: string,
  payload: Partial<IEBook>,
): Promise<IEBook | null> => {
  const isProductExists = await EBook.findOne({ _id: id });
  if (!isProductExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product Not Found!");
  }

  const { otherImages, ...restPayload } = payload;

  const updatablePayload = restPayload as any;

  if (otherImages) {
    updatablePayload.otherImages = otherImages;
  }

  const result = await EBook.findOneAndUpdate({ _id: id }, updatablePayload, {
    new: true,
  });

  return result;
};

export const EBookService = {
  uploadEBook,
  getAllEBook,
  updateEBook,
};
