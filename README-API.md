# Food Facts API Documentation

## Introduction
Welcome to the Food Facts API! This API allows users to explore food health, retrieve and determine their food's nutritional content, and log their experiences. It is designed to help users keep track of healthy eating goals.

Base URL: `http://127.0.0.1:8000`

## Endpoints

### 1. Get All Food
**URL:** `/FoodFacts`

**Method:** GET

**Description:** Fetch a list of all food items in the database.

**Request Parameters:**
- None

**Request Body:**
- None

**Response Example:**
```json
[
  {
    "id": "1",
    "name": "Apple",
    "nutritionFacts": {
      "calories": 52,
      "protein": 0.3,
      "carbs": 14,
      "fat": 0.2
    }
  },
  {
    "id": "2",
    "name": "Banana",
    "nutritionFacts": {
      "calories": 89,
      "protein": 1.1,
      "carbs": 23,
      "fat": 0.3
    }
  }
]
```

**HTTP Status Codes:**
- `200 OK` - Successfully retrieved all food items.

---

### 2. Create a New Food
**URL:** `/FoodFacts`

**Method:** POST

**Description:** Add a new food item to the database.

**Request Parameters:**
- None

**Request Body:**
```json
{
  "name": "string",
  "nutritionFacts": {
    "calories": "number",
    "protein": "number",
    "carbs": "number",
    "fat": "number"
  }
}
```

**Response Example:**
```json
{
  "id": "3",
  "name": "Orange",
  "nutritionFacts": {
    "calories": 47,
    "protein": 0.9,
    "carbs": 12,
    "fat": 0.1
  }
}
```

**HTTP Status Codes:**
- `201 Created` - Successfully created a new food item.
- `400 Bad Request` - Invalid input.

---

### 3. Get Food by ID
**URL:** `/FoodFacts/{id}`

**Method:** GET

**Description:** Retrieve details of a specific food item by its ID.

**Request Parameters:**
- `id` (string): The unique ID of the food item to retrieve.

**Request Body:**
- None

**Response Example:**
```json
{
  "id": "1",
  "name": "Apple",
  "nutritionFacts": {
    "calories": 52,
    "protein": 0.3,
    "carbs": 14,
    "fat": 0.2
  }
}
```

**HTTP Status Codes:**
- `200 OK` - Successfully retrieved the food item.
- `404 Not Found` - Food item not found.

---

### 4. Delete a Food by ID
**URL:** `/FoodFacts/{id}`

**Method:** DELETE

**Description:** Delete a specific food item from the database using its unique ID.

**Request Parameters:**
- `id` (string): The unique ID of the food item to delete.

**Request Body:**
- None

**Response Example:**
```json
{
  "message": "Food item with ID 1 has been deleted."
}
```

**HTTP Status Codes:**
- `200 OK` - Successfully deleted the food item.
- `404 Not Found` - Food item not found.

---

### 5. Update a Food by ID
**URL:** `/FoodFacts/{id}`

**Method:** PATCH

**Description:** Update details of a specific food item in the database using its unique ID.

**Request Parameters:**
- `id` (string): The unique ID of the food item to update.

**Request Body:**
```json
{
  "name": "string", 
  "nutritionFacts": {
    "calories": "number", 
    "protein": "number", 
    "carbs": "number", 
    "fat": "number" 
  }
}
```

**Response Example:**
```json
{
  "id": "1",
  "name": "Updated Apple",
  "nutritionFacts": {
    "calories": 50,
    "protein": 0.4,
    "carbs": 13,
    "fat": 0.1
  }
}
```

**HTTP Status Codes:**
- `200 OK` - Successfully updated the food item.
- `404 Not Found` - Food item not found.
- `400 Bad Request` - Invalid input.

---

### 6. Add User
**URL:** `/Users`

**Method:** POST

**Description:** Add a new user to the system.

**Request Parameters:**
- None

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "goals": {
    "calories": "number",
    "protein": "number",
    "carbs": "number",
    "fat": "number"
  }
}
```

**Response Example:**
```json
{
  "id": "1",
  "username": "JohnDoe",
  "email": "john@example.com",
  "goals": {
    "calories": 2000,
    "protein": 50,
    "carbs": 250,
    "fat": 70
  }
}
```

**HTTP Status Codes:**
- `201 Created` - Successfully created a new user.
- `400 Bad Request` - Invalid input.

---

### 7. Log User Food Intake
**URL:** `/Users/{id}/LogFood`

**Method:** POST

**Description:** Log a food item consumed by the user and check if it exceeds their goals.

**Request Parameters:**
- `id` (string): The unique ID of the user.

**Request Body:**
```json
{
  "foodId": "string",
  "quantity": "number" 
}

```

**Response Example:**
```json
{
  "userId": "1",
  "foodLogged": {
    "id": "1",
    "name": "Apple",
    "nutritionFacts": {
      "calories": 52,
      "protein": 0.3,
      "carbs": 14,
      "fat": 0.2
    },
    "quantity": 2
  },
  "goalsStatus": {
    "caloriesExceeded": false,
    "proteinExceeded": false,
    "carbsExceeded": false,
    "fatExceeded": false
  }
}
```

**HTTP Status Codes:**
- `200 OK` - Successfully logged the food intake.
- `400 Bad Request` - Invalid input.
- `404 Not Found` - User or food item not found.

---

## Technologies Used
- **Node.js**
- **Google Vision API**
- **React**

3. Access the API at `http://127.0.0.1:8000`.

---

## Future Enhancements
- Add user authentication.
- Support advanced search and filter options for food items.
- Integrate with external APIs for detailed food data.