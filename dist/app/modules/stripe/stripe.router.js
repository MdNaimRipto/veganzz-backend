"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeRouter = void 0;
const express_1 = __importDefault(require("express"));
const stripe_controller_1 = require("./stripe.controller");
const stripe_webhook_1 = require("./stripe.webhook");
const router = express_1.default.Router();
router.post("/checkout", stripe_controller_1.StripeController.stripeCheckout);
router.post("/webhook", stripe_webhook_1.StripeWebHook.stripeWebHook);
exports.StripeRouter = router;
