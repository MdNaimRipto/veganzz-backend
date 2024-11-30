"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistValidation = void 0;
const zod_1 = require("zod");
const wishlist_constant_1 = require("./wishlist.constant");
const uploadWishlistZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: "userId is Required",
        }),
        productId: zod_1.z.string({
            required_error: "productId is Required",
        }),
        wishlistFor: zod_1.z.enum([...wishlist_constant_1.WishlistForEnumTypes], {
            required_error: "Wishlist For is Required",
        }),
    }),
});
exports.WishlistValidation = {
    uploadWishlistZodSchema,
};
