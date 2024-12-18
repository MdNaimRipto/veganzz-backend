import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { recipesService } from "./recipes.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { recipeTypeEnums } from "./recipes.interface";
import { RecipesFilterableFields } from "./recipes.contstant";
import pick from "../../../shared/shared";
import { paginationFields } from "../../../constants/pagination.constant";

// Upload Recipe
const uploadRecipe = catchAsync(async (req: Request, res: Response) => {
  const { ...recipe } = req.body;

  const result = await recipesService.uploadRecipe(recipe);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Recipe Uploaded Successfully",
    data: result,
  });
});

// Upload Recipe
const getAllRecipes = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, RecipesFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await recipesService.getAllRecipes(filters, options);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Recipes Retrieved Successfully",
    data: result,
  });
});

// Upload Recipe
const getRecipeDetails = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await recipesService.getRecipeDetails(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Recipe Retrieved Successfully",
    data: result,
  });
});

// Upload Recipe
const updateRecipe = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...recipe } = req.body;

  const result = await recipesService.updateRecipe(id, recipe);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Recipe Updated Successfully",
    data: result,
  });
});

// Delete
const deleteRecipe = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await recipesService.deleteRecipe(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Recipe Deleted Successfully",
    data: result,
  });
});

export const recipesController = {
  uploadRecipe,
  getAllRecipes,
  getRecipeDetails,
  updateRecipe,
  deleteRecipe,
};
