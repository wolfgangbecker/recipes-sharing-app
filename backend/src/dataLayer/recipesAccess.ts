import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import logger from '../utils/logger';
import { Recipe } from '../models/Recipe';

export class RecipesAccess {
  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly recipesTable: any = process.env.RECIPES_TABLE
  ) {}

  async getAllRecipes(author: null|string = null): Promise<Recipe[]> {
    logger.info("Getting all Recipes");
    let result;

    if(!author) {
      result = await this.docClient.scan({
        TableName: this.recipesTable
      }).promise();
    } else {
      result = await this.docClient.query({
        TableName: this.recipesTable,
        KeyConditionExpression: 'author = :author',
        ExpressionAttributeValues: {
          ':author': 'John Doe'
        }
      }).promise();
    }

    return result.Items as Recipe[];
  }

  async getRecipe(author: string, recipeId: string): Promise<Recipe> {
    logger.info("Getting Recipe with id: ", recipeId);

    const result = await this.docClient.get({
      TableName: this.recipesTable,
      Key: {
        author,
        id: recipeId
      }
    }).promise();

    return result.Item as Recipe;
  }

  async deleteRecipe(author: string, recipeId: string): Promise<void> {
    logger.info("Deleting Recipe with id: ", recipeId);

    const result = await this.docClient.delete({
      TableName: this.recipesTable,
      Key: {
        author,
        id: recipeId
      }
    }).promise();

    console.log(result)
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
