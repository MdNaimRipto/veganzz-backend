export type statusEnums = "PUBLISHED" | "DELETED";

export interface IEBook {
  name: string;
  mainImg: string;
  otherImages: Array<string>;
  subDescription: string;
  mainDescription: string;
  price: number;
  status: statusEnums;
  dateAdded: string;
}

export interface IEBookFilters {
  status?: statusEnums;
}
