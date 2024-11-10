import { model, Schema, Types } from "mongoose";
import { IReviews } from "./reviews.interface";
import { ReviewForEnumTypes, ReviewStatusEnums } from "./reviews.constant";

const reviewsSchema = new Schema<IReviews>({
  userId: { type: Types.ObjectId, required: true, ref: "Users" },
  productId: { type: String, required: true },
  reviewFor: { type: String, enum: ReviewForEnumTypes, required: true },
  reviewedOn: { type: String, required: true },
  review: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  reviewStatus: {
    type: String,
    enum: ReviewStatusEnums,
    required: true,
    default: "PENDING",
  },
});

export const Reviews = model<IReviews>("Reviews", reviewsSchema);
