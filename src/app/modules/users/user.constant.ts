import { userRoleEnums, userBehaviorEnums } from "./users.interface";

export const UserRoleEnums: userRoleEnums[] = ["ADMIN", "CUSTOMER", "EDITOR"];

export const UserBehaviorEnums: userBehaviorEnums[] = [
  "ABUSIVE",
  "FAKE",
  "SPAMMING",
  "FRIENDLY",
];

export const UserFilterableFields = ["behavior"];
