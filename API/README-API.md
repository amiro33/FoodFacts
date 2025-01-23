# Food Facts API Documentation

# Introduction
Welcome to the Food Facts Review API! This API allows users to explore food health, read
and determine their own food nutrition and health experiences. This is designed to help keep trach of healthy eating goals. 

Base url : http://127.0.0.1:8000/get-message
FoodFacts

# Get All Food
URL: /FoodFacts
Method: GET
Description: Fetch a list of all food in the database.

Request Parameters: No parameters needed
Request Body Object Structure: No request object needed.
Response Object Structure:

Response Example:
HTTP Status Codes:

# Create a New Food
URL: /FoodFacts
Method: POST
Description: Add a new food to the database.

Request Parameters: No parameters needed
Request Body Object Structure:

Response Example:
HTTP Status Codes:

# Get Food by ID
URL: /FoodFacts/{id}
Method: GET
Description: Retrieve details of a specific food by its ID.

Request Parameters
id: The unique ID of the food to be retrieved.
Request Body Object Structure: No request object needed.
Response Object Structure:

Response Example:
HTTP Status Codes:

# Delete a Food by ID
URL: /FoodFacts/{id}
Method: DELETE
Description: Delete a specific food from the database using its unique ID.

Request Parameters
id: The unique ID of the food to be retrieved.
Request Body Object Structure:
No request object needed.
Response Object Structure:

Response Example:
HTTP Status Codes:

# Update a Food by ID
URL: /FoodFacts/{id}
Method: PATCH
Description: Update a specific food from the database using its unique ID.

Request Parameters
id: The unique ID of the food to be retrieved.
Request Body Object Structure:

Response Example:
HTTP Status Codes: