import { model, Schema } from "mongoose";
import { IEBook } from "./eBook.interface";
import { EBookTypeEnums, StatusEnums } from "./eBook.constant";

const eBookSchema = new Schema<IEBook>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  subDescription: { type: String, required: true },
  mainDescription: { type: String, required: true },
  price: { type: Number, required: true, min: 1 },
  status: {
    type: String,
    enum: StatusEnums,
    required: true,
    default: "PUBLISHED",
  },
  productType: {
    type: String,
    enum: EBookTypeEnums,
    required: true,
  },
  pdf: { type: String, required: false, default: null },
  dateAdded: { type: String, required: true },
});

export const EBook = model<IEBook>("EBook", eBookSchema);
