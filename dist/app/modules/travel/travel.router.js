"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelsRouter = void 0;
const express_1 = __importDefault(require("express"));
const zodValidationRequest_1 = __importDefault(require("../../../middlewares/zodValidationRequest"));
const travel_validation_1 = require("./travel.validation");
const travel_controller_1 = require("./travel.controller");
const router = express_1.default.Router();
router.post("/uploadTravel", (0, zodValidationRequest_1.default)(travel_validation_1.travelsValidation.uploadTravelsZodSchema), travel_controller_1.TravelsController.uploadTravels);
router.get("/getAllTravels", travel_controller_1.TravelsController.getAllTravelLocations);
router.get("/getTravelDetails/:id", travel_controller_1.TravelsController.getTravelLocationDetails);
router.patch("/updateTravel/:id", travel_controller_1.TravelsController.updateTravelLocations);
router.delete("/deleteTravel/:id", travel_controller_1.TravelsController.deleteTravel);
exports.TravelsRouter = router;
