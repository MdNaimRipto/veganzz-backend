"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wishlists = void 0;
const mongoose_1 = require("mongoose");
const wishlist_constant_1 = require("./wishlist.constant");
const wishlistSchema = new mongoose_1.Schema({
    productId: { type: String, req: true, ref: "Recipes" },
    userId: { type: String, req: true },
    wishlistFor: { type: String, req: true, enum: wishlist_constant_1.WishlistForEnumTypes },
});
exports.Wishlists = (0, mongoose_1.model)("Wishlists", wishlistSchema);
