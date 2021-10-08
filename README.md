# Transport4 - API

Here is the main URI: https://koiihe2l31.execute-api.us-east-2.amazonaws.com/dev

Endpoints:
- post (POST)
- post/{id} (DELETE, GET, PUT)
- posts (GET)

Pass in Key as Header: `X-Api-Key: gK9RlVNWmM7tDqzz4KFo39YhJlC7gDWV7VDcQGqN`

## Objective

1. Create a simple "Taco Recipe" REST API. 

2. Use the latest NodeJS Framework and Typescript

3. Our preference is an AWS serverless API project built using AWS SAM or [Serverless](https://www.serverless.com/) framework.  If you are unable to use one of these, a classic Express API will suffice.  You should be able to create a free AWS account, and run the serverless features required for an API on [their free tier](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Categories=categories%23serverless) for this exercise.

4.  When you're finished, please push your code to GitHub and send a link to matt.marooney@transport4.com
 
# API Requirements

1. Consumers of the API should be able access full REST endpoints for the following actions:
    - Creating Taco recipes 
    - Updating Taco recipes
    - Deleting Taco recipes
    - Retrieving a list of Taco recipes
    - Retrieve list of Taco sauces from Spoonacular.com Ingredient API
    - Post Taco Recipe to Spoonacular.com API and return Recipe Card image

2. Taco recipes consist of the following data:
    - Recipe Name
    - Recipe Description
    - Recipe Instructions
    - Ingredients:
        - Taco Shell
        - Taco Protein(s)
        - Taco Topping(s)
        - Taco Sauce(s)

3. The API should use some sort of mock DB and/or caching to persist the Taco recipe data

4. The API should contain at least one "positive" unit test and one "negative" unit test

5. Use best-practice REST specifications, async patterns, clean coding practices, and your creativity and ingenuity!

# Spoonacular API information:
  
- API Key: 3c96dbdcf8a645fd830ad715ffc77da2
- [API Documentation](https://spoonacular.com/food-api/docs)
- Use the [Create Recipe Card](https://spoonacular.com/food-api/docs#Create-Recipe-Card) endpoint to generate a recipe card image 
- Use the [Ingredient endpoints](https://spoonacular.com/food-api/docs#Ingredient-Search) to retrieve the list of possible Taco sauces from Spoonacular 



