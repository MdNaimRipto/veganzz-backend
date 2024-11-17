"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipes = void 0;
const mongoose_1 = require("mongoose");
const recipes_contstant_1 = require("./recipes.contstant");
const recipesSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    type: { type: String, enum: recipes_contstant_1.RecipeTypesEnums, required: true },
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
exports.Recipes = (0, mongoose_1.model)("Recipes", recipesSchema);
