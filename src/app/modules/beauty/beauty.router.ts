import express from "express";
import zodValidationRequest from "../../../middlewares/zodValidationRequest";
import { beautyValidation } from "./beauty.validation";
import { BeautyController } from "./beauty.controller";

const router = express.Router();

router.post(
  "/uploadBeauty",
  zodValidationRequest(beautyValidation.uploadBeautyZodSchema),
  BeautyController.uploadBeauty,
);

router.get("/getAllBeauty", BeautyController.getAllBeauty);

router.patch("/updateBeauty/:id", BeautyController.updateBeauty);

export const BeautyRouter = router;
