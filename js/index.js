async function getRecipes() {
    let recipes = []
    const r = await fetch('./json/recipes.json')
    if (r.ok === true) {
        return r.json()
    }
    throw new Error('Error', r.status)
};

async function init() {
    const recipes = await getRecipes()
    console.log(recipes);
    displayRecipes(recipes);
};

async function displayRecipes(recipes) {
    const querySelector = document.querySelector(".recipes-section");
    recipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeCardDom = recipeModel.getRecipeCardDom();
        querySelector.appendChild(recipeCardDom)
    })
}

init();