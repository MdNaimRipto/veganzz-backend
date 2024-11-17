"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipesRouter = void 0;
const express_1 = __importDefault(require("express"));
const zodValidationRequest_1 = __importDefault(require("../../../middlewares/zodValidationRequest"));
const recipes_validation_1 = require("./recipes.validation");
const recipes_controller_1 = require("./recipes.controller");
const router = express_1.default.Router();
router.post("/uploadRecipe", (0, zodValidationRequest_1.default)(recipes_validation_1.recipesValidation.uploadRecipeZodSchema), recipes_controller_1.recipesController.uploadRecipe);
router.get("/getAllRecipes", recipes_controller_1.recipesController.getAllRecipes);
router.get("/getRecipeDetails/:id", recipes_controller_1.recipesController.getRecipeDetails);
router.patch("/updateRecipe/:id", recipes_controller_1.recipesController.updateRecipe);
exports.RecipesRouter = router;
