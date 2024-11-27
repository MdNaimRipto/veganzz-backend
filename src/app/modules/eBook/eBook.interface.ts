export type statusEnums = "PUBLISHED" | "PAUSED";
export type eBookTypesEnum = "PHYSICAL" | "VIRTUAL";

export interface IEBook {
  name: string;
  // Will remove main and sub img and add one image
  image: string;
  subDescription: string;
  mainDescription: string;
  price: number;
  productType: eBookTypesEnum;
  pdf: null | string;
  status: statusEnums;
  dateAdded: string;
}

export interface IEBookFilters {
  status?: statusEnums;
}
