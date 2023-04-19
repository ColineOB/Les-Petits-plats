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

    return {getRecipeCardDom}
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
    console.log(ul);
    return ul
}