import { model, Schema } from "mongoose";
import { IUser } from "./users.interface";
import bcrypt from "bcrypt";
import config from "../../../config/config";
import { UserBehaviorEnums, UserRoleEnums } from "./user.constant";

export const usersSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profileImage: {
      type: String,
      required: true,
      default: "https://i.ibb.co/dcHVrp8/User-Profile-PNG-Image.png",
    },
    password: { type: String, required: true, unique: true },
    role: {
      type: String,
      required: true,
      enum: UserRoleEnums,
      default: "CUSTOMER",
    },
    behavior: {
      type: String,
      enum: UserBehaviorEnums,
      required: true,
      default: "FRIENDLY",
    },
    status: { type: Boolean, required: true, default: false },
    uid: { type: String, required: true, unique: true },
    address: {
      street: { type: String, required: true, default: "Not Updated Yet!" },
      city: { type: String, required: true, default: "Not Updated Yet!" },
      state: { type: String, required: true, default: "Not Updated Yet!" },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

usersSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.salt_round));
  next();
});

export const Users = model<IUser>("Users", usersSchema);
