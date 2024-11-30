import { Types } from "mongoose";
import { IUser } from "../users/users.interface";
import { IEBook } from "../eBook/eBook.interface";

export type orderStatusEnums =
  | "PENDING"
  | "PREPARING"
  | "ON_THE_WAY"
  | "DELIVERED"
  | "CANCELED";

export interface IOrder {
  userId: Types.ObjectId | IUser;
  productId: Types.ObjectId | IEBook;
  orderDate: string;
  quantity: number;
  transactionId: string; // Stripe
  orderType: string;
  location: null | string;
  price: number;
  orderStatus: orderStatusEnums;
  pdf: null | string;
}

export interface IMetaData {
  userId: Types.ObjectId | IUser;
  productId: Types.ObjectId | IEBook;
  orderDate: string;
  quantity: number;
  orderType: string;
  location: null | string;
  price: number;
  orderStatus: orderStatusEnums;
  pdf: null | string;
}
