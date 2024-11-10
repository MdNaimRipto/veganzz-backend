export type statusEnums = "PUBLISHED" | "DELETED";

export interface IHouseHold {
  name: string;
  image: string;
  description: string;
  link: string;
  status: statusEnums;
}
