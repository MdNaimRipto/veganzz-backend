import express from "express";
import zodValidationRequest from "../../../middlewares/zodValidationRequest";
import { houseHoldValidation } from "./houseHold.validation";
import { HouseHoldController } from "./houseHold.controller";

const router = express.Router();

router.post(
  "/uploadHouseHold",
  zodValidationRequest(houseHoldValidation.uploadHouseHoldZodSchema),
  HouseHoldController.uploadHouseHold,
);

router.get("/getAllHouseHold", HouseHoldController.getAllHouseHold);

router.patch("/updateHouseHold/:id", HouseHoldController.updateHouseHold);

export const HouseHoldRouter = router;
