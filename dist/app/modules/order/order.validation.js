"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipesValidation = void 0;
const zod_1 = require("zod");
const uploadRecipeZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "User Name is Required",
        }),
        image: zod_1.z.string({
            required_error: "Image is Required",
        }),
        subDescription: zod_1.z.string({
            required_error: "Sub/Short Description is Required",
        }),
        mainDescription: zod_1.z.string({
            required_error: "Main Description is Required",
        }),
        prepTime: zod_1.z.string({
            required_error: "Prep Time is Required",
        }),
        cookingTime: zod_1.z.string({
            required_error: "Cooking Time is Required",
        }),
        portions: zod_1.z
            .number({
            required_error: "Portions Count is Required",
        })
            .min(1),
        ingredients: zod_1.z.array(zod_1.z.string({
            required_error: "Ingredients are Required",
        }), { required_error: "Ingredients Cannot Be Empty" }),
        preparationSteps: zod_1.z.array(zod_1.z.string({
            required_error: "Preparation Steps are Required",
        }), { required_error: "Preparation Steps Cannot Be Empty" }),
        tips: zod_1.z.array(zod_1.z.string({
            required_error: "Tips are Required",
        }), { required_error: "Tips Cannot Be Empty" }),
    }),
});
exports.recipesValidation = {
    uploadRecipeZodSchema,
};
