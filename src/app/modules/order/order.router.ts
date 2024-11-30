import express from "express";
import { OrdersController } from "./order.controller";

const router = express.Router();

router.get("/getAllOrders", OrdersController.getAllOrders);

router.get("/getUserOrders/:id", OrdersController.getUserOrders);

export const OrdersRouter = router;
