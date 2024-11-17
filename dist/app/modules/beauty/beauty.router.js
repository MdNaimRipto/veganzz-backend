"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeautyRouter = void 0;
const express_1 = __importDefault(require("express"));
const zodValidationRequest_1 = __importDefault(require("../../../middlewares/zodValidationRequest"));
const beauty_validation_1 = require("./beauty.validation");
const beauty_controller_1 = require("./beauty.controller");
const router = express_1.default.Router();
router.post("/uploadBeauty", (0, zodValidationRequest_1.default)(beauty_validation_1.beautyValidation.uploadBeautyZodSchema), beauty_controller_1.BeautyController.uploadBeauty);
router.get("/getAllBeauty", beauty_controller_1.BeautyController.getAllBeauty);
router.patch("/updateBeauty/:id", beauty_controller_1.BeautyController.updateBeauty);
exports.BeautyRouter = router;
