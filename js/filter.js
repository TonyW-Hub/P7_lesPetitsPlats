// Display page data
async function filterTagsApply() {
  let tagsFilter = JSON.parse(localStorage.getItem("filter-apply"));

  // Fetch all recipes
  console.time("recipes fetch");
  const data = await getRecipes();
  const recipes = data.recipes;

  if (tagsFilter && tagsFilter.length !== 0) {
    const regex = new RegExp(
      `${tagsFilter
        .map(
          (el) =>
            `${el.name ? el.name.toUpperCase() : el.toUpperCase()}`
        )
        .join("|")}`
    );

    // Init Array for display recipes
    const filteredByTags = [];

    for (let i = 0, n = recipes.length; i < n; i++) {
      // Check name of recipes
      if (regex.test(recipes[i].name.toUpperCase())) {
        filteredByTags.push(recipes[i]);

        categorizedTags(recipes[i].name, "title");
      }

      // Check description of recipes
      if (regex.test(recipes[i].description.toUpperCase())) {
        filteredByTags.push(recipes[i]);

        categorizedTags(recipes[i].description, "title");
      }

      // Check appliance of recipes
      if (regex.test(recipes[i].appliance.toUpperCase())) {
        filteredByTags.push(recipes[i]);

        categorizedTags(recipes[i].appliance, "appliance");
      }

      // Check ingredients of recipes
      recipes[i].ingredients.some((ing) => {
        if (regex.test(ing.ingredient.toUpperCase())) {
          filteredByTags.push(recipes[i]);

          categorizedTags(ing.ingredient, "ingredients");
        }
      });

      // Check ustensils of recipes
      recipes[i].ustensils.some((ustensil) => {
        if (regex.test(ustensil.toUpperCase())) {
          filteredByTags.push(recipes[i]);

          categorizedTags(ustensil, "ustensils");
        }
      });
    }

    // Remove all dupplicate recipes*
    const unique = filteredByTags.filter(
      (value, index, array) =>
        array.findIndex((secondValue) =>
          ["id"].every((key) => secondValue[key] === value[key])
        ) === index
    );

    // Render new recipes
    displayRecipes(unique);
  } else {
    // Render all recipes
    displayRecipes(recipes);
  }
  console.timeEnd("recipes fetch");
}

filterTagsApply();

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

// Get all input search in dropdown
const ingredientsSearch = document.getElementById("ingredientsInput");
const applianceSearch = document.getElementById("appareilsInput");
const ustensilsSearch = document.getElementById("ustensilesInput");

// Active filter for each input search
function filterInputSearchKeyup(input) {
  // Active filter by keyboard
  input.addEventListener("keyup", (e) => {
    // Get array in localStorage
    let tagsFilter = JSON.parse(localStorage.getItem("filter-apply"));
    if (e.key === "Enter" && e.target.value !== "") {
      // Cancel push in array if value exist in tagsFilters
      for (let i = 0; i < tagsFilter.length; i++) {
        if (tagsFilter.includes(e.target.value.toUpperCase())) {
          e.target.value = "";
          return;
        }
      }

      tagsFilter.push(e.target.value.toUpperCase());
      localStorage.setItem("filter-apply", JSON.stringify(tagsFilter));

      // Render new tags & filter by tags
      filterTagsApply();
      displayTagsFilter();

      // Reset input
      e.target.value = "";
    }
  });
}

// All filter input
filterInputSearchKeyup(ingredientsSearch);
filterInputSearchKeyup(applianceSearch);
filterInputSearchKeyup(ustensilsSearch);
filterInputSearchKeyup(searchInput);
