import { Types } from "mongoose";
import { ITravel } from "../travel.interface";

export type travelHelperCategoryEnums = "DINING" | "FOOD" | "COSMETICS";

export interface ITravelHelper {
  name: string;
  image: string;
  description: string;
  rating: number;
  totalRating: number;
  category: travelHelperCategoryEnums;
  helperFor: Types.ObjectId | ITravel;
}
