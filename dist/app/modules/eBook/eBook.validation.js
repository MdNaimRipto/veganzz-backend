"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EBookValidation = void 0;
const zod_1 = require("zod");
const eBook_constant_1 = require("./eBook.constant");
const uploadEBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is Required",
        }),
        image: zod_1.z.string({
            required_error: "Image is Required",
        }),
        mainDescription: zod_1.z.string({
            required_error: "Main Description is Required",
        }),
        subDescription: zod_1.z.string({
            required_error: "Sub Description is Required",
        }),
        productType: zod_1.z.enum([...eBook_constant_1.EBookTypeEnums], {
            required_error: "Type is required",
        }),
    }),
});
exports.EBookValidation = {
    uploadEBookZodSchema,
};
