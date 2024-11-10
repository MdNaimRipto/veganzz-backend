import { model, Schema } from "mongoose";
import { IEBook } from "./eBook.interface";
import { StatusEnums } from "./eBook.constant";

const eBookSchema = new Schema<IEBook>({
  name: { type: String, required: true },
  mainImg: { type: String, required: true },
  otherImages: [{ type: String, required: true }],
  subDescription: { type: String, required: true },
  mainDescription: { type: String, required: true },
  price: { type: Number, required: true, min: 1 },
  status: {
    type: String,
    enum: StatusEnums,
    required: true,
    default: "PUBLISHED",
  },
  dateAdded: { type: String, required: true },
});

export const EBook = model<IEBook>("EBook", eBookSchema);
