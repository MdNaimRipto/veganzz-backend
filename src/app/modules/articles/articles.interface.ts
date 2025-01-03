export type articleStatusEnums = "ACTIVE" | "PAUSED";

export interface IArticles {
  title: string;
  image: string;
  description: string;
  status: articleStatusEnums;
  textAlign: string;
}
