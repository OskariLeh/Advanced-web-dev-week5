const foodName = document.getElementById("food-name")
const ingredientsList = document.getElementById("ingredients")
const instructionsList = document.getElementById("instructions")
const nameText = document.getElementById("name-text")
const addIngredient = document.getElementById("add-ingredient")
const addInstruction = document.getElementById("add-instruction")
const submitButton = document.getElementById("submit")
const IngredientText = document.getElementById("ingredients-text")
const instructionText = document.getElementById("instructions-text")
const imageInput = document.getElementById("image-input")
const searchBar = document.getElementById("search-bar")

var instructions = []
var ingredients = []

function getFood(food){
    fetch(`http://localhost:3000/recipe/${food}`, {method: "get"})
    .then(response => response.json())
    .then(data => {
        foodName.innerText = data.name
        data.ingredients.forEach(ingredient => {
            const newItem = document.createElement("li")
            newItem.textContent = ingredient
            ingredientsList.appendChild(newItem)
        })
        data.instructions.forEach(instruction => {
            const newItem = document.createElement("li")
            newItem.textContent = instruction
            instructionsList.appendChild(newItem)
        })
    })
}

searchBar.addEventListener("click", () => {
    getFood(searchBar.value)
})

addIngredient.addEventListener("click", () => {
    if (IngredientText.value.length > 0){
        ingredients.push(IngredientText.value)
        IngredientText.value = ""
        console.log(ingredients)
    }
})

addInstruction.addEventListener("click", () => {
    if (instructionText.value.length > 0){
        instructions.push(instructionText.value)
        instructionText.value = ""
        console.log(instructions)
    }
})

submitButton.addEventListener("click", () => {
    fetch(`http://localhost:3000/recipe/`, {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({name: nameText.value, instructions: instructions, ingredients: ingredients})
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        ingredients = []
        instructions = []
    })

    var images = new FormData()
    for (let index = 0; index < imageInput.files.length; index++) {
        images.append("images", imageInput.files[index].name)
    }
    console.log(images)

    fetch(`http://localhost:3000/images`, {
        method: "post",
        body: images
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
})


getFood("pizza")