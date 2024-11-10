import { model, Schema } from "mongoose";
import { IBeauty } from "./beauty.interface";
import { StatusEnums } from "./beautyConstant";

const beautySchema = new Schema<IBeauty>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  status: {
    type: String,
    enum: StatusEnums,
    required: true,
    default: "PUBLISHED",
  },
});

export const Beauty = model<IBeauty>("Beauty", beautySchema);
