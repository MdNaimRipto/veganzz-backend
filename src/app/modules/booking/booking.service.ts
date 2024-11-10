import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IBooking, IBookingFilters } from "./booking.interface";
import { Bookings } from "./booking.schema";
import { Users } from "../users/users.schema";
import { EBook } from "../eBook/eBook.schema";
import { generateOrderId } from "./booking.utils";
import {
  IGenericPaginationResponse,
  IPaginationOptions,
} from "../../../interface/pagination";
import { calculatePaginationFunction } from "../../../helpers/paginationHelpers";
import { SortOrder } from "mongoose";

const bookProducts = async (payload: IBooking): Promise<IBooking | null> => {
  const { userId, productId } = payload;

  const isUserExists = await Users.findOne({ _id: userId }, { _id: 1 });
  if (!isUserExists) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "User Does not Exists!");
  }

  const isProductExists = await EBook.findOne({ _id: productId }, { _id: 1 });
  if (!isProductExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product Does not Exists!");
  }

  const isProductAlreadyBooked = await Bookings.findOne({
    $and: [{ userId }, productId],
  });
  if (isProductAlreadyBooked) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Product Already Booked!");
  }

  const orderId = generateOrderId();

  payload.orderId = String(orderId);

  const result = await Bookings.create(payload);
  return result;
};

const getAllBookedProducts = async (
  filters: IBookingFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericPaginationResponse<IBooking[]>> => {
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

  const result = await Bookings.find(checkAndCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Bookings.countDocuments(checkAndCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getUsersAllBookedProducts = async (
  userId: string,
): Promise<IBooking[]> => {
  const result = await Bookings.find({ userId });
  return result;
};

export const BookingsService = {
  bookProducts,
  getAllBookedProducts,
  getUsersAllBookedProducts,
};
