import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { createRecipe } from '../../businessLogic/recipes';
import logger from '../../utils/logger';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if(!event.body) {
    return {
      statusCode: 400,
      body: "Empty request body"
    };
  }

  const parsedBody = JSON.parse(event.body)

  try {
    const recipes = await createRecipe(parsedBody)

    logger.info("Succesfully created: ", JSON.stringify(recipes))
    return {
      statusCode: 201,
      body: JSON.stringify(recipes)
    };
  } catch (error) {
    logger.error("Error: ", error.message);

    return {
      statusCode: 422,
      body: error.message
    };
  }
};
