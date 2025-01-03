"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Articles = void 0;
const mongoose_1 = require("mongoose");
const articles_constant_1 = require("./articles.constant");
const articlesSchema = new mongoose_1.Schema({
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
        enum: articles_constant_1.ArticleStatusEnums,
        required: true,
        default: "PAUSED",
    },
    textAlign: {
        type: String,
        required: true,
    },
});
exports.Articles = (0, mongoose_1.model)("Articles", articlesSchema);
