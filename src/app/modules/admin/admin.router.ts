import express from "express";
import { AdminController } from "./admin.controller";

const router = express.Router();

router.get("/userCounts", AdminController.userCounts);

router.get("/reviewCounts", AdminController.reviewCounts);

router.get("/orderCounts", AdminController.orderCounts);

export const AdminRouter = router;
