"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const articles_schema_1 = require("./articles.schema");
const uploadArticle = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield articles_schema_1.Articles.create(payload);
    return result;
});
const getAllArticles = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield articles_schema_1.Articles.find({});
    return result;
});
const getActiveArticles = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield articles_schema_1.Articles.find({ status: "ACTIVE" });
    return result;
});
const updateArticle = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isArticleExists = yield articles_schema_1.Articles.findOne({ _id: id });
    if (!isArticleExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Article Not Found");
    }
    if (payload.status) {
        const status = payload.status;
        console.log(status);
        if (status !== "ACTIVE" && status !== "PAUSED") {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Status Must Be Active or Paused!");
        }
    }
    const result = yield articles_schema_1.Articles.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteArticle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isArticleExists = yield articles_schema_1.Articles.findOne({ _id: id });
    if (!isArticleExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Article Not Found");
    }
    const result = yield articles_schema_1.Articles.findOneAndDelete({ _id: id }, {
        new: true,
    });
    return result;
});
exports.ArticleService = {
    uploadArticle,
    getAllArticles,
    getActiveArticles,
    updateArticle,
    deleteArticle,
};
