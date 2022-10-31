// Init array of filter tags selected by user
let tagsFilter = JSON.parse(localStorage.getItem("filter-apply"));
if (!tagsFilter) {
  tagsFilter = localStorage.setItem("filter-apply", JSON.stringify([]));
}

// Get value in main input search
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
searchButton.addEventListener("click", () => {
  const inputValue = searchInput.value;
  if (inputValue === "") return;
  updateTagsInLocalStorage(inputValue);
});

// Toggle dropdown function
(function toggledDropdown() {
  const allDropDown = document.querySelectorAll(".dropdown");
  const closeDropdwon = document.querySelectorAll(".closeDropdown");

  // Open dropdown
  for (let i = 0; i < allDropDown.length; i++) {
    allDropDown[i].querySelector(".btn").addEventListener("click", () => {
      allDropDown[i].classList.toggle("grow");
      allDropDown[i]
        .querySelector(".dropdown-content")
        .classList.toggle("show");

      let currentDropdown = allDropDown[i].querySelector(".dropdown-content");
      let widthDropdown = currentDropdown.offsetWidth;
      let heightDropdown = currentDropdown.offsetHeight - 15;

      allDropDown[i].style.width = widthDropdown + "px";
      allDropDown[i].style.height = heightDropdown + "px";
    });
  }

  // Close dropdown
  for (let i = 0; i < closeDropdwon.length; i++) {
    closeDropdwon[i].addEventListener("click", () => {
      allDropDown[i].classList.toggle("grow");
      allDropDown[i]
        .querySelector(".dropdown-content")
        .classList.toggle("show");

      allDropDown[i].style.width = "initial";
      allDropDown[i].style.height = "initial";
    });
  }
})();

// Display recipes function
function displayRecipes(recipes) {
  const container = document.querySelector(".cardsContainer");
  const arrOfAllIngredients = [];
  const arrOfAllAppliance = [];
  const arrOfAllUstensild = [];

  container.innerHTML = "";
  let currentIndex;

  // Return error if not recipes
  if (recipes?.length === 0 || recipes === undefined) {
    container.innerHTML += `
        <div>Aucune recettes n'a été trouvé !</div>
      `;
    return;
  }

  // Loop on JSON file
  for (let i = 0, n = recipes.length; i < n; i++) {
    // Reset list in dropdown
    let li = "";

    // Push all Appliance in array
    arrOfAllAppliance.push(ucwords(recipes[i].appliance));

    // Push all Ustensils in array
    for (let y = 0, n = recipes[i].ustensils.length; y < n; y++) {
      arrOfAllUstensild.push(ucwords(recipes[i].ustensils[y]));
    }

    // Get all ingredients list for each recipes
    for (let y = 0, n = recipes[i].ingredients.length; y < n; y++) {
      currentIndex = recipes[i].ingredients[y];

      arrOfAllIngredients.push(ucwords(currentIndex.ingredient));

      li += `<li>${currentIndex.ingredient}: <span>${
        currentIndex.quantity || currentIndex.quantite
          ? currentIndex.quantity || currentIndex.quantite
          : ""
      }</span> <span>${currentIndex.unit ? currentIndex.unit : ""}</span></li>`;
    }

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

  // Show description of recipes
  let descriptionRecipes = document.querySelectorAll(".bodyContent");
  for (let i = 0, n = descriptionRecipes.length; i < n; i++) {
    descriptionRecipes[i].addEventListener("click", () => {
      descriptionRecipes[i]
        .querySelector("p")
        .classList.toggle("showDescription");
    });
  }

  // Remove all duplicate ingredients
  const uniqIngredients = [...new Set(arrOfAllIngredients)];

  // Remove all duplicate appliances
  const uniqAppliance = [...new Set(arrOfAllAppliance)];

  // Remove all duplicate ustensils
  const uniqUstensils = [...new Set(arrOfAllUstensild)];

  // Feed ingredients dropdown
  const ingredientsDropdown = document.getElementById("ingredientList");
  ingredientsDropdown.innerHTML = "";
  for (let i = 0, n = uniqIngredients.length; i < n; i++) {
    ingredientsDropdown.innerHTML += `<li>${uniqIngredients[i]}</li>`;
  }
  // Active filter ingredients by click on list element
  const listOfAllIngredients = ingredientsDropdown.querySelectorAll("li");
  for (let i = 0, n = listOfAllIngredients.length; i < n; i++) {
    listOfAllIngredients[i].addEventListener("click", (e) => {
      updateTagsInLocalStorage(e.target.outerText);
      ingredientsSearch.value = "";
    });
  }

  // Feed appliance dropdown
  const applianceList = document.getElementById("applianceList");
  applianceList.innerHTML = "";
  for (let i = 0, n = uniqAppliance.length; i < n; i++) {
    applianceList.innerHTML += `<li>${uniqAppliance[i]}</li>`;
  }
  // Active filter appliance by click on list element
  const listOfAllApliance = applianceList.querySelectorAll("li");
  for (let i = 0, n = listOfAllApliance.length; i < n; i++) {
    listOfAllApliance[i].addEventListener("click", (e) => {
      updateTagsInLocalStorage(e.target.outerText);
      applianceSearch.value = "";
    });
  }

  // Feed ustensils dropdown
  const ustensilsList = document.getElementById("ustensilsList");
  ustensilsList.innerHTML = "";
  for (let i = 0, n = uniqUstensils.length; i < n; i++) {
    ustensilsList.innerHTML += `<li>${uniqUstensils[i]}</li>`;
  }
  // Active filter ustensils by click on list element
  const listOfAllUstensils = ustensilsList.querySelectorAll("li");
  for (let i = 0, n = listOfAllUstensils.length; i < n; i++) {
    listOfAllUstensils[i].addEventListener("click", (e) => {
      updateTagsInLocalStorage(e.target.outerText);
      ustensilsSearch.value = "";
    });
  }
  // Reset filter liste in dropdown
  filterDropdown();
}

function displayTagsFilter() {
  const tagsContainer = document.querySelector(".tags-container");
  const tags = JSON.parse(localStorage.getItem("filter-apply"));
  tagsContainer.innerHTML = "";
  for (let i = 0, n = tags.length; i < n; i++) {
    tagsContainer.innerHTML += `
      <div class="pill ${tags[i].category ? tags[i].category : "bg-secondary"}">
      ${
        tags[i].name
          ? `<span>${
              tags[i].name.charAt(0) + tags[i].name.slice(1).toLowerCase()
            }</span>`
          : `<span>${tags[i].charAt(0) + tags[i].slice(1).toLowerCase()}</span>`
      }
        
        <i class="fa-regular fa-circle-xmark"></i>
      </div>
    `;

    if (tagsContainer) {
      const crossTags = tagsContainer.querySelectorAll("i");
      for (let y = 0; y < crossTags.length; y++) {
        crossTags[y].addEventListener("click", () => {
          tags.splice(y, 1);
          localStorage.setItem("filter-apply", JSON.stringify(tags));
          filterTagsApply();
          displayTagsFilter();
        });
      }
    }
  }
}

displayTagsFilter();

function updateTagsInLocalStorage(value) {
  let tagsFilter = JSON.parse(localStorage.getItem("filter-apply"));

  // Cancel push in array if value exist in tagsFilters
  if (tagsFilter.some((element) => element.name === value.toUpperCase()))
    return;
  tagsFilter.push(value.toUpperCase());

  // Update array of tags in localStorage
  localStorage.setItem("filter-apply", JSON.stringify(tagsFilter));

  // Render new recipes & tags
  filterTagsApply();
}

function categorizedTags(value, category) {
  let tagsFilter = JSON.parse(localStorage.getItem("filter-apply"));

  const categorized = tagsFilter.map((element) => {
    if (element === value.toUpperCase()) {
      return {
        name: element,
        category,
      };
    } else {
      return element;
    }
  });

  tagsFilter = categorized;

  localStorage.setItem("filter-apply", JSON.stringify(tagsFilter));
  displayTagsFilter();
}

// Capitalize the first letter
function ucwords(str) {
  return (str + "").replace(/^(.)|\s+(.)/g, function ($1) {
    return $1.toUpperCase();
  });
}
