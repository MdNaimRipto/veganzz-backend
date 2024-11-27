"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarousalRouter = void 0;
const express_1 = __importDefault(require("express"));
const zodValidationRequest_1 = __importDefault(require("../../../middlewares/zodValidationRequest"));
const carousal_controller_1 = require("./carousal.controller");
const carousal_validation_1 = require("./carousal.validation");
const router = express_1.default.Router();
router.post("/uploadCarousal", (0, zodValidationRequest_1.default)(carousal_validation_1.CarousalsValidation.uploadCarousalZodSchema), carousal_controller_1.CarousalController.uploadCarousal);
router.get("/getAllCarousals", carousal_controller_1.CarousalController.getAllCarousals);
router.get("/getActiveCarousals", carousal_controller_1.CarousalController.getActiveCarousals);
router.patch("/updateCarousal/:id", carousal_controller_1.CarousalController.updateCarousal);
router.delete("/deleteCarousal/:id", carousal_controller_1.CarousalController.deleteCarousal);
exports.CarousalRouter = router;
