import * as uuid from 'uuid';

import { RecipesAccess } from "../dataLayer/recipesAccess";
import { ImagesAccess } from "../dataLayer/imagesAccess";
import { Recipe } from '../models/Recipe';
import { CreateRecipe } from "../requests/CreateRecipe";
import { UpdateRecipe } from "../requests/UpdateRecipe";

const imagesBucket = process.env.IMAGES_BUCKET
const recipesAccess = new RecipesAccess()
const imagesAccess = new ImagesAccess()

export async function getAllRecipes(userId: string): Promise<Recipe[]> {
  return recipesAccess.getAllRecipes(userId)
}

export async function getRecipe(userId: string, recipeId: string): Promise<Recipe> {
  return recipesAccess.getRecipe(userId, recipeId)
}

export async function deleteRecipe(userId: string, recipeId: string): Promise<void> {
  try {
    await imagesAccess.delete(recipeId);
  } catch {}
  return recipesAccess.deleteRecipe(userId, recipeId)
}

export async function createRecipe(userId: string, createRecipe: CreateRecipe): Promise<{recipe: Recipe, uploadUrl: string}> {
  const recipeId = uuid.v4();
  let uploadUrl;
  let recipe: Recipe = {
    ...createRecipe,
    id: recipeId,
    author: userId
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

export async function updateRecipe(userId: string, recipeId: string, updateRecipe: UpdateRecipe): Promise<{recipe: Recipe, uploadUrl: string}> {
  let uploadUrl;
  let recipe: Recipe = {
    ...updateRecipe,
    id: recipeId,
    author: userId
  };

  if(updateRecipe.hasImage) {
    const imageURL = `https://${imagesBucket}.s3.amazonaws.com/${recipeId}`
    recipe = { ...recipe, imageURL };
    try {
      await imagesAccess.delete(recipeId);
    } catch {}
    uploadUrl = imagesAccess.getUploadUrl(recipeId);
  }

  const updatedRecipe = await recipesAccess.updateRecipe(userId, recipeId, recipe)

  return {
    recipe: updatedRecipe,
    uploadUrl
  }
}
