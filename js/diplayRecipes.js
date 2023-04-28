function recipeFactory(data) {
    const {id, name, servings, ingredients, time, description, appliance, ustensils} = data;

    function getRecipeCardDom() {
        const article = document.createElement( 'article' );
        const h2 = document.createElement('h2');
        const ptime = document.createElement('p');
        const img = document.createElement('div');
        const clock = document.createElement('i');
        const pDescription = document.createElement('p');
        const divTitle = document.createElement('div');
        const divIngredientsEtDescription = document.createElement('div');

        article.setAttribute("class","col");
        pDescription.setAttribute("class","w-50")
        setAttributes(img, {"class":"img"});
        setAttributes(h2, {"class":"h5"});
        setAttributes(clock,{"class":"fa-regular fa-clock"})
        setAttributes(divIngredientsEtDescription,{"class":"d-flex justify-content-between"})
        setAttributes(divTitle, {"class":"d-flex align-items-center justify-content-between"})

        pDescription.textContent = description;
        h2.textContent = name;

        ptime.append(clock, time, 'min')
        divTitle.append(h2, ptime);
        divIngredientsEtDescription.append(ingredientsList(ingredients), pDescription);
        article.append(img, divTitle, divIngredientsEtDescription);

        return article;
    }

    return {getRecipeCardDom, btn}
}

// loop for multiple setAttribute
function setAttributes(element, attrs) {
    for(var key in attrs) {
        element.setAttribute(key, attrs[key])
    }
}

function ingredientsList(ingredients) {
    const ul = document.createElement('ul');
    for(var k in ingredients) {
        const li = document.createElement('li');
        
        li.innerHTML += `<strong>` + ingredients[k].ingredient + `</strong>`
        if (ingredients[k].quantity != undefined) {
            li.innerHTML += ingredients[k].quantity
        }
        if (ingredients[k].unit != undefined) {
            li.innerHTML += ingredients[k].unit
        }
        ul.append(li);
    }
    // console.log(ul);
    return ul
}
function displayBtn(title, color) {
    const filter = document.querySelector(".filter");
    const div = document.createElement('div');
    const button = document.createElement('button');
    const search = document.createElement('input');
    setAttributes(button, {"type":"button","data-title": title, 'class': "btn btn-"+ color +' dropdown-toggle mx-2 bouton', "data-bs-toggle":"dropdown","aria-expanded":false});
    setAttributes(search, {"class":"searchFilter form-control", "type":"text", "name":"search "+ title, "placeholder": "Rechercher un "+ title, "style":'display : none', 'onchange': 'filterDetails()'})
    div.setAttribute("class","btn-group");
    button.append(title);
    div.append(button, search);
    filter.append(div);
}

function btn(recipes) {
    const filter = document.querySelector(".filter")
    const input = document.querySelectorAll(".bouton")
    const inputSearch = document.querySelectorAll(".searchFilter")
    let type = '';
    const div = document.createElement('div');
    div.setAttribute("class","listFilter");
    filter.append(div);
    input.forEach(function(button) {
        const title = button.dataset.title;
        const search = document.querySelector(" input[name='search "+ title +"']")
        const ul = document.createElement('ul');

        button.addEventListener('click', (evt) => {
            reset(input, 'block');
            reset(inputSearch, 'none');
            button.style.display = 'none';
            search.style.display = 'block';
            search.focus();
            div.innerHTML = "";
            ul.innerHTML = "";
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
            set.forEach((list)=> {
                const li = document.createElement('li');
                li.append(list);
                ul.append(li)
            })
            console.log('set',set);
            console.log('li', ul);
            div.append(ul);
        })
    })
    // input.addEventListener('click', (evt) => {
        // console.log(evt, title);
        // input.replaceWith(search)
    // })
}

function reset (list, type){
    list.forEach(function(elem) {
        elem.style.display = type;
    })
}