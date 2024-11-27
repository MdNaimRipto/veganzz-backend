"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpersRouter = void 0;
const express_1 = __importDefault(require("express"));
const zodValidationRequest_1 = __importDefault(require("../../../../middlewares/zodValidationRequest"));
const helpers_validation_1 = require("./helpers.validation");
const helpers_controller_1 = require("./helpers.controller");
const router = express_1.default.Router();
router.post("/uploadHelper", (0, zodValidationRequest_1.default)(helpers_validation_1.travelHelpersValidation.uploadTravelHelperZodSchema), helpers_controller_1.TravelHelpersController.uploadTravelHelpers);
router.get("/getAllHelpers/:travelId", helpers_controller_1.TravelHelpersController.getAllTravelHelpers);
router.patch("/updateHelper/:id", helpers_controller_1.TravelHelpersController.updateTravelHelper);
router.delete("/deleteHelper/:id", helpers_controller_1.TravelHelpersController.deleteTravelHelper);
exports.HelpersRouter = router;
