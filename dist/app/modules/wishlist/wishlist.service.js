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
exports.WishlistsService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const users_schema_1 = require("../users/users.schema");
const eBook_schema_1 = require("../eBook/eBook.schema");
const recipes_schema_1 = require("../recipes/recipes.schema");
const helpers_schema_1 = require("../travel/helpers/helpers.schema");
const wishlist_schema_1 = require("./wishlist.schema");
const uploadWishlist = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId, wishlistFor } = payload;
    const isUserExists = yield users_schema_1.Users.findOne({ _id: userId }, { _id: 1 });
    if (!isUserExists) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User Does not Exists!");
    }
    if (wishlistFor === "BOOK") {
        const isProductExists = yield eBook_schema_1.EBook.findOne({ _id: productId }, { _id: 1 });
        if (!isProductExists) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Product Does not Exists!");
        }
    }
    if (wishlistFor === "RECIPE") {
        const isProductExists = yield recipes_schema_1.Recipes.findOne({ _id: productId }, { _id: 1 });
        if (!isProductExists) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Recipe Does not Exists!");
        }
    }
    if (wishlistFor === "TRAVEL_COSMETICS" ||
        wishlistFor === "TRAVEL_DINING" ||
        wishlistFor === "TRAVEL_FOOD") {
        const isProductExists = yield helpers_schema_1.TravelHelpers.findOne({ _id: productId }, { _id: 1 });
        if (!isProductExists) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Helper Does not Exists!");
        }
    }
    const isReviewAlreadyExists = yield wishlist_schema_1.Wishlists.findOne({
        $and: [{ userId }, { productId }],
    });
    if (isReviewAlreadyExists) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Already Added to Wishlist!");
    }
    const result = yield wishlist_schema_1.Wishlists.create(payload);
    return result;
});
const getUserWishlists = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wishlist_schema_1.Wishlists.find({ userId });
    return result;
});
const isAddedWishlist = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    const isAdded = yield wishlist_schema_1.Wishlists.findOne({
        $and: [{ userId }, { productId }],
    });
    if (isAdded) {
        return String(isAdded._id);
    }
    else {
        return null;
    }
});
const deleteWishlist = (wishlistId) => __awaiter(void 0, void 0, void 0, function* () {
    const isWishlistExists = yield wishlist_schema_1.Wishlists.findOne({ _id: wishlistId }, { _id: 1 });
    if (!isWishlistExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Wishlist Does Not Exists");
    }
    const result = yield wishlist_schema_1.Wishlists.findOneAndDelete({ _id: wishlistId }, {
        new: true,
    });
    return result;
});
exports.WishlistsService = {
    uploadWishlist,
    getUserWishlists,
    isAddedWishlist,
    deleteWishlist,
};
