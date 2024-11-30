import { z } from "zod";
import { WishlistForEnumTypes } from "./wishlist.constant";

const uploadWishlistZodSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: "userId is Required",
    }),
    productId: z.string({
      required_error: "productId is Required",
    }),
    wishlistFor: z.enum([...WishlistForEnumTypes] as [string, ...string[]], {
      required_error: "Wishlist For is Required",
    }),
  }),
});

export const WishlistValidation = {
  uploadWishlistZodSchema,
};
