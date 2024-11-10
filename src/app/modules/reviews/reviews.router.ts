import express from "express";
import zodValidationRequest from "../../../middlewares/zodValidationRequest";
import { ReviewsValidation } from "./reviews.validation";
import { ReviewsController } from "./reviews.controller";

const router = express.Router();

router.post(
  "/uploadReview",
  zodValidationRequest(ReviewsValidation.uploadReviewsZodSchema),
  ReviewsController.uploadReview,
);

router.patch("/updateReviewStatus", ReviewsController.updateReviewStatus);

router.get("/getAllReviews", ReviewsController.getAllReviews);

router.get(
  "/getAllReviewsByProduct/:productId",
  ReviewsController.getAllReviewsByProduct,
);

router.get(
  "/getProductsReviewAndRatingCount/:productId",
  ReviewsController.getProductsReviewAndRatingCount,
);

export const ReviewsRouter = router;
