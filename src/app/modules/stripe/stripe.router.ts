import express from "express";
import { StripeController } from "./stripe.controller";
import { StripeWebHookController } from "./stripe.webhook";

const router = express.Router();

router.post("/checkout", StripeController.stripeCheckout);
router.post("/webhook", StripeWebHookController.stripeWebHook);
// router.post("/webHook", StripeController.stripeWebhook);

export const StripeRouter = router;
