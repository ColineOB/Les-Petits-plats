// recover json
async function getRecipes() {
    let recipes = []
    const r = await fetch('./json/recipes.json')
    if (r.ok === true) {
        return r.json()
    }
    throw new Error('Error', r.status)
};

// init
async function init(filter) {
    let recipes = await getRecipes();
    if (filter !== undefined) {
       recipes = filter;
    }
    filterGlobal(recipes);
    getFilter(recipes);
    displayRecipes(recipes);
};

async function displayRecipes(recipes) {
    const querySelector = document.querySelector(".recipes-section");
    querySelector.innerHTML = '';
    recipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeCardDom = recipeModel.getRecipeCardDom();
        querySelector.appendChild(recipeCardDom)
    })
};

async function getFilter(recipes) {
    //creation list
    const input = document.querySelectorAll(".bouton")
    input.forEach(function(button) {
        const title = button.dataset.title;
        const search = document.querySelector(" input[name='"+ title +"']")
        let set = new Set();
        recipes.forEach((recipe) => {
            switch(title) {
                case 'ingrédients':
                    recipe.ingredients.forEach((r) => {
                        set.add(r.ingredient.toLowerCase());
                    })
                    break;
                case 'appareils':
                    set.add(recipe.appliance.toLowerCase())
                    break;
                case 'ustensiles':
                    recipe.ustensils.forEach((u) => {
                        set.add(u.toLowerCase());
                    })
                    break;
            }
        })
        button.addEventListener('click', (evt) => {
            console.log(button, set, title);
            btn(button,set, title);
            search.focus();
            filterDetails(set)
        })

    })
    // repices = filterByIngredients(recipes)
    // repices = filterByDevices(recipes)
    // repices = filterByUtensils(recipes)
}

getFilter()
init();