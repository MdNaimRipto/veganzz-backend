"use strict";
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
exports.StripeService = void 0;
const app_1 = require("../../../app");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const eBook_schema_1 = require("../eBook/eBook.schema");
// const stripe = new Stripe(config.stripe_key, {
//   appInfo: {
//     name: "Veganezz-Backend",
//   },
// });
const stripeCheckout = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, quantity, orderDate, orderType, productId, location, price, orderStatus, pdf, } = payload;
    const isProductExists = yield eBook_schema_1.EBook.findOne({ _id: productId });
    if (!isProductExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Product Not Found");
    }
    try {
        const checkoutSession = yield app_1.stripe.checkout.sessions.create({
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: isProductExists.name,
                            images: [isProductExists.image],
                        },
                        unit_amount: isProductExists.price * 100, // Assuming productPrice is in dollars, convert to cents
                    },
                    quantity: quantity,
                },
            ],
            success_url: `http://localhost:3000/myprofile`,
            cancel_url: `http://localhost:3000`,
            metadata: {
                userId,
                productId,
                quantity,
                orderDate,
                orderType,
                location,
                price,
                orderStatus,
                pdf,
            },
        });
        return { url: checkoutSession.url };
    }
    catch (error) {
        console.error("Error creating checkout session:", error);
        throw error; // Optionally rethrow or handle the error
    }
});
exports.StripeService = {
    stripeCheckout,
};
