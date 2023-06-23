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
    closetags(recipes)
    if (filter !== undefined) {
       recipes = filter;
    }
    getFilter(recipes);
    displayRecipes(recipes);
    const search = document.querySelector('.search')
    search.addEventListener('input', (evt) => {
        filterGlobal(recipes);
    });
    search.addEventListener('click',(evt) => {
        closeFilter();
    })
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
        if (recipes != undefined)
        {
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
        }
        button.addEventListener('click', (evt) => {
            btn(button,set, title, recipes);
            search.focus();
        })
    })
}

getFilter()
init();