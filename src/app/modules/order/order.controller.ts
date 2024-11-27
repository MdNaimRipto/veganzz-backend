import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { RecipesFilterableFields } from "./order.contstant";
import pick from "../../../shared/shared";
import { paginationFields } from "../../../constants/pagination.constant";
import { OrdersService } from "./order.service";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51O6s4VLCDszH51fdVtHC181Q5YQPJgJbWqi2mIeMlR5Gc6txEyFLEngdFhRVS1106PQBENHadrYYZe17fZ1AbHHv00L6aRhoVx",
  {
    apiVersion: "2024-11-20.acacia",
  },
);

const endpointSecret =
  "whsec_afb100317d7036a8bf0c79636b7bae32125ff3bcd643d0d816c51b155a1a05e0";

async function getRawBody(req: Request) {
  const chunks = [];
  for await (const chunk of req.body) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

// Upload Recipe
const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { sig } = req.params;

  const rawBody = await getRawBody(req);

  let event;
  event = stripe.webhooks.constructEvent(
    rawBody,
    sig as string,
    endpointSecret,
  );

  console.log(event);

  const result = await OrdersService.createOrder();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order Created Successfully",
    data: result,
  });
});

export const OrdersController = {
  createOrder,
};
