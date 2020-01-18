import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy';
import { cors } from 'middy/middlewares'

import { getAllRecipes } from '../../businessLogic/recipes';
import { getUserId } from '../../auth/utils';

const getRecipesHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const userId = getUserId(event);
  const recipes = await getAllRecipes(userId)

  return {
    statusCode: 200,
    body: JSON.stringify(recipes)
  };
};

export const handler = middy(getRecipesHandler).use(cors())
