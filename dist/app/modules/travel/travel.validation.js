"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.travelsValidation = void 0;
const zod_1 = require("zod");
const uploadTravelsZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "User Name is Required",
        }),
        image: zod_1.z.string({
            required_error: "Image is Required",
        }),
        location: zod_1.z.string({
            required_error: "Location is Required",
        }),
        state: zod_1.z.string({
            required_error: "State is Required",
        }),
        description: zod_1.z.string({
            required_error: "Description is Required",
        }),
        watchOutFor: zod_1.z.string({
            required_error: "Watch Out For is Required",
        }),
    }),
});
exports.travelsValidation = {
    uploadTravelsZodSchema,
};
