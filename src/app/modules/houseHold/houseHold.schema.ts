import { model, Schema } from "mongoose";
import { IHouseHold } from "./houseHold.interface";
import { StatusEnums } from "./houseHold.constant";

const houseHoldSchema = new Schema<IHouseHold>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  status: {
    type: String,
    enum: StatusEnums,
    required: true,
    default: "PUBLISHED",
  },
});

export const HouseHold = model<IHouseHold>("HouseHold", houseHoldSchema);
