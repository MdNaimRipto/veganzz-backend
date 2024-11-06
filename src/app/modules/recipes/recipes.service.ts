import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IRecipe, recipeTypeEnums } from "./recipes.interface";
import { Recipes } from "./recipes.schema";

const uploadRecipe = async (payload: IRecipe): Promise<IRecipe | null> => {
  const { ingredients, preparationSteps } = payload;

  if (!ingredients.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Ingredients Cannot be Empty!");
  }

  if (!preparationSteps.length) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Preparation Steps Cannot be Empty!",
    );
  }

  const result = await Recipes.create(payload);
  return result;
};

const getAllRecipes = async (type: recipeTypeEnums): Promise<IRecipe[]> => {
  const result = await Recipes.find({ type: type });
  return result;
};

const getRecipeDetails = async (id: string): Promise<IRecipe | null> => {
  const result = await Recipes.findOne({ _id: id });
  return result;
};

const updateRecipe = async (
  id: string,
  payload: Partial<IRecipe>,
): Promise<IRecipe | null> => {
  const isRecipeExists = await Recipes.findOne({ _id: id });
  if (!isRecipeExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Recipe Not Found!");
  }

  const { ingredients, preparationSteps, tips, ...restPayload } = payload;

  const updatablePayload = restPayload as any;

  if (ingredients) {
    updatablePayload.ingredients = ingredients;
  }

  if (preparationSteps) {
    updatablePayload.preparationSteps = preparationSteps;
  }

  if (tips) {
    updatablePayload.tips = tips;
  }

  const result = await Recipes.findOneAndUpdate({ _id: id }, updatablePayload, {
    new: true,
  });

  return result;
};

export const recipesService = {
  uploadRecipe,
  getAllRecipes,
  getRecipeDetails,
  updateRecipe,
};
