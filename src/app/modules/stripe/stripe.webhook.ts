import { Request, Response } from "express";
import httpStatus from "http-status";
import Stripe from "stripe";

import * as dotenv from "dotenv";
import config from "../../../config/config";
import ApiError from "../../../errors/ApiError";
import { Orders } from "../order/order.schema";
dotenv.config();

// Initialize Stripe
const stripe = new Stripe(config.stripe_key);

// Webhook secret to verify incoming Stripe events
const endpointSecret = config.stripe_secret;

const stripeWebHook = async (req: Request, res: Response): Promise<void> => {
  const sig = req.headers["stripe-signature"];

  if (!sig) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Signature Not Found!");
  }

  let event: Stripe.Event;

  try {
    // Verify the event using the Stripe library with the raw body
    event = stripe.webhooks.constructEvent(
      (req as any).rawBody,
      sig,
      endpointSecret,
    );
  } catch (err) {
    console.error("⚠️ Webhook signature verification failed.", err);
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Webhook Error: ${err instanceof Error ? err.message : "Unknown error"}`,
    );
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;

      // Extract metadata to determine if this is an ebook
      console.log("🚀 ~ Handling ebook checkout session:", session);

      // Extract needed information
      const paymentIntentId = session.payment_intent?.toString();

      const orderPayload = {
        userId: session.metadata?.userId,
        productId: session.metadata?.productId,
        orderDate: session.metadata?.orderDate,
        quantity: session.metadata?.quantity,
        transactionId: paymentIntentId,
        orderType: session.metadata?.orderType,
        location: session.metadata?.location,
        price: session.metadata?.price,
        orderStatus: session.metadata?.orderStatus,
        pdf: session.metadata?.pdf,
      };

      console.log(orderPayload);

      await Orders.create(orderPayload);

      break;

    // Handle other event types as needed
    default:
  }

  // Respond to Stripe that the event was received successfully
  res.status(httpStatus.OK).send({
    success: true,
    message: "Webhook received",
    data: "success",
  });
};

export const StripeWebHook = {
  stripeWebHook,
};
