import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { recipesService } from "./recipes.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { recipeTypeEnums } from "./recipes.interface";

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
  const { type } = req.query;

  const result = await recipesService.getAllRecipes(type as recipeTypeEnums);

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

export const recipesController = {
  uploadRecipe,
  getAllRecipes,
  getRecipeDetails,
  updateRecipe,
};
