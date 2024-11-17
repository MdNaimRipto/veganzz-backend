export type carousalStatusEnums = "ACTIVE" | "PAUSED";

export interface ICarousal {
  title: string;
  image: string;
  status: carousalStatusEnums;
}
