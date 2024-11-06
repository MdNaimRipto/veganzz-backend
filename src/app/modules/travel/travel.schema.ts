import { model, Schema } from "mongoose";
import { ITravel } from "./travel.interface";

const travelsSchema = new Schema<ITravel>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
  state: { type: String, required: true },
  description: { type: String, required: true },
  watchOutFor: { type: String, required: true },
});

export const Travels = model<ITravel>("Travels", travelsSchema);
