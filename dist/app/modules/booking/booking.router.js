"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsRouter = void 0;
const express_1 = __importDefault(require("express"));
const zodValidationRequest_1 = __importDefault(require("../../../middlewares/zodValidationRequest"));
const booking_validation_1 = require("./booking.validation");
const booking_controller_1 = require("./booking.controller");
const router = express_1.default.Router();
router.post("/bookProducts", (0, zodValidationRequest_1.default)(booking_validation_1.BookingsValidation.uploadBookingsZodSchema), booking_controller_1.BookingsController.bookProducts);
router.get("/getAllBookedProducts", booking_controller_1.BookingsController.getAllBookedProducts);
router.get("/getUsersAllBookedProducts/:id", booking_controller_1.BookingsController.getUsersAllBookedProducts);
exports.BookingsRouter = router;
