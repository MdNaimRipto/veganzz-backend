import express from "express";
import zodValidationRequest from "../../../middlewares/zodValidationRequest";
import { CarousalController } from "./carousal.controller";
import { CarousalsValidation } from "./carousal.validation";

const router = express.Router();

router.post(
  "/uploadCarousal",
  zodValidationRequest(CarousalsValidation.uploadCarousalZodSchema),
  CarousalController.uploadCarousal,
);

router.get("/getAllCarousals", CarousalController.getAllCarousals);

router.get("/getActiveCarousals", CarousalController.getActiveCarousals);

router.patch("/updateCarousal/:id", CarousalController.updateCarousal);

router.delete("/deleteCarousal/:id", CarousalController.deleteCarousal);

export const CarousalRouter = router;
