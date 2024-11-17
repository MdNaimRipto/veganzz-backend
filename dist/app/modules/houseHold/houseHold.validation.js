"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.houseHoldValidation = void 0;
const zod_1 = require("zod");
const uploadHouseHoldZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is Required",
        }),
        image: zod_1.z.string({
            required_error: "Image is Required",
        }),
        description: zod_1.z.string({
            required_error: "Description is Required",
        }),
        link: zod_1.z.string({
            required_error: "Product Link is Required",
        }),
    }),
});
exports.houseHoldValidation = {
    uploadHouseHoldZodSchema,
};
