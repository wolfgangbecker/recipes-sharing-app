import { RecipesAccess } from "../dataLayer/recipesAccess"
import { Recipe } from '../models/Recipe';

const groupAccess = new RecipesAccess()

export async function getAllRecipes(): Promise<Recipe[]> {
  return groupAccess.getAllRecipes()
}
