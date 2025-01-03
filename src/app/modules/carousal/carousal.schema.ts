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
  textSize: {
    type: String,
    required: true,
  },
  textWeight: {
    type: String,
    required: true,
  },
  textColor: {
    type: String,
    required: true,
  },
});

export const Carousal = model<ICarousal>("Carousal", carousalSchema);
