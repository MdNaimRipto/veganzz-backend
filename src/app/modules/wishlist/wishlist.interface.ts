export type wishlistForEnumTypes =
  | "BOOK"
  | "RECIPE"
  | "TRAVEL_DINING"
  | "TRAVEL_FOOD"
  | "TRAVEL_COSMETICS";

export interface IWishlist {
  productId: string;
  userId: string;
  wishlistFor: wishlistForEnumTypes;
}
