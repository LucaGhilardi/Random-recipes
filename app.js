const btn = document.getElementById('btn');
const meal_container = document.getElementById('meal');

btn.addEventListener('click', () => {
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(res => {
    createMeal(res.meals[0]);
  });
});

const createMeal = (recipe) => {
  const ingredients = [];
  // Get all ingredients from the object
  for(let i=1; i<=20; i++) {
    if(recipe[`strIngredient${i}`]) {
      ingredients.push(`${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`)
    } else {
      // Stop if no more ingredients
      break;
    }
  }
  
  const newInnerHTML = `
    <div class="row">
      <div class="columns five">
        <h4>${recipe.strMeal}</h4>
        <img src="${recipe.strMealThumb}" alt="Meal Image">
        
        <p>${recipe.strInstructions}</p>
        ${recipe.strArea ? `<p><strong>Area:</strong> ${recipe.strArea}</p>` : ''}
        <h5>Ingredients:</h5>
        <ul>
          ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
      </div>
      
    </div>
    ${recipe.strYoutube ? `
    <div class="row">
      <h5>Video Recipe</h5>
      <div class="videoWrapper">
        <iframe width="420" height="315"
        src="https://www.youtube.com/embed/${recipe.strYoutube.slice(-11)}">
        </iframe>
      </div>
    </div>` : ''}
  `;
  
  meal_container.innerHTML = newInnerHTML;
}