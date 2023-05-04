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
    console.log("recipes",recipes);
    //creation list
    const input = document.querySelectorAll(".bouton")
    const div = document.querySelector(".listFilter")
    input.forEach(function(button) {
        const title = button.dataset.title;
        const search = document.querySelector(" input[name='search "+ title +"']")
        console.log(search);
        let set = new Set();
        recipes.forEach((recipe) => {
            switch(title) {
                case 'ingrédients':
                    recipe.ingredients.forEach((r) => {
                        set.add(r.ingredient);
                    })
                    break;
                case 'appareils':
                    set.add(recipe.appliance)
                    break;
                case 'ustensiles':
                    recipe.ustensils.forEach((u) => {
                        set.add(u);
                    })
                    break;
            }
        })
        button.addEventListener('click', (evt) => {
            div.innerHTML = "";
            div.append(btn(button,set, title));
            search.focus();
            filterDetails(set, search)
        })

    })
    // repices = filterByIngredients(recipes)
    // repices = filterByDevices(recipes)
    // repices = filterByUtensils(recipes)
}

getFilter()
init();