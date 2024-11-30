import express from "express";
import zodValidationRequest from "../../../middlewares/zodValidationRequest";
import { ArticlesValidation } from "./articles.validation";
import { ArticleController } from "./articles.controller";

const router = express.Router();

router.post(
  "/uploadArticle",
  zodValidationRequest(ArticlesValidation.uploadArticleZodSchema),
  ArticleController.uploadArticle,
);

router.get("/getAllArticles", ArticleController.getAllArticles);

router.get("/getActiveArticles", ArticleController.getActiveArticles);

router.patch("/updateArticle/:id", ArticleController.updateArticle);

router.delete("/deleteArticle/:id", ArticleController.deleteArticle);

export const ArticleRouter = router;
