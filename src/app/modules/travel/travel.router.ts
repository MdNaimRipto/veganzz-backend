import express from "express";
import zodValidationRequest from "../../../middlewares/zodValidationRequest";
import { travelsValidation } from "./travel.validation";
import { TravelsController } from "./travel.controller";

const router = express.Router();

router.post(
  "/uploadTravel",
  zodValidationRequest(travelsValidation.uploadTravelsZodSchema),
  TravelsController.uploadTravels,
);

router.get("/getAllTravels", TravelsController.getAllTravelLocations);

router.get("/getTravelDetails/:id", TravelsController.getTravelLocationDetails);

router.patch("/updateTravel/:id", TravelsController.updateTravelLocations);

export const TravelsRouter = router;
