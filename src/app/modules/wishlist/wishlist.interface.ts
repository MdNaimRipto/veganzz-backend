import { Types } from "mongoose";
import { IRecipe } from "../recipes/recipes.interface";

export type wishlistForEnumTypes =
  | "BOOK"
  | "RECIPE"
  | "TRAVEL_DINING"
  | "TRAVEL_FOOD"
  | "TRAVEL_COSMETICS";

export interface IWishlist {
  productId: Types.ObjectId | IRecipe;
  userId: string;
  wishlistFor: wishlistForEnumTypes;
}
