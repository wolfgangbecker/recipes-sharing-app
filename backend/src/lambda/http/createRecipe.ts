import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy';
import { cors } from 'middy/middlewares'

import { createRecipe } from '../../businessLogic/recipes';
import logger from '../../utils/logger';
import { getUserId } from '../../auth/utils';

const createRecipeHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if(!event.body) {
    return {
      statusCode: 400,
      body: "Empty request body"
    };
  }

  try {
    const userId = getUserId(event);
    const parsedBody = JSON.parse(event.body)
    const result = await createRecipe(userId, parsedBody)

    logger.info("Succesfully created: ", JSON.stringify(result))

    return {
      statusCode: 201,
      body: JSON.stringify(result)
    };
  } catch (error) {
    logger.error("Error: ", error.message, "request body: ", event.body);

    return {
      statusCode: 422,
      body: error.message
    };
  }
};

export const handler = middy(createRecipeHandler).use(cors())
