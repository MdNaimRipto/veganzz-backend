import cors from "cors";
import express, { Application, Request, Response } from "express";
import httpStatus from "http-status";
import { StripeWebHookController } from "./app/modules/stripe/stripe.webhook";
import { Routers } from "./app/routes/router";
import pathNotFoundErrorHandler from "./errors/pathNotFoundErrorHandler";
import globalErrorHandler from "./middlewares/globalErrorHandler";

const app: Application = express();

// ? Middlewares:
app.use(cors());

// Middleware to parse JSON bodies, with special verification for Stripe's webhook
app.use(
  express.json({
    verify: (req, res, buf) => {
      // Store the raw body buffer for signature verification
      (req as any).rawBody = buf;
    },
  }),
);

// Middleware for URL-encoded data
app.use(express.urlencoded({ extended: true }));

// * Basic Page
app.get("/", async (req: Request, res: Response) => {
  res.status(httpStatus.OK).send({
    message: "Veganzz Server Running Successfully",
    statusCode: httpStatus.OK,
  });
});

// * Stripe Webhook Endpoint (must be added before other routes)
app.post("/webhook", StripeWebHookController.stripeWebHook);

//* Main endpoint
app.use("/api/v1.0", Routers);

//* Global error Handler
app.use(globalErrorHandler);

//* Path Not Found Error Handler
app.use(pathNotFoundErrorHandler);

export default app;
