import { Types } from "mongoose";
import { IUser } from "../users/users.interface";
import { IEBook } from "../eBook/eBook.interface";

export interface IOrder {
  userId: Types.ObjectId | IUser;
  stripeCustomerId: string; // Stripe
  productId: Types.ObjectId | IEBook;
  orderDate: string;
  quantity: number;
  transactionId: string; // Stripe
  transactionType: string; // Stripe
  invoiceUrl: string; // Stripe
  orderType: string;
  location: null | string;
}
