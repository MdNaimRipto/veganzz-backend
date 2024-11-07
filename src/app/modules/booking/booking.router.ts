import express from "express";
import zodValidationRequest from "../../../middlewares/zodValidationRequest";
import { BookingsValidation } from "./booking.validation";
import { BookingsController } from "./booking.controller";

const router = express.Router();

router.post(
  "/bookProducts",
  zodValidationRequest(BookingsValidation.uploadBookingsZodSchema),
  BookingsController.bookProducts,
);

router.get("/getAllBookedProducts", BookingsController.getAllBookedProducts);

router.get(
  "/getUsersAllBookedProducts/:id",
  BookingsController.getUsersAllBookedProducts,
);

export const BeautyRouter = router;
