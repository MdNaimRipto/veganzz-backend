import { model, Schema } from "mongoose";
import { IHouseHold } from "./houseHold.interface";

const houseHoldSchema = new Schema<IHouseHold>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
});

export const HouseHold = model<IHouseHold>("HouseHold", houseHoldSchema);
