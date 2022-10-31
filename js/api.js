// Fetch data in JSON file
async function getRecipes() {
  const response = await fetch("assets/data/recipes.json").catch(error => console.log(error));
  const json = await response.json();

  return json;
}