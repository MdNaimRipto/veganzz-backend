import { reviewForEnumTypes, reviewStatusEnums } from "./reviews.interface";

export const ReviewForEnumTypes: reviewForEnumTypes[] = [
  "BOOK",
  "RECIPE",
  "TRAVEL_DINING",
  "TRAVEL_FOOD",
  "TRAVEL_COSMETICS",
];

export const ReviewStatusEnums: reviewStatusEnums[] = [
  "PENDING",
  "APPROVED",
  "BLOCKED",
];

export const ReviewsFilterableFields = [
  "reviewStatus",
  "reviewedOn",
  "productId",
  "reviewFor",
];
