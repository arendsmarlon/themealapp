# themealapp

# Meal Ordering System

This is a simple meal ordering system that allows users to place orders based on ingredients and manage those orders.

## API Endpoints

To fetch the list of ingredients, the system uses the following API endpoint:

- `INGREDIENTS_LIST_URL`: [https://www.themealdb.com/api/json/v1/1/list.php?i=list](https://www.themealdb.com/api/json/v1/1/list.php?i=list)

To filter meals based on a specific ingredient, the system uses the following API endpoint:

- `MEALS_BY_INGREDIENT_URL`: [https://www.themealdb.com/api/json/v1/1/filter.php?i=](https://www.themealdb.com/api/json/v1/1/filter.php?i=)

## Functionality

### `formatIngredient(ingredient)`

- Description: Helper function to format ingredients for API calls.
- Parameters:
  - `ingredient`: The ingredient to be formatted.
- Returns: The formatted ingredient string.

### `findIngredient(ingredient)`

- Description: Finds the ingredient in the MealDB list.
- Parameters:
  - `ingredient`: The ingredient to be found.
- Returns: The found ingredient or "Ingredient Not Found!" if not found.

### `chefMeals(ingredient)`

- Description: Gets chef's favorite meals based on the ingredient.
- Parameters:
  - `ingredient`: The ingredient to filter meals by.
- Returns: An array of meals matching the provided ingredient.

### `getRandomMeal(meals)`

- Description: Gets a random meal from a list.
- Parameters:
  - `meals`: An array of meals.
- Returns: A random meal from the provided list or "No meals found!" if the list is empty.

### `takeOrder()`

- Description: Takes a new order from the user.
- Returns: Alerts the user about the placed order.

### `manageOrders()`

- Description: Displays and completes orders.
- Returns: Alerts the user about incomplete orders and marks orders as complete if requested.

### Main Execution

The main execution starts with `takeOrder()` followed by `manageOrders()`.

## Usage

To use this system, simply run the script. You will be prompted to place an order by entering an ingredient. Once the order is placed, you can manage your orders by completing them as necessary.

## Note

This system is built using vanilla JavaScript and utilizes the MealDB API for fetching ingredients and meals. Make sure you have an active internet connection for API requests to work properly.
