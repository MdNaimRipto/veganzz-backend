import { IOrder } from "./order.interface";
import { Orders } from "./order.schema";

const getAllOrders = async () => {
  const orders = await Orders.find().populate([
    {
      path: "userId",
      select: "_id name email",
    },
    {
      path: "productId",
      select: "_id name",
    },
  ]);
  return orders;
};

const getUserOrders = async (userId: string) => {
  const orders = await Orders.find({ userId }).populate({
    path: "productId",
    select: "_id name image",
  });
  return orders;
};

export const OrdersService = {
  getAllOrders,
  getUserOrders,
};
