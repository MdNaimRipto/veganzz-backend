"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const reviews_schema_1 = require("./reviews.schema");
const users_schema_1 = require("../users/users.schema");
const eBook_schema_1 = require("../eBook/eBook.schema");
const config_1 = __importDefault(require("../../../config/config"));
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const recipes_schema_1 = require("../recipes/recipes.schema");
const helpers_schema_1 = require("../travel/helpers/helpers.schema");
const uploadReview = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId, reviewFor } = payload;
    const isUserExists = yield users_schema_1.Users.findOne({ _id: userId }, { _id: 1 });
    if (!isUserExists) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User Does not Exists!");
    }
    if (reviewFor === "BOOK") {
        const isProductExists = yield eBook_schema_1.EBook.findOne({ _id: productId }, { _id: 1 });
        if (!isProductExists) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Product Does not Exists!");
        }
    }
    if (reviewFor === "RECIPE") {
        const isProductExists = yield recipes_schema_1.Recipes.findOne({ _id: productId }, { _id: 1 });
        if (!isProductExists) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Recipe Does not Exists!");
        }
    }
    if (reviewFor === "TRAVEL_COSMETICS" ||
        reviewFor === "TRAVEL_DINING" ||
        reviewFor === "TRAVEL_FOOD") {
        const isProductExists = yield helpers_schema_1.TravelHelpers.findOne({ _id: productId }, { _id: 1 });
        if (!isProductExists) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Helper Does not Exists!");
        }
    }
    const isReviewAlreadyExists = yield reviews_schema_1.Reviews.findOne({
        $and: [{ userId }, { productId }],
    });
    if (isReviewAlreadyExists) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "One Review Already Added!");
    }
    const result = yield reviews_schema_1.Reviews.create(payload);
    return result;
});
const updateReviewStatus = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, reviewId, reviewStatus } = payload;
    const isUserExists = yield users_schema_1.Users.findOne({ _id: userId });
    if (!isUserExists) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User Does not Exists!");
    }
    if (isUserExists.uid !== config_1.default.admin_uid) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Unauthorized User. Only Admin Can Update Review Status!");
    }
    const isReviewExists = yield reviews_schema_1.Reviews.findOne({ _id: reviewId });
    if (!isReviewExists) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Review Does not Exists!");
    }
    const result = yield reviews_schema_1.Reviews.findOneAndUpdate({ _id: reviewId }, { reviewStatus: reviewStatus }, { new: true });
    return result;
});
const getAllReviews = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const andConditions = [];
    if (Object.keys(filters).length) {
        andConditions.push({
            $and: Object.entries(filters).map(([field, value]) => {
                return { [field]: value };
            }),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelpers_1.calculatePaginationFunction)(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const checkAndCondition = (andConditions === null || andConditions === void 0 ? void 0 : andConditions.length) > 0 ? { $and: andConditions } : {};
    const result = yield reviews_schema_1.Reviews.find(checkAndCondition)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .populate({
        path: "userId",
        select: "name _id profileImage",
    });
    const total = yield reviews_schema_1.Reviews.countDocuments(checkAndCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getAllReviewsByProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reviews_schema_1.Reviews.find({
        $and: [{ productId }, { reviewStatus: "APPROVED" }],
    }).populate({
        path: "userId",
        select: "name _id profileImage",
    });
    return result;
});
const getProductsReviewAndRatingCount = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const totalReviews = yield reviews_schema_1.Reviews.countDocuments({
        $and: [{ productId }, { reviewStatus: "APPROVED" }],
    });
    const rating = yield reviews_schema_1.Reviews.aggregate([
        { $match: { productId, reviewStatus: "APPROVED" } },
        { $group: { _id: "$productId", avgRating: { $avg: "$rating" } } },
    ]);
    let avgRating = rating.length > 0 ? rating[0] : 0;
    avgRating = Math.min(Math.max(avgRating, 0), 5);
    return {
        totalReviews: totalReviews,
        totalRatings: totalReviews,
        avgRating: avgRating,
    };
});
exports.ReviewsService = {
    uploadReview,
    getAllReviews,
    getAllReviewsByProduct,
    getProductsReviewAndRatingCount,
    updateReviewStatus,
};
