import cors from "cors";
import express, { Application, Request, Response } from "express";
import httpStatus from "http-status";
import { StripeWebHook } from "./app/modules/stripe/stripe.webhook";
import { Routers } from "./app/routes/router";
import pathNotFoundErrorHandler from "./errors/pathNotFoundErrorHandler";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import Stripe from "stripe";
import config from "./config/config";
import { StripeController } from "./app/modules/stripe/stripe.controller";

const app: Application = express();

// ? Middlewares:
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// * Stripe
export const stripe = new Stripe(config.stripe_key);

app.use(
  express.json({
    verify: (req, res, buf) => {
      (req as any).rawBody = buf;
    },
  }),
);
// * Stripe Webhook Endpoint (must be added before other routes)
app.post("/webhook", StripeWebHook.stripeWebHook);

// http://localhost:5835/api/v1.0/stripe/webhook

// * Basic Page
app.get("/", async (req: Request, res: Response) => {
  res.status(httpStatus.OK).send({
    message: "Veganzz Server Running Successfully",
    statusCode: httpStatus.OK,
  });
});

//* Main endpoint
app.use("/api/v1.0", Routers);

//* Global error Handler
app.use(globalErrorHandler);

//* Path Not Found Error Handler
app.use(pathNotFoundErrorHandler);

export default app;
