import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { OrdersService } from "./order.service";
import { orderStatusEnums } from "./order.interface";

// Get All Orders
const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const { orderStatus } = req.query;
  const result = await OrdersService.getAllOrders(
    orderStatus as orderStatusEnums,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order's Retrieved Successfully",
    data: result,
  });
});

const getUserOrders = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrdersService.getUserOrders(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order's Retrieved Successfully",
    data: result,
  });
});

export const OrdersController = {
  getAllOrders,
  getUserOrders,
};
