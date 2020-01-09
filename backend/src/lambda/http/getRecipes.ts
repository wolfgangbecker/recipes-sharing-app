import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy';
import { cors } from 'middy/middlewares'

import { getAllRecipes } from '../../businessLogic/recipes';


const getRecipesHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const recipes = await getAllRecipes()

  return {
    statusCode: 200,
    body: JSON.stringify(recipes)
  };
};

export const handler = middy(getRecipesHandler).use(cors())
