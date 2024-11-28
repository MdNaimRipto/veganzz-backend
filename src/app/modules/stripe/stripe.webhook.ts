import { Request, Response } from "express";
import httpStatus from "http-status";
import Stripe from "stripe";

import * as dotenv from "dotenv";
dotenv.config();

// Initialize Stripe
const stripe = new Stripe(
  "sk_test_51O6s4VLCDszH51fdVtHC181Q5YQPJgJbWqi2mIeMlR5Gc6txEyFLEngdFhRVS1106PQBENHadrYYZe17fZ1AbHHv00L6aRhoVx",
);

// Webhook secret to verify incoming Stripe events
const endpointSecret =
  process.env.STRIPE_WEBHOOK_SECRET ||
  "whsec_afb100317d7036a8bf0c79636b7bae32125ff3bcd643d0d816c51b155a1a05e0";

const stripeWebHook = async (req: Request, res: Response): Promise<void> => {
  const sig = req.headers["stripe-signature"];

  if (!sig) {
    console.error("Missing Stripe signature header.");
    res
      .status(httpStatus.BAD_REQUEST)
      .send("Webhook Error: Missing signature.");
    return;
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
    res
      .status(httpStatus.BAD_REQUEST)
      .send(
        `Webhook Error: ${err instanceof Error ? err.message : "Unknown error"}`,
      );
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;

      // Extract metadata to determine if this is an ebook
      console.log("🚀 ~ Handling ebook checkout session:", session);

      // Extract needed information
      const userId = session.metadata?.userId;
      const paymentIntentId = session.payment_intent?.toString(); //save this to db / retrieve and additional info form stripe
      const paymentStatus = session.payment_status; //save this to db

      console.log("🚀 ~ paymentStatus:", paymentStatus);
      console.log("🚀 ~ paymentIntentId:", paymentIntentId);
      // Console log product information
      if (userId) {
        console.log("✅ Ebook Product Information:");
        console.log(`User ID: ${userId}`);
      } else {
        console.error("Incomplete product information. Skipping log.");
      }

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

export const StripeWebHookController = {
  stripeWebHook,
};
