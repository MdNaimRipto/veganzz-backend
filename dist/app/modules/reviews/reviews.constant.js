"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsFilterableFields = exports.ReviewStatusEnums = exports.ReviewForEnumTypes = void 0;
exports.ReviewForEnumTypes = [
    "BOOK",
    "RECIPE",
    "TRAVEL_DINING",
    "TRAVEL_FOOD",
    "TRAVEL_COSMETICS",
];
exports.ReviewStatusEnums = [
    "PENDING",
    "APPROVED",
    "BLOCKED",
];
exports.ReviewsFilterableFields = [
    "reviewStatus",
    "reviewedOn",
    "productId",
    "reviewFor",
];
