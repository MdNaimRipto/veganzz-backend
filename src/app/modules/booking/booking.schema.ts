import { model, Schema, Types } from "mongoose";
import { IBooking } from "./booking.interface";

const bookingSchema = new Schema<IBooking>({
  userId: { type: Types.ObjectId, required: true, ref: "Users" },
  productId: { type: Types.ObjectId, required: true, ref: "EBook" },
  transactionId: { type: String, required: true, unique: true },
  cost: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
});

export const Bookings = model<IBooking>("Bookings", bookingSchema);
