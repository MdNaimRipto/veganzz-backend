import { model, Schema } from "mongoose";
import { ICarousal } from "./carousal.interface";
import { CarousalStatusEnums } from "./carousal.constant";

const carousalSchema = new Schema<ICarousal>({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: CarousalStatusEnums,
    required: true,
    default: "PAUSED",
  },
});

export const Carousal = model<ICarousal>("Carousal", carousalSchema);
