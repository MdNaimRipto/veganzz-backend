import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../../shared/catchAsync";
import sendResponse from "../../../../shared/sendResponse";

// Upload Travel
const stripeWebhook = catchAsync(async (req: Request, res: Response) => {
  const { ...payload } = req.body;

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Checkout Completed",
    data: "result",
  });
});

export const StripeWebHookController = {
  stripeWebhook,
};
