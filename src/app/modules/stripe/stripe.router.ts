import express from "express";
import { StripeController } from "./stripe.controller";
import { StripeWebHook } from "./stripe.webhook";

const router = express.Router();

router.post("/checkout", StripeController.stripeCheckout);
router.post("/webhook", StripeWebHook.stripeWebHook);

export const StripeRouter = router;
