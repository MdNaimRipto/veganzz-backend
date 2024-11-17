"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HouseHoldRouter = void 0;
const express_1 = __importDefault(require("express"));
const zodValidationRequest_1 = __importDefault(require("../../../middlewares/zodValidationRequest"));
const houseHold_validation_1 = require("./houseHold.validation");
const houseHold_controller_1 = require("./houseHold.controller");
const router = express_1.default.Router();
router.post("/uploadHouseHold", (0, zodValidationRequest_1.default)(houseHold_validation_1.houseHoldValidation.uploadHouseHoldZodSchema), houseHold_controller_1.HouseHoldController.uploadHouseHold);
router.get("/getAllHouseHold", houseHold_controller_1.HouseHoldController.getAllHouseHold);
router.patch("/updateHouseHold/:id", houseHold_controller_1.HouseHoldController.updateHouseHold);
exports.HouseHoldRouter = router;
