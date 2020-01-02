import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { Recipe } from '../models/Recipe';

export class RecipesAccess {
  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly recipesTable: any = process.env.RECIPES_TABLE
  ) {}

  async getAllRecipes(): Promise<Recipe[]> {
    const result = await this.docClient.scan({
      TableName: this.recipesTable
    }).promise();

    return result.Items as Recipe[];
  }
}

function createDynamoDBClient() {
  if(process.env.IS_OFFLINE) {
    console.log('Creating a local DynamoDB instance')

    return new AWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    })
  }

  return new AWS.DynamoDB.DocumentClient()
}
