import express from "express";
import zodValidationRequest from "../../../middlewares/zodValidationRequest";
import { recipesValidation } from "./recipes.validation";
import { recipesController } from "./recipes.controller";

const router = express.Router();

router.post(
  "/uploadRecipe",
  zodValidationRequest(recipesValidation.uploadRecipeZodSchema),
  recipesController.uploadRecipe,
);

router.get("/getAllRecipes", recipesController.getAllRecipes);

router.get("/getRecipeDetails/:id", recipesController.getRecipeDetails);

router.patch("/updateRecipe/:id", recipesController.updateRecipe);

export const RecipesRouter = router;
