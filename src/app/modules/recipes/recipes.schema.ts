import { model, Schema } from "mongoose";
import { IRecipe } from "./recipes.interface";
import { RecipeTypesEnums } from "./recipes.contstant";

const recipesSchema = new Schema<IRecipe>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  type: { type: String, enum: RecipeTypesEnums, required: true },
  subDescription: { type: String, required: true },
  mainDescription: { type: String, required: true },
  prepTime: { type: String, required: true },
  cookingTime: { type: String, required: true },
  portions: { type: Number, required: true, min: 1 },
  ingredients: [{ type: String, required: true }],
  preparationSteps: [{ type: String, required: true }],
  tips: [{ type: String, required: true }],
  publishedYear: {
    type: String,
    required: true,
    default: () => new Date().getFullYear().toString(),
  },
});

export const Recipes = model<IRecipe>("Recipes", recipesSchema);
