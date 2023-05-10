const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
const APP_ID = 'e4ae3c1d';
const APP_KEY = '6275dee8f23d42ed421f9f810d09a10d';https://api.edamam.com/search
let searchQuery = '';

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector("input").value;
    fetchAPI();
  });
  
  async function fetchAPI() {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=100`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
  }
  
  function generateHTML(results) {
    container.classList.remove("initial");
    let generatedHTML = "";
    results.map((result) => {
      generatedHTML += `
        <div class="item">
          <img src="${result.recipe.image}" alt="img">
          <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <a class="view-button" target="_blank" href="${
              result.recipe.url
            }">View Recipe</a>
          </div>
          <p class="item-data">Calories: ${result.recipe.calories.toFixed(0)}</p>
          <p class="item-data">Diet label: ${
            result.recipe.dietLabels.length > 0
              ? result.recipe.dietLabels
              : "No Data Found"
          }</p>
          <p class="item-data">Meal type: ${result.recipe.mealType}</p>
          <p class="item-data">Dish type: ${result.recipe.dishType}</p>
          <p class="item-data">Cuisine: ${result.recipe.cuisineType}</p>
        </div>
      `;
    });
    searchResultDiv.innerHTML = generatedHTML;
  }
  