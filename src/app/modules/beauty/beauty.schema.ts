import { model, Schema } from "mongoose";
import { IBeauty } from "./beauty.interface";

const beautySchema = new Schema<IBeauty>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
});

export const Beauty = model<IBeauty>("Beauty", beautySchema);
