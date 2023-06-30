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
    try {
    let recipes = await getRecipes();
    console.log(recipes);
        closetags(recipes);
        if (filter !== undefined) {
        recipes = filter;
        }
        await displayRecipes(recipes);
        await getFilter(recipes);
        const search = document.querySelector('.search')
        search.addEventListener('input', (evt) => {
            filterGlobal(recipes);
        });
        search.addEventListener('click',(evt) => {
            closeFilter();
        })
    } catch (e) {
        throw new Error('Error init ça fait chier', e)

    }
};

async function displayRecipes(recipes) {
    try {
    const querySelector = document.querySelector(".recipes-section");
    querySelector.innerHTML = '';
    recipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeCardDom = recipeModel.getRecipeCardDom();
        querySelector.appendChild(recipeCardDom)
    })
    } catch (e) {
        throw new Error('Error displayRecipes', e)
    }
};

async function getFilter(recipes) {
    try {
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
            button.addEventListener('click', (evt) => {
                evt.preventDefault
                evt.stopPropagation
                evt.stopImmediatePropagation
                console.log("click");
                btn(button,set, title, recipes);
                search.focus();
            })
        }
    })
    } catch (e) {
        throw new Error('Error getFilter', e)
    }
}

init();