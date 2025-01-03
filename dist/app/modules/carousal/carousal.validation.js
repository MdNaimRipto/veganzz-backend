"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarousalsValidation = void 0;
const zod_1 = require("zod");
const uploadCarousalZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title is Required",
        }),
        image: zod_1.z.string({
            required_error: "image is Required",
        }),
        textSize: zod_1.z.string({
            required_error: "textSize is Required",
        }),
        textWeight: zod_1.z.string({
            required_error: "textWeight is Required",
        }),
        textColor: zod_1.z.string({
            required_error: "textColor is Required",
        }),
    }),
});
exports.CarousalsValidation = {
    uploadCarousalZodSchema,
};
