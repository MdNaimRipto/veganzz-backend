import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IArticles } from "./articles.interface";
import { Articles } from "./articles.schema";

const uploadArticle = async (payload: IArticles): Promise<IArticles> => {
  const result = await Articles.create(payload);
  return result;
};

const getAllArticles = async (): Promise<IArticles[]> => {
  const result = await Articles.find({});
  return result;
};

const getActiveArticles = async (): Promise<IArticles[]> => {
  const result = await Articles.find({ status: "ACTIVE" });
  return result;
};

const updateArticle = async (
  id: string,
  payload: Partial<IArticles>,
): Promise<IArticles | null> => {
  const isArticleExists = await Articles.findOne({ _id: id });
  if (!isArticleExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Article Not Found");
  }

  if (payload.status) {
    const status = payload.status;

    console.log(status);

    if (status !== "ACTIVE" && status !== "PAUSED") {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Status Must Be Active or Paused!",
      );
    }
  }

  const result = await Articles.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteArticle = async (id: string): Promise<IArticles | null> => {
  const isArticleExists = await Articles.findOne({ _id: id });
  if (!isArticleExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Article Not Found");
  }

  const result = await Articles.findOneAndDelete(
    { _id: id },
    {
      new: true,
    },
  );

  return result;
};

export const ArticleService = {
  uploadArticle,
  getAllArticles,
  getActiveArticles,
  updateArticle,
  deleteArticle,
};
