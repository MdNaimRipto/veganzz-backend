"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeWebHook = void 0;
const http_status_1 = __importDefault(require("http-status"));
const stripe_1 = __importDefault(require("stripe"));
const dotenv = __importStar(require("dotenv"));
const config_1 = __importDefault(require("../../../config/config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const order_schema_1 = require("../order/order.schema");
dotenv.config();
// Initialize Stripe
const stripe = new stripe_1.default(config_1.default.stripe_key);
// Webhook secret to verify incoming Stripe events
const endpointSecret = config_1.default.stripe_secret;
const stripeWebHook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const sig = req.headers["stripe-signature"];
    if (!sig) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Signature Not Found!");
    }
    let event;
    try {
        // Verify the event using the Stripe library with the raw body
        event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
    }
    catch (err) {
        console.error("⚠️ Webhook signature verification failed.", err);
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `Webhook Error: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
    // Handle the event
    switch (event.type) {
        case "checkout.session.completed":
            const session = event.data.object;
            // Extract metadata to determine if this is an ebook
            console.log("🚀 ~ Handling ebook checkout session:", session);
            // Extract needed information
            const paymentIntentId = (_a = session.payment_intent) === null || _a === void 0 ? void 0 : _a.toString();
            const orderPayload = {
                userId: (_b = session.metadata) === null || _b === void 0 ? void 0 : _b.userId,
                productId: (_c = session.metadata) === null || _c === void 0 ? void 0 : _c.productId,
                orderDate: (_d = session.metadata) === null || _d === void 0 ? void 0 : _d.orderDate,
                quantity: (_e = session.metadata) === null || _e === void 0 ? void 0 : _e.quantity,
                transactionId: paymentIntentId,
                orderType: (_f = session.metadata) === null || _f === void 0 ? void 0 : _f.orderType,
                location: (_g = session.metadata) === null || _g === void 0 ? void 0 : _g.location,
                price: (_h = session.metadata) === null || _h === void 0 ? void 0 : _h.price,
                orderStatus: (_j = session.metadata) === null || _j === void 0 ? void 0 : _j.orderStatus,
                pdf: (_k = session.metadata) === null || _k === void 0 ? void 0 : _k.pdf,
            };
            console.log(orderPayload);
            yield order_schema_1.Orders.create(orderPayload);
            break;
        // Handle other event types as needed
        default:
    }
    // Respond to Stripe that the event was received successfully
    res.status(http_status_1.default.OK).send({
        success: true,
        message: "Webhook received",
        data: "success",
    });
});
exports.StripeWebHook = {
    stripeWebHook,
};
