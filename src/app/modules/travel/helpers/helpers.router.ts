import express from "express";
import zodValidationRequest from "../../../../middlewares/zodValidationRequest";
import { travelHelpersValidation } from "./helpers.validation";
import { TravelHelpersController } from "./helpers.controller";

const router = express.Router();

router.post(
  "/uploadHelper",
  zodValidationRequest(travelHelpersValidation.uploadTravelHelperZodSchema),
  TravelHelpersController.uploadTravelHelpers,
);

router.get(
  "/getAllHelpers/:travelId",
  TravelHelpersController.getAllTravelHelpers,
);

router.patch("/updateHelper/:id", TravelHelpersController.updateTravelHelper);

router.delete("/deleteHelper/:id", TravelHelpersController.deleteTravelHelper);

export const HelpersRouter = router;
