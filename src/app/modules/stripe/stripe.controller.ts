import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { StripeService } from "./stripe.service";

// Upload Travel
const stripeCheckout = catchAsync(async (req: Request, res: Response) => {
  const { ...payload } = req.body;
  const result = await StripeService.stripeCheckout(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Checkout Completed",
    data: result,
  });
});

export const StripeController = {
  stripeCheckout,
};
