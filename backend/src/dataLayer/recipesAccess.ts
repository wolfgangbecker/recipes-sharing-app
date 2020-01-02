import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import logger from '../utils/logger';
import { Recipe } from '../models/Recipe';

export class RecipesAccess {
  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly recipesTable: any = process.env.RECIPES_TABLE
  ) {}

  async getAllRecipes(): Promise<Recipe[]> {
    logger.info("Getting all Recipes");

    const result = await this.docClient.scan({
      TableName: this.recipesTable
    }).promise();

    return result.Items as Recipe[];
  }

  async createRecipe(recipe: Recipe): Promise<Recipe> {
    logger.info("Creating Recipe: ", JSON.stringify(recipe));

    const result = await this.docClient.put({
      TableName: this.recipesTable,
      Item: recipe
    }).promise();

    return result.Attributes as Recipe;
  }
}

function createDynamoDBClient() {
  if(process.env.IS_OFFLINE) {
    logger.info('Creating a local DynamoDB instance')

    return new AWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    })
  }

  return new AWS.DynamoDB.DocumentClient()
}
