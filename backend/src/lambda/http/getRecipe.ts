import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy';
import { cors } from 'middy/middlewares'

import { getRecipe } from '../../businessLogic/recipes';
import { getUserId } from '../../auth/utils';

const getRecipeHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if(!(event.pathParameters && event.pathParameters["recipeId"])) {
    return {
      statusCode: 400,
      body: "Recipe id path parameter is missing"
    }
  }

  const recipeId = event.pathParameters["recipeId"]

  try {
    const userId = getUserId(event);
    const recipe = await getRecipe(userId, recipeId)

    return {
      statusCode: 200,
      body: JSON.stringify(recipe)
    };
  } catch {}

  return {
    statusCode: 404,
    body: "Not found"
  }
};

export const handler = middy(getRecipeHandler).use(cors())
