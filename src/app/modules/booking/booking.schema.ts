import { model, Schema } from "mongoose";
import { IEBook } from "./booking.interface";

const eBookSchema = new Schema<IEBook>({
  name: { type: String, required: true },
  mainImg: { type: String, required: true },
  otherImages: [{ type: String, required: true }],
  subDescription: { type: String, required: true },
  mainDescription: { type: String, required: true },
});

export const EBook = model<IEBook>("EBook", eBookSchema);
