import { Types } from "mongoose";
import { IUser } from "../users/users.interface";
import { IEBook } from "../eBook/eBook.interface";

export interface IBooking {
  userId: Types.ObjectId | Partial<IUser>;
  productId: Types.ObjectId | Partial<IEBook>;
  transactionId: string;
  cost: string;
  quantity: number;
}
