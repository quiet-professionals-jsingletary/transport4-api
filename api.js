/*/ --------------------------------------------//
*  ┌─────────────────────────────────────────┐
*  │ |>  Serverless API - Lambda Functions   │
*  └─────────────────────────────────────────┘
*
/*/

const db = require("./db");
const { v4: uuidv4 } = require('uuid');
const {
  GetItemCommand,
  PutItemCommand,
  UpdateItemCommand,
  DeleteItemCommand,
  ScanCommand
} = require("@aws-sdk/client-dynamodb");
const { 
  marshall,
  unmarshall 
} = require("@aws-sdk/util-dynamodb");

// GET_POST
const getPost = async (event) => {
  const response = { 
    "body": "",
    "statusCode": 200
  }

  try {
    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Key: marshall({ postId: event.pathParameters.postId })
    };
    const { Item } = await db.send(new GetItemCommand(params));
    console.log({ Item });

    response.body = JSON.stringify({
      "message": "Successfully fetched post data.",
      "data": (Item) ? unmarshall(Item) : {},
      "rawData": Item
    });

  } catch (err) {
    console.error(err);
    response.statusCode = 500;
    response.body = JSON.stringify({
      "message": "Failed to fetch post",
      "errorMsg": err.message,
      "errorStack": err.stack
    });
  }

  return response;
};

// CREATE_POST
const createPost = async (event) => {
  const response = {
    "body": {},
    "statusCode": 200
  }

  try {
    const data = JSON.parse(event.body);
    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Item: {
        postId: uuidv4(),
        recipeName: data.recipeName,
        recipeDescription: data.recipeDescription,
        recipeInstructions: data.recipeInstructions,
        recipeIngredients: data.recipeIngredients
      }
    };
    const createResult = await db.send(new PutItemCommand(params));

    response.body = JSON.stringify({
      "message": "Successfully created post.",
      createResult
    });

  } catch (err) {
    console.error(err);
    response.statusCode = 500;
    response.body = JSON.stringify({
      "message": "Failed to create post",
      "errorMsg": err.message,
      "errorStack": err.stack
    });
  }

  return response;
};

// UPDATE_POST
// NOTE: The expression props inside `params` are specific to DynamoDB which contains reserved key words
// ---- Any instance of a `DynamoDB` reserved word can be escaped by the prepending `#` character
const updatePost = async (event) => {
  const response = {
    "body": "",
    "statusCode": 200
  }

  try {
    const body = JSON.parse(event.body);
    const objKeys = Object.keys(body);

    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Key: marshall({ postId: event.pathParameters.postId }),
      UpdateExpression: `SET ${objKeys.map((_, index) => `#key${index} = :value${index}`).join(", ")}`,
      ExpressionAttributeNames: objKeys.reduce((acc, key, index) => ({
        ...acc,
        [`#key${index}`]: key,
      }), {}),
      ExpressionAttributeValues: marshall(objKeys.reduce((acc, key, index) => ({
        ...acc,
        [`:value${index}`]: body[key],
      }), {})),

    };

    const updateResult = await db.send(new UpdateItemCommand(params));

    response.body = JSON.stringify({
      "message": "Successfully updated post.",
      updateResult
    });

  } catch (err) {
    console.error(err);
    response.statusCode = 500;
    response.body = JSON.stringify({
      "message": "Failed to create post",
      "errorMsg": err.message,
      "errorStack": err.stack
    });
  }

  return response;
};

// DELETE_POST
const deletePost = async (event) => {
  const response = {
    "body": "",
    "statusCode": 200
  }

  try {
    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Key: marshall({ postId: event.pathParameters.postId })

    }
    const deleteResult = await db.send(new DeleteItemCommand(params));

    response.body = JSON.stringify({
      "message": "Successfully updated post.",
      deleteResult
    });

  } catch (err) {
    console.error(err);
    response.statusCode = 500;
    response.body = JSON.stringify({
      "message": "Failed to create post",
      "errorMsg": err.message,
      "errorStack": err.stack
    });
  }

  return response;
};

// GET_POSTS
const getPosts= async (event) => {
  const response = {
    "body": "",
    "statusCode": 200
  }

  try {
    const { Items } = await db.send(new ScanCommand({ TableName: process.env.DYNAMODB_TABLE_NAME }));
    console.log({ Items });

    response.body = JSON.stringify({
      message: "Successfully fetched all.",
      data: Items.map((item) => unmarshall(item)),
      Items
    });

  } catch (err) {
    console.error(err);
    response.statusCode = 500;
    response.body = JSON.stringify({
      "message": "Failed to fetch post",
      "errorMsg": err.message,
      "errorStack": err.stack
    });
  }

  return response;
};

module.exports = {
  getPost,
  createPost,
  updatePost,
  deletePost
}