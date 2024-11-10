export type statusEnums = "PUBLISHED" | "DELETED";

export interface ITravel {
  name: string;
  image: string;
  location: string;
  state: string;
  description: string;
  watchOutFor: string;
  status: statusEnums;
}
