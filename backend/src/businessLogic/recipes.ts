import * as uuid from 'uuid';

import { RecipesAccess } from "../dataLayer/recipesAccess";
import { ImagesAccess } from "../dataLayer/imagesAccess";
import { Recipe } from '../models/Recipe';
import { CreateRecipe } from "../requests/CreateRecipe";
import { UpdateRecipe } from "../requests/UpdateRecipe";

const imagesBucket = process.env.IMAGES_BUCKET
const recipesAccess = new RecipesAccess()
const imagesAccess = new ImagesAccess()

export async function getAllRecipes(): Promise<Recipe[]> {
  return recipesAccess.getAllRecipes("John Doe") // TODO: pull author from jwt token
}

export async function getRecipe(recipeId: string): Promise<Recipe> {
  return recipesAccess.getRecipe("John Doe", recipeId) // TODO: pull author from jwt token
}

export async function deleteRecipe(recipeId: string): Promise<void> {
  return recipesAccess.deleteRecipe("John Doe", recipeId) // TODO: pull author from jwt token
}

export async function createRecipe(createRecipe: CreateRecipe): Promise<{recipe: Recipe, uploadUrl: string}> {
  const recipeId = uuid.v4();

  const recipe: Recipe = {
    ...createRecipe,
    id: recipeId,
    imageURL: `https://${imagesBucket}.s3.amazonaws.com/${recipeId}`,
    author: "John Doe" // TODO: pull from jwt token
  };

  const newRecipe = await recipesAccess.createRecipe(recipe);
  const uploadUrl = imagesAccess.getUploadUrl(recipeId);

  return {
    recipe: newRecipe,
    uploadUrl
  }
}

export async function updateRecipe(recipeId: string, updateRecipe: UpdateRecipe): Promise<Recipe> {
  return recipesAccess.updateRecipe("John Doe", recipeId, updateRecipe)
}
