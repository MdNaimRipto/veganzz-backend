import { model, Schema } from "mongoose";
import { IArticles } from "./articles.interface";
import { ArticleStatusEnums } from "./articles.constant";

const articlesSchema = new Schema<IArticles>({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ArticleStatusEnums,
    required: true,
    default: "PAUSED",
  },
  textAlign: {
    type: String,
    required: true,
  },
});

export const Articles = model<IArticles>("Articles", articlesSchema);
