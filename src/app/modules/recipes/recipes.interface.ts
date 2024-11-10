export type recipeTypeEnums =
  | "BREAKFAST"
  | "LAUNCH"
  | "DINNER"
  | "SALADS"
  | "BREADS"
  | "SNACKS"
  | "DRINKS"
  | "DESSERTS"
  | "PANTRY";

export interface IRecipe {
  name: string;
  image: string;
  type: recipeTypeEnums;
  subDescription: string;
  mainDescription: string;
  prepTime: string;
  cookingTime: string;
  portions: number;
  ingredients: Array<string>;
  preparationSteps: Array<string>;
  tips: Array<string>;
  publishedYear: string;
}

export interface IRecipesFilters {
  publishedYear?: string;
  type?: recipeTypeEnums;
}
