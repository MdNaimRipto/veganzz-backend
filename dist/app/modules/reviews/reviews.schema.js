"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reviews = void 0;
const mongoose_1 = require("mongoose");
const reviews_constant_1 = require("./reviews.constant");
const reviewsSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Types.ObjectId, required: true, ref: "Users" },
    productId: { type: String, required: true },
    reviewFor: { type: String, enum: reviews_constant_1.ReviewForEnumTypes, required: true },
    reviewedOn: { type: String, required: true },
    review: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    reviewStatus: {
        type: String,
        enum: reviews_constant_1.ReviewStatusEnums,
        required: true,
        default: "PENDING",
    },
});
exports.Reviews = (0, mongoose_1.model)("Reviews", reviewsSchema);
