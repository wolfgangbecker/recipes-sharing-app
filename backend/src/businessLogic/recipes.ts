import * as uuid from 'uuid';

import { RecipesAccess } from "../dataLayer/recipesAccess";
import { Recipe } from '../models/Recipe';
import { CreateRecipe } from "../requests/CreateRecipe";

const recipesAccess = new RecipesAccess()

export async function getAllRecipes(): Promise<Recipe[]> {
  return recipesAccess.getAllRecipes("John Doe") // TODO: pull author from jwt token
}

export async function getRecipe(recipeId): Promise<Recipe> {
  return recipesAccess.getRecipe("John Doe", recipeId) // TODO: pull author from jwt token
}

export async function createRecipe(createRecipe: CreateRecipe): Promise<Recipe> {
  const recipe: Recipe = {
    ...createRecipe,
    id: uuid.v4(),
    author: "John Doe" // TODO: pull from jwt token
  };

  return recipesAccess.createRecipe(recipe)
}
