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
exports.stripe = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const stripe_webhook_1 = require("./app/modules/stripe/stripe.webhook");
const router_1 = require("./app/routes/router");
const pathNotFoundErrorHandler_1 = __importDefault(require("./errors/pathNotFoundErrorHandler"));
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("./config/config"));
const app = (0, express_1.default)();
// ? Middlewares:
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
// * Stripe
exports.stripe = new stripe_1.default(config_1.default.stripe_key);
app.use(express_1.default.json({
    verify: (req, res, buf) => {
        req.rawBody = buf;
    },
}));
// * Stripe Webhook Endpoint (must be added before other routes)
app.post("/webhook", stripe_webhook_1.StripeWebHook.stripeWebHook);
// http://localhost:5835/api/v1.0/stripe/webhook
// * Basic Page
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(http_status_1.default.OK).send({
        message: "Veganzz Server Running Successfully",
        statusCode: http_status_1.default.OK,
    });
}));
//* Main endpoint
app.use("/api/v1.0", router_1.Routers);
//* Global error Handler
app.use(globalErrorHandler_1.default);
//* Path Not Found Error Handler
app.use(pathNotFoundErrorHandler_1.default);
exports.default = app;
