"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticlesValidation = void 0;
const zod_1 = require("zod");
const uploadArticleZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title is Required",
        }),
        image: zod_1.z.string({
            required_error: "image is Required",
        }),
        description: zod_1.z.array(zod_1.z.string({ required_error: "Description Required" }), {
            required_error: "Description Required",
        }),
    }),
});
exports.ArticlesValidation = {
    uploadArticleZodSchema,
};
