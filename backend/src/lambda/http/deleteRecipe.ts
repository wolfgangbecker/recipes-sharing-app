import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy';
import { cors } from 'middy/middlewares'

import { deleteRecipe } from '../../businessLogic/recipes';
import { getUserId } from '../../auth/utils';

const deleteRecipeHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if(!(event.pathParameters && event.pathParameters["recipeId"])) {
    return {
      statusCode: 400,
      body: "Recipe id path parameter is missing"
    }
  }

  const recipeId = event.pathParameters["recipeId"]

  try {
    const userId = getUserId(event);
    await deleteRecipe(userId, recipeId)

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
