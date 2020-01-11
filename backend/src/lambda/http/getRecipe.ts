import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy';
import { cors } from 'middy/middlewares'

import { getRecipe } from '../../businessLogic/recipes';

const getRecipeHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if(!(event.pathParameters && event.pathParameters["recipeId"])) {
    return {
      statusCode: 400,
      body: "Recipe id path parameter is missing"
    }
  }

  const recipeId = event.pathParameters["recipeId"]

  const recipe = await getRecipe(recipeId)

  if(!recipe) {
    return {
      statusCode: 404,
      body: "Not found"
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(recipe)
  };
};

export const handler = middy(getRecipeHandler).use(cors())
