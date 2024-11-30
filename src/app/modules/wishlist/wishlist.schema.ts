import { model, Schema } from "mongoose";
import { IWishlist } from "./wishlist.interface";
import { WishlistForEnumTypes } from "./wishlist.constant";

const wishlistSchema = new Schema<IWishlist>({
  productId: { type: String, req: true, ref: "Recipes" },
  userId: { type: String, req: true },
  wishlistFor: { type: String, req: true, enum: WishlistForEnumTypes },
});

export const Wishlists = model<IWishlist>("Wishlists", wishlistSchema);
