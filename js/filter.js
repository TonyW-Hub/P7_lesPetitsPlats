function displayRecipes(recipes) {
  const container = document.querySelector(".cardsContainer");
  const arrOfAllIngredients = [];
  const arrOfAllAppliance = [];
  const arrOfAllUstensild = [];

  container.innerHTML = "";

  // Loop on JSON file
  for (let i = 0, n = recipes.length; i < n; i++) {
    let li = "";

    // Push all Appliance in array
    arrOfAllAppliance.push(ucwords(recipes[i].appliance));

    // Push all Ustensils in array
    recipes[i].ustensils.forEach((ustensil) => {
      arrOfAllUstensild.push(ucwords(ustensil));
    });

    // Get all ingredients list for each recipes
    recipes[i].ingredients.forEach((ingredient) => {
      // Push all Ingredients in array
      arrOfAllIngredients.push(ucwords(ingredient.ingredient));
      return (li += `<li>${ingredient.ingredient}: <span>${
        ingredient.quantity || ingredient.quantite
          ? ingredient.quantity || ingredient.quantite
          : ""
      }</span> <span>${ingredient.unit ? ingredient.unit : ""}</span></li>`);
    });

    // Display Card
    container.innerHTML += `
        <div class="mainCard">
            <div class="imgTop">
                <img src="" alt="" />
            </div>
            <div class="contentCard">
                <div class="headerContent">
                    <h5 class="card-title">${recipes[i].name}</h5>
                    <div class="timeRecipes">
                        <i class="fa-regular fa-clock"></i>   
                        <span>${recipes[i].time} min</span>
                    </div>
                </div>
                <div class="bodyContent">
                    <ul>
                        ${li}
                    </ul>
                    <p>
                        ${recipes[i].description}
                    </p>
                </div>
            </div>
        </div>
      `;
  }

  // Remove all duplicate ingredients
  const uniqIngredients = [...new Set(arrOfAllIngredients)];
  const uniqAppliance = [...new Set(arrOfAllAppliance)];
  const uniqUstensils = [...new Set(arrOfAllUstensild)];

  // Feed ingredients dropdown
  const ingredientsDropdown = document.getElementById("ingredientList");
  ingredientsDropdown.innerHTML = "";
  for (let i = 0; i < uniqIngredients.length; i++) {
    ingredientsDropdown.innerHTML += `<li onclick="alert('${uniqIngredients[i]}')">${uniqIngredients[i]}</li>`;
  }

  // Feed appliance dropdown
  const applianceList = document.getElementById("applianceList");
  applianceList.innerHTML = "";
  for (let i = 0; i < uniqAppliance.length; i++) {
    applianceList.innerHTML += `<li onclick="alert('${uniqAppliance[i]}')">${uniqAppliance[i]}</li>`;
  }

  // feed ustensils dropdown
  const ustensilsList = document.getElementById("ustensilsList");
  ustensilsList.innerHTML = "";
  for (let i = 0; i < uniqUstensils.length; i++) {
    ustensilsList.innerHTML += `<li onclick="alert('${uniqUstensils[i]}')">${uniqUstensils[i]}</li>`;
  }
}

// Filter on input in dropdown
function filterDropdown() {
  let dropdown = document.querySelectorAll(".dropdown-content");
  for (let i = 0; i < dropdown.length; i++) {
    let input = dropdown[i].querySelector("input");
    let liste = dropdown[i].querySelectorAll("li");

    input.addEventListener("keyup", (e) => {
      let inputValue = e.target.value;
      for (let i = 0; i < liste.length; i++) {
        let inputText = liste[i].textContent || liste[i].innerText;
        if (inputText.toUpperCase().indexOf(inputValue.toUpperCase()) > -1) {
          liste[i].style.display = "";
        } else {
          liste[i].style.display = "none";
        }
      }
    });
  }
}

// Capitalize the first letter
function ucwords(str) {
  return (str + "").replace(/^(.)|\s+(.)/g, function ($1) {
    return $1.toUpperCase();
  });
}

async function filterByText(text) {
  // Initialize array for filter by text
  const recipesByFilterText = [];

  // Fetch all recipes
  const data = await getRecipes();
  const recipes = data.recipes;

  // Check all recipes, if the text is includes
  for (let i = 0, el = recipes.length; i < el; i++) {
    let currentRecipes = recipes[i];
    if (currentRecipes.name.toUpperCase().includes(text.toUpperCase())) {
      recipesByFilterText.push(currentRecipes);
    }

    currentRecipes.ingredients.forEach((ingredient) => {
      if (ingredient.ingredient.toUpperCase().includes(text.toUpperCase())) {
        recipesByFilterText.push(currentRecipes);
      }
    });
  }

  // Remove all dupplicate recipes
  const uniqFilterText = [...new Set(recipesByFilterText)];

  // Display new list of recipes
  displayRecipes(uniqFilterText);
}
