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
  let uploadUrl;
  let recipe: Recipe = {
    ...createRecipe,
    id: recipeId,
    author: "John Doe" // TODO: pull from jwt token
  };

  if(createRecipe.hasImage) {
    recipe = { ...recipe, imageURL: `https://${imagesBucket}.s3.amazonaws.com/${recipeId}` };
    uploadUrl = imagesAccess.getUploadUrl(recipeId);
  }

  const newRecipe = await recipesAccess.createRecipe(recipe);

  return {
    recipe: newRecipe,
    uploadUrl
  }
}

export async function updateRecipe(recipeId: string, updateRecipe: UpdateRecipe): Promise<{recipe: Recipe, uploadUrl: string}> {
  let uploadUrl;
  let recipe: Recipe = {
    ...updateRecipe,
    id: recipeId,
    author: "John Doe" // TODO: pull from jwt token
  };

  if(updateRecipe.hasImage) {
    const imageURL = `https://${imagesBucket}.s3.amazonaws.com/${recipeId}`
    recipe = { ...recipe, imageURL };
    await imagesAccess.delete(recipeId);
    uploadUrl = imagesAccess.getUploadUrl(recipeId);
  }

  const updatedRecipe = await recipesAccess.updateRecipe("John Doe", recipeId, recipe)

  return {
    recipe: updatedRecipe,
    uploadUrl
  }
}
