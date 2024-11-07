import express from "express";
import zodValidationRequest from "../../../middlewares/zodValidationRequest";
import { EBookValidation } from "./booking.validation";
import { EBookController } from "./booking.controller";

const router = express.Router();

router.post(
  "/uploadEBook",
  zodValidationRequest(EBookValidation.uploadEBookZodSchema),
  EBookController.uploadEBook,
);

router.get("/getAllEBook", EBookController.getAllEBook);

router.patch("/updateEBook/:id", EBookController.updateEBook);

export const BeautyRouter = router;
