import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy';
import { cors } from 'middy/middlewares'

import { updateRecipe } from '../../businessLogic/recipes';
import logger from '../../utils/logger';
import { getUserId } from '../../auth/utils';

const updateRecipeHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if(!(event.pathParameters && event.pathParameters["recipeId"])) {
    return {
      statusCode: 400,
      body: "Recipe id path parameter is missing"
    }
  }

  if(!event.body) {
    return {
      statusCode: 400,
      body: "Empty request body"
    };
  }

  const recipeId = event.pathParameters["recipeId"]

  try {
    const parsedBody = JSON.parse(event.body)
    const userId = getUserId(event);
    const recipes = await updateRecipe(userId, recipeId, parsedBody)

    logger.info("Succesfully updated: ", JSON.stringify(recipes))
    return {
      statusCode: 200,
      body: JSON.stringify(recipes)
    };
  } catch (error) {
    logger.error("Error: ", error.message, "request body: ", event.body);

    return {
      statusCode: 422,
      body: error.message
    };
  }
};

export const handler = middy(updateRecipeHandler).use(cors())
