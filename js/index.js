async function getRecipes() {
    let recipes = []
    const r = await fetch('./json/recipes.json')
    if (r.ok === true) {
        return r.json()
    }
    throw new Error('Error', r.status)
};

async function init(filter) {
    let recipes = await getRecipes();
    if (filter !== undefined) {
       recipes = filter;
    }
    let AttributesBTN = {'ingrédients': 'primary', 'appareils':'success','ustensiles':'danger'}
    
    for(var key in AttributesBTN) {
        displayBtn(key, AttributesBTN[key])
    }
    btn(recipes)
    displayRecipes(recipes);
};

async function displayRecipes(recipes) {
    console.log(recipes);
    const querySelector = document.querySelector(".recipes-section");
    querySelector.innerHTML = '';
    recipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeCardDom = recipeModel.getRecipeCardDom();
        querySelector.appendChild(recipeCardDom)
    })
};

async function getFilter() {
    let recipes = await getRecipes();
    repices = filterGlobal(recipes);
    // repices = filterByIngredients(recipes)
    // repices = filterByDevices(recipes)
    // repices = filterByUtensils(recipes)
}

getFilter()
init();