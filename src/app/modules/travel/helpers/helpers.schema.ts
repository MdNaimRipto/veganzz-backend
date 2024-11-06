import { model, Schema, Types } from "mongoose";
import { ITravelHelper } from "./helpers.interface";
import { TravelHelperCategoryEnumsTypesEnums } from "./helpers.contstant";

const travelHelpersSchema = new Schema<ITravelHelper>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true, default: 0, min: 0, max: 5 },
  totalRating: { type: Number, required: true, default: 0, min: 0 },
  category: {
    type: String,
    required: true,
    enum: TravelHelperCategoryEnumsTypesEnums,
  },
  helperFor: { type: Types.ObjectId, required: true, ref: "Travels" },
});

export const TravelHelpers = model<ITravelHelper>(
  "TravelHelpers",
  travelHelpersSchema,
);
