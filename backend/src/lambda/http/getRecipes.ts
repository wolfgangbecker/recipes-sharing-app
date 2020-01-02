import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getAllRecipes } from '../../businessLogic/recipes';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const recipes = await getAllRecipes()

  return {
    statusCode: 200,
    body: JSON.stringify(recipes)
  };
};
