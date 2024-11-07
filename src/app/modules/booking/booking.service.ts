import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IBooking } from "./booking.interface";
import { Bookings } from "./booking.schema";
import { Users } from "../users/users.schema";
import { EBook } from "../eBook/eBook.schema";

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

  const result = await Bookings.create(payload);
  return result;
};

const getAllBookedProducts = async (): Promise<IBooking[]> => {
  const result = await Bookings.find({});
  return result;
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
