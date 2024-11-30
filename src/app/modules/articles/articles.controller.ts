import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ArticleService } from "./articles.service";

// Upload Article
const uploadArticle = catchAsync(async (req: Request, res: Response) => {
  const { ...payload } = req.body;

  const result = await ArticleService.uploadArticle(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Article Uploaded Successfully",
    data: result,
  });
});

// Get All
const getAllArticles = catchAsync(async (req: Request, res: Response) => {
  const result = await ArticleService.getAllArticles();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Article's Retrieved Successfully",
    data: result,
  });
});

// Get Actives
const getActiveArticles = catchAsync(async (req: Request, res: Response) => {
  const result = await ArticleService.getActiveArticles();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Article's Retrieved Successfully",
    data: result,
  });
});

// Update
const updateArticle = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...payload } = req.body;

  const result = await ArticleService.updateArticle(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Article Updated Successfully",
    data: result,
  });
});

// Delete
const deleteArticle = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ArticleService.deleteArticle(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Article Deleted Successfully",
    data: result,
  });
});

export const ArticleController = {
  uploadArticle,
  getAllArticles,
  getActiveArticles,
  updateArticle,
  deleteArticle,
};
