export type statusEnums = "PUBLISHED" | "DELETED";

export interface IBeauty {
  name: string;
  image: string;
  type: string;
  description: string;
  link: string;
  status: statusEnums;
}
