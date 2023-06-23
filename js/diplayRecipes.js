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
        const divCss = document.createElement('div');
        const divIngredientsEtDescription = document.createElement('div');

        article.setAttribute("class","col mb-4");
        divCss.setAttribute('class', "containers d-block m-2 text-dark")
        pDescription.setAttribute("class","textDescription w-50")
        setAttributes(img, {"class":"img"});
        setAttributes(h2, {"class":"h5"});
        setAttributes(clock,{"class":"fa-regular fa-clock"})
        setAttributes(divIngredientsEtDescription,{"class":"description d-flex justify-content-between mb-3"})
        setAttributes(divTitle, {"class":"d-flex align-items-center justify-content-between p-2"})

        pDescription.textContent = description;
        h2.textContent = name;

        ptime.append(clock, time, 'min')
        divTitle.append(h2, ptime);
        divIngredientsEtDescription.append(ingredientsList(ingredients), pDescription);
        divCss.append(img, divTitle, divIngredientsEtDescription);
        article.append(divCss);

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

//create an ingredient list
function ingredientsList(ingredients) {
    const ul = document.createElement('ul');
    for(var k in ingredients) {
        const li = document.createElement('li');
        
        li.innerHTML += `<strong>` + ingredients[k].ingredient + `&nbsp;</strong>`
        if (ingredients[k].quantity != undefined) {
            li.innerHTML += ingredients[k].quantity
        }
        if (ingredients[k].unit != undefined) {
            li.innerHTML += ingredients[k].unit
        }
        ul.append(li);
    }
    return ul;
}


function btn(button, set, title, recipes) {
    const input = document.querySelectorAll(".bouton");
    const inputSearch = document.querySelectorAll(".btn-group > .input-icons");
    const search = document.querySelector(" input[name='"+ title +"']");
    reset(input, 'block');
    reset(inputSearch, 'none');
    if (button != undefined) {
        button.style.display = 'none';
    }
    search.parentNode.style.display = 'block';
    search.addEventListener('input', () => {
        filterTag(set, recipes, search)
    })
 return list(set, title, recipes);
}

function reset (list, type){
    list.forEach(function(elem) {
        elem.style.display = type;
    })
}

//list of different tags
function list(set, title, recipes) {
    const allFilter = document.querySelectorAll(".listFilter");
    for (let i = 0; i < allFilter.length; i++) {
        allFilter[i].innerHTML = "";
    }
    const data = document.querySelector('[data-title='+ title +']');
    const div = data.parentNode.querySelector(".listFilter");
    const ul = document.createElement('ul');
    if (set.size !== 0) {
        set.forEach((list)=> {
            const li = document.createElement('li');
            li.append(list);
            ul.append(li);
        })
        switch (title) {
            case "ingrédients":
                setAttributes(ul, {"class":"bg-primary"});
                break;
            case "appareils":
                setAttributes(ul, {"class":"bg-success"});
                break;
            case "ustensiles":
                setAttributes(ul, {"class":"bg-danger"});
                break;
        }
        div.append(ul);
        selectTag(recipes, title);
    }
}
