"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EBookValidation = void 0;
const zod_1 = require("zod");
const uploadEBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is Required",
        }),
        mainImg: zod_1.z.string({
            required_error: "Image is Required",
        }),
        otherImages: zod_1.z.array(zod_1.z.string({ required_error: "Other Images are Required" }), {
            required_error: "Other Images Are Required",
        }),
        mainDescription: zod_1.z.string({
            required_error: "Main Description is Required",
        }),
        subDescription: zod_1.z.string({
            required_error: "Sub Description is Required",
        }),
    }),
});
exports.EBookValidation = {
    uploadEBookZodSchema,
};
