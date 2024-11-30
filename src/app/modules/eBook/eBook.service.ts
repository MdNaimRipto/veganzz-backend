import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IEBook, IEBookFilters } from "./eBook.interface";
import { EBook } from "./eBook.schema";
import {
  IGenericPaginationResponse,
  IPaginationOptions,
} from "../../../interface/pagination";
import { calculatePaginationFunction } from "../../../helpers/paginationHelpers";
import { SortOrder } from "mongoose";

const uploadEBook = async (payload: IEBook): Promise<IEBook | null> => {
  const result = await EBook.create(payload);
  return result;
};

const getAllEBook = async (
  filters: IEBookFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericPaginationResponse<IEBook[]>> => {
  //
  const andConditions = [];
  if (Object.keys(filters).length) {
    andConditions.push({
      $and: Object.entries(filters).map(([field, value]) => {
        return { [field]: value };
      }),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePaginationFunction(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const checkAndCondition =
    andConditions?.length > 0 ? { $and: andConditions } : {};

  const result = await EBook.find(checkAndCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await EBook.countDocuments(checkAndCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateEBook = async (
  id: string,
  payload: Partial<IEBook>,
): Promise<IEBook | null> => {
  const isProductExists = await EBook.findOne({ _id: id });
  if (!isProductExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product Not Found!");
  }

  const { productType, dateAdded, ...restPayload } = payload;

  if (productType !== undefined || dateAdded !== undefined) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Type And Date Added cannot be updatable",
    );
  }

  const updatablePayload = restPayload as any;

  const result = await EBook.findOneAndUpdate({ _id: id }, updatablePayload, {
    new: true,
  });

  return result;
};

const deleteEBook = async (id: string): Promise<IEBook | null> => {
  const isEBookExists = await EBook.findOne({ _id: id });
  if (!isEBookExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "EBook Not Found");
  }

  const result = await EBook.findOneAndDelete(
    { _id: id },
    {
      new: true,
    },
  );

  return result;
};

export const EBookService = {
  uploadEBook,
  getAllEBook,
  updateEBook,
  deleteEBook,
};
