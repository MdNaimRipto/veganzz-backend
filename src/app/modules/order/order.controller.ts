import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { OrdersService } from "./order.service";

// Get All Orders
const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrdersService.getAllOrders();

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
