"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.travelHelpersValidation = void 0;
const zod_1 = require("zod");
const helpers_contstant_1 = require("./helpers.contstant");
const uploadTravelHelperZodSchema = zod_1.z.object({
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
        category: zod_1.z.enum([...helpers_contstant_1.TravelHelperCategoryEnumsTypesEnums], {
            required_error: "Category is Required",
        }),
        helperFor: zod_1.z.string({
            required_error: "Helper For Mongo ID is Required",
        }),
    }),
});
exports.travelHelpersValidation = {
    uploadTravelHelperZodSchema,
};
