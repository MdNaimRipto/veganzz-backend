"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsValidation = void 0;
const zod_1 = require("zod");
const reviews_constant_1 = require("./reviews.constant");
const uploadReviewsZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: "userId is Required",
        }),
        productId: zod_1.z.string({
            required_error: "productId is Required",
        }),
        reviewFor: zod_1.z.enum([...reviews_constant_1.ReviewForEnumTypes], {
            required_error: "reviewFor is Required",
        }),
        reviewedOn: zod_1.z.string({
            required_error: "reviewedOn is Required",
        }),
        review: zod_1.z.string({
            required_error: "Review is Required",
        }),
        rating: zod_1.z
            .number({
            required_error: "Rating is Required",
        })
            .min(1)
            .max(5),
    }),
});
exports.ReviewsValidation = {
    uploadReviewsZodSchema,
};
