import { z } from "zod";
import { RecipeTypesEnums } from "./order.contstant";

const uploadRecipeZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "User Name is Required",
    }),
    image: z.string({
      required_error: "Image is Required",
    }),
    type: z.enum([...RecipeTypesEnums] as [string, ...string[]], {
      required_error: "Recipe Type is Required",
    }),
    subDescription: z.string({
      required_error: "Sub/Short Description is Required",
    }),
    mainDescription: z.string({
      required_error: "Main Description is Required",
    }),
    prepTime: z.string({
      required_error: "Prep Time is Required",
    }),
    cookingTime: z.string({
      required_error: "Cooking Time is Required",
    }),
    portions: z
      .number({
        required_error: "Portions Count is Required",
      })
      .min(1),
    ingredients: z.array(
      z.string({
        required_error: "Ingredients are Required",
      }),
      { required_error: "Ingredients Cannot Be Empty" },
    ),
    preparationSteps: z.array(
      z.string({
        required_error: "Preparation Steps are Required",
      }),
      { required_error: "Preparation Steps Cannot Be Empty" },
    ),
    tips: z.array(
      z.string({
        required_error: "Tips are Required",
      }),
      { required_error: "Tips Cannot Be Empty" },
    ),
  }),
});

export const recipesValidation = {
  uploadRecipeZodSchema,
};
