import { model, Schema, Types } from "mongoose";
import { IOrder } from "./order.interface";
import { OrderStatusEnums } from "./order.constant";

const ordersSchema = new Schema<IOrder>({
  userId: { type: Types.ObjectId, required: true, ref: "Users" },
  productId: { type: Types.ObjectId, required: true, ref: "EBook" },
  orderDate: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  transactionId: { type: String, required: true },
  location: { type: String, required: true, default: "No Location Found" },
  orderType: { type: String, required: true },
  orderStatus: { type: String, required: true, enum: OrderStatusEnums },
  pdf: { type: String, required: true, default: null },
});

export const Orders = model<IOrder>("Orders", ordersSchema);
