import { Types } from "mongoose";
import { IUser } from "../users/users.interface";

export type reviewForEnumTypes =
  | "BOOK"
  | "RECIPE"
  | "TRAVEL_DINING"
  | "TRAVEL_FOOD"
  | "TRAVEL_COSMETICS";

export type reviewStatusEnums = "PENDING" | "APPROVED" | "BLOCKED";

export interface IReviews {
  userId: Types.ObjectId | Partial<IUser>;
  productId: string;
  reviewFor: reviewForEnumTypes;
  reviewedOn: string;
  rating: number;
  review: string;
  reviewStatus: reviewStatusEnums;
}

export interface IReviewsFilters {
  reviewStatus?: reviewStatusEnums;
  reviewedOn?: string;
}
