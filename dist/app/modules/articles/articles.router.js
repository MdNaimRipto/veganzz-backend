"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleRouter = void 0;
const express_1 = __importDefault(require("express"));
const zodValidationRequest_1 = __importDefault(require("../../../middlewares/zodValidationRequest"));
const articles_validation_1 = require("./articles.validation");
const articles_controller_1 = require("./articles.controller");
const router = express_1.default.Router();
router.post("/uploadArticle", (0, zodValidationRequest_1.default)(articles_validation_1.ArticlesValidation.uploadArticleZodSchema), articles_controller_1.ArticleController.uploadArticle);
router.get("/getAllArticles", articles_controller_1.ArticleController.getAllArticles);
router.get("/getActiveArticles", articles_controller_1.ArticleController.getActiveArticles);
router.patch("/updateArticle/:id", articles_controller_1.ArticleController.updateArticle);
router.delete("/deleteArticle/:id", articles_controller_1.ArticleController.deleteArticle);
exports.ArticleRouter = router;
