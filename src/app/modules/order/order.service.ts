import { IOrder } from "./order.interface";
import { Orders } from "./order.schema";

const createOrder = async (): Promise<IOrder | null> => {
  // const result = await Orders.create(payload);
  return null;
};

export const OrdersService = {
  createOrder,
};
