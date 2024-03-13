// API endpoints - makes it easier to change when needed
let INGREDIENTS_LIST_URL = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";
let MEALS_BY_INGREDIENT_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";

// Helper function to format ingredients for API calls
function formatIngredient(ingredient) {
    return ingredient.toLowerCase().replace(/ /g, "_");
}

// Finds ingredient in the MealDB list
async function findIngredient(ingredient) {
    let response = await fetch(INGREDIENTS_LIST_URL);
    let data = await response.json();
    let meals = data.meals;

    for (let i = 0; i < meals.length; i++) {
        if (meals[i].strIngredient.toLowerCase() === ingredient.toLowerCase()) {
            return meals[i].strIngredient; 
        }
    }
    return "Ingredient Not Found!";
}

// Gets chef's favorite meals based on ingredient
async function chefMeals(ingredient) {
    let response = await fetch(MEALS_BY_INGREDIENT_URL + formatIngredient(ingredient));
    let data = await response.json();
    return data.meals; 
}

// Gets a random meal from a list
async function getRandomMeal(meals) {
    if (meals === null) {
        return "No meals found!";
    } else {
        let randomIndex = Math.floor(Math.random() * meals.length);
        return meals[randomIndex]; 
    }
}

// Takes a new order
async function takeOrder() {
    let ingredient = prompt("What ingredient would you like to order?");
    let foundIngredient = await findIngredient(ingredient);

    if (foundIngredient === "Ingredient Not Found!") {
        alert("Ingredient not found. Please try another.");
        return takeOrder(); // Recursion for better UX
    }

    let meals = await chefMeals(foundIngredient);
    let orderMeal = await getRandomMeal(meals);

    // Generate order number
    let lastOrderNumber = sessionStorage.getItem('lastOrderNumber') || 0;
    let orderNumber = parseInt(lastOrderNumber) + 1;

    // Store order in sessionStorage
    sessionStorage.setItem(`order${orderNumber}`, JSON.stringify({
        meal: orderMeal.strMeal,
        orderNumber: orderNumber,
        completed: false
    }));
    sessionStorage.setItem('lastOrderNumber', orderNumber.toString());

    alert(`Your order for ${orderMeal.strMeal} has been placed!`);
}

// Displays and completes orders
async function manageOrders() {
    let orders = [];
    let lastOrderNum = parseInt(sessionStorage.getItem('lastOrderNumber')) || 0;

    // Retrieve orders from sessionStorage
    for (let i = 1; i <= lastOrderNum; i++) {
        let orderStr = sessionStorage.getItem(`order${i}`);
        if (orderStr) {
            let order = JSON.parse(orderStr);
            if (!order.completed) {
                orders.push(order);
            }
        }
    }

    // Display incomplete orders
    if (orders.length === 0) {
        alert("You have no incomplete orders.");
    } else {
        let orderList = "Incomplete Orders:\n";
        orders.forEach(order => orderList += `Order ${order.orderNumber}: ${order.meal}\n`);

        let orderNumToComplete = prompt(orderList + "Enter order number to complete, or 0 to cancel");
        
    // logic to mark an order as complete in sessionStorage)
        if (orderNumToComplete !== "0") {
            let orderToComplete = orders.find(order => order.orderNumber === parseInt(orderNumToComplete));
            if (orderToComplete) {
                orderToComplete.completed = true;
                sessionStorage.setItem(`order${orderToComplete.orderNumber}`, JSON.stringify(orderToComplete));
                alert(`Order ${orderNumToComplete} has been completed!`);
            } else {
                alert("Invalid order number. Please try again.");
            }
        }
    }
}

// Main Execution
takeOrder() 
    .then(() => manageOrders()); 
