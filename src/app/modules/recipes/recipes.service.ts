import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IRecipe, IRecipesFilters, recipeTypeEnums } from "./recipes.interface";
import { Recipes } from "./recipes.schema";
import {
  IGenericPaginationResponse,
  IPaginationOptions,
} from "../../../interface/pagination";
import { calculatePaginationFunction } from "../../../helpers/paginationHelpers";
import { SortOrder } from "mongoose";

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

const getAllRecipes = async (
  filters: IRecipesFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericPaginationResponse<IRecipe[]>> => {
  const andConditions = [];

  if (Object.keys(filters).length) {
    andConditions.push({
      $and: Object.entries(filters).map(([field, value]) => {
        return { [field]: value };
      }),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePaginationFunction(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const checkAndCondition =
    andConditions?.length > 0 ? { $and: andConditions } : {};

  const result = await Recipes.find(checkAndCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Recipes.countDocuments(checkAndCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
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
