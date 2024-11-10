import { z } from "zod";
import { ReviewForEnumTypes } from "./reviews.constant";

const uploadReviewsZodSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: "userId is Required",
    }),
    productId: z.string({
      required_error: "productId is Required",
    }),
    reviewFor: z.enum([...ReviewForEnumTypes] as [string, ...string[]], {
      required_error: "reviewFor is Required",
    }),
    reviewedOn: z.string({
      required_error: "reviewedOn is Required",
    }),
    review: z.string({
      required_error: "Review is Required",
    }),
    rating: z
      .number({
        required_error: "Rating is Required",
      })
      .min(1)
      .max(5),
  }),
});

export const ReviewsValidation = {
  uploadReviewsZodSchema,
};
