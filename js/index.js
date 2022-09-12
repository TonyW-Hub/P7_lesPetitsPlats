// Init display data
(async function init() {
  const data = await getRecipes();
  displayRecipes(data.recipes);
  filterDropdown();
})();

// Get value in main input search
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
searchButton.addEventListener("click", () => {
  const inputValue = searchInput.value;
  filterByText(inputValue)
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
    });
  }

  // Close dropdown
  for (let i = 0; i < closeDropdwon.length; i++) {
    closeDropdwon[i].addEventListener("click", () => {
      allDropDown[i].classList.toggle("grow");
      allDropDown[i]
        .querySelector(".dropdown-content")
        .classList.toggle("show");
    });
  }
})();
