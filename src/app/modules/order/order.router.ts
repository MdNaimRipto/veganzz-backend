import express from "express";
import { OrdersController } from "./order.controller";

const router = express.Router();

router.post("/createOrder/:sig", OrdersController.createOrder);

// /api/v1.0/order/createOrder

export const OrdersRouter = router;
