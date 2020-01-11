import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy';
import { cors } from 'middy/middlewares'

import { deleteRecipe } from '../../businessLogic/recipes';

const deleteRecipeHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if(!(event.pathParameters && event.pathParameters["recipeId"])) {
    return {
      statusCode: 400,
      body: "Recipe id path parameter is missing"
    }
  }

  const recipeId = event.pathParameters["recipeId"]

  try {
    await deleteRecipe(recipeId)

    return {
      statusCode: 204,
      body: ''
    };
  } catch {
    return {
      statusCode: 500,
      body: "Failed to delete"
    };
  }
};

export const handler = middy(deleteRecipeHandler).use(cors())
