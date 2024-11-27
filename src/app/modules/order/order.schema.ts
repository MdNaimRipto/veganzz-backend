import { model, Schema, Types } from "mongoose";
import { IOrder } from "./order.interface";
import { RecipeTypesEnums } from "./order.contstant";

const ordersSchema = new Schema<IOrder>({
  userId: { type: Types.ObjectId, required: true },
  productId: { type: Types.ObjectId, required: true },
  stripeCustomerId: { type: String, required: true },
  orderDate: { type: String, required: true },
  quantity: { type: Number, required: true },
  transactionId: { type: String, required: true },
  transactionType: { type: String, required: true },
  location: { type: String, required: true, default: null },
  orderType: { type: String, required: true },
  invoiceUrl: { type: String, required: true },
});

export const Orders = model<IOrder>("Orders", ordersSchema);
