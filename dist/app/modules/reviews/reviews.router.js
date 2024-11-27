"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsRouter = void 0;
const express_1 = __importDefault(require("express"));
const zodValidationRequest_1 = __importDefault(require("../../../middlewares/zodValidationRequest"));
const reviews_validation_1 = require("./reviews.validation");
const reviews_controller_1 = require("./reviews.controller");
const router = express_1.default.Router();
router.post("/uploadReview", (0, zodValidationRequest_1.default)(reviews_validation_1.ReviewsValidation.uploadReviewsZodSchema), reviews_controller_1.ReviewsController.uploadReview);
router.patch("/updateReviewStatus", reviews_controller_1.ReviewsController.updateReviewStatus);
router.get("/getAllReviews", reviews_controller_1.ReviewsController.getAllReviews);
router.get("/getAllReviewsByProduct/:productId", reviews_controller_1.ReviewsController.getAllReviewsByProduct);
router.get("/getProductsReviewAndRatingCount/:productId", reviews_controller_1.ReviewsController.getProductsReviewAndRatingCount);
router.delete("/deleteReview/:id", reviews_controller_1.ReviewsController.deleteReview);
exports.ReviewsRouter = router;
