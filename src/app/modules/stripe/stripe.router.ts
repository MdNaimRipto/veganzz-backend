import express from "express";
import { StripeController } from "./stripe.controller";

const router = express.Router();

router.post("/checkout", StripeController.stripeCheckout);
// router.post("/webHook", StripeController.stripeWebhook);

export const StripeRouter = router;
