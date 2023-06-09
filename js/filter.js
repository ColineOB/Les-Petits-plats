let boolean = true;

//filter Global
function filterGlobal(data) {
    const search = document.querySelector('.search');
    let input = search.value
    let newData = new Set();
    if (search.value.length >= 3) {
        boolean = true
        let filterG = data.filter(function (el)
        {
            if (el.name.toLowerCase().includes(input.toLowerCase()) ||
            el.appliance.toLowerCase().includes(input.toLowerCase())) {
                newData.add(el)
            }
            el.ustensils.filter(function(us) {
                if (us.toLowerCase().includes(input.toLowerCase())) {
                    newData.add(el)
                }
            })
            el.ingredients.filter(function(li) {
                if (li.ingredient.toLowerCase().includes(input.toLowerCase()))
                {
                    newData.add(el)
                }
            })
        })
        tagFilter(Array.from(newData))
    } else if (boolean){
        boolean = false
        tagFilter(data);
    }
}

//filter tag
function filterTag(set, recipes, div) {
    const search = div.parentElement.querySelector('input');
    let input = search.value
    let newData = new Set();
    let array = Array.from(set);
    
    if (search.value) {
        array.filter(function (el)
        {
            if (el.toLowerCase().includes(input.toLowerCase()))
            {
                newData.add(el)
            }
        })
        return list(newData, div.name, recipes)
    } else {
        return list(set, div.name, recipes)
    }
}

//if select tag by filter
function selectTag(recipes, title) {
    const listFilter = document.querySelectorAll('.listFilter ul li');
    const listTags = document.querySelector(".tags ul")
    const input = document.querySelectorAll(".bouton")
    listFilter.forEach((tag) => {
        tag.addEventListener('click', (evt) => {
            const li = document.createElement('li');
            const close = document.createElement('i');
            const p = document.createElement('p');
            li.setAttribute("class",title);
            close.setAttribute("class",'fa-solid fa-xmark')
            p.append(evt.target.innerHTML);
            li.append(p, close);
            listTags.append(li)
            input.forEach(function() {
                closeFilter();
            })
            tagFilter(recipes);
        })
    })
}

// filter recipes by tags
function tagFilter(data) {
    const listTags = document.querySelector(".tags ul")
    
    if (listTags.children.length > 0) {
        for (const child of listTags.children) {
            const tag = child.querySelector("p");
            const close = child.querySelector("i")
            let newData = new Set();
            let filterTag = data.filter(function (el) {
                switch (child.className) {
                    case 'ingrédients':
                        el.ingredients.filter(function(li) {
                            if (li.ingredient.toLowerCase().includes(tag.innerHTML.toLowerCase()))
                            {
                                newData.add(el)
                            }
                        })
                        break;
                    case 'appareils':
                        if (el.appliance.toLowerCase().includes(tag.innerHTML.toLowerCase())) {
                            newData.add(el)
                        }
                        break;
                    case 'ustensiles':
                        el.ustensils.filter(function(us) {
                            if (us.toLowerCase().includes(tag.innerHTML.toLowerCase())) {
                                newData.add(el)
                            }
                        })
                        break;
                }
            })
          init(Array.from(newData))
        }
    } else {
        init(data)
    }
}

function closeFilter() {
    const input = document.querySelectorAll(".bouton")
    input.forEach(function(button) {
        const title = button.dataset.title;
        const search = document.querySelector(" input[name='"+ title +"']")
        search.style.display = 'none';
        button.style.display = 'block';
        const div = document.querySelectorAll(".listFilter")
        div.forEach((el) => {
            el.innerHTML = "";
        })
    })
}

// delete tags
function closetags(data) {
    const listTags = document.querySelectorAll(".tags ul li i")
    listTags.forEach((close) => {
        close.addEventListener("click", (evt) => {
            close.parentElement.remove()
            boolean = true
            filterGlobal(data);
          })
    })

}