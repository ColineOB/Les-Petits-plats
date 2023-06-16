let boolean = true;

//filter Global
function filterGlobal(data) {
    const search = document.querySelector('.search');
    let input = search.value
    let newData = new Set();
    if (search.value.length >= 3) {
            boolean = true
        for (let i = 0; i < data.length; i++) {
            if ((data[i].name).includes(input.toLowerCase()) ||
                data[i].appliance.toLowerCase().includes(input.toLowerCase())
            ) {
                newData.add(data[i])
            }
            for (let j = 0; j < data[i].ustensils.length; j++) {
                if (data[i].ustensils[j].toLowerCase().includes(input.toLowerCase())) {
                    newData.add(data[i])
                }
            }
            const ingredients = data[i].ingredients;
            for (const prop in ingredients) {
                if (ingredients[prop].ingredient.toLowerCase().includes(input.toLowerCase()))
                {
                    newData.add(data[i])
                }
            }
        }
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
        for (let i = 0; i < array.length; i++) {
            if (array[i].includes(input.toLowerCase()))
            {
                newData.add(array[i])
            }
            
        }
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
    for (let i = 0; i < listFilter.length; i++) {
        listFilter[i].addEventListener('click', (evt) => {
            const li = document.createElement('li');
            const close = document.createElement('i');
            const p = document.createElement('p');
            switch (title) {
                case "ingrédients":
                    setAttributes(li, {"class":"bg-primary " + title});
                    break;
                case "appareils":
                    setAttributes(li, {"class":"bg-success " + title});
                    break;
                case "ustensiles":
                    setAttributes(li, {"class":"bg-danger " + title});
                    break;
            }
            close.setAttribute("class",'fa-solid fa-xmark')
            p.append(evt.target.innerHTML);
            li.append(p, close);
            listTags.append(li)
            for (let j = 0; j < input.length; j++) {
                closeFilter();
            }
            tagFilter(recipes);
        })
        
    }
    // listFilter.forEach((tag) => {
    //     tag.addEventListener('click', (evt) => {
    //         const li = document.createElement('li');
    //         const close = document.createElement('i');
    //         const p = document.createElement('p');
    //         li.setAttribute("class",title);
    //         close.setAttribute("class",'fa-solid fa-xmark')
    //         p.append(evt.target.innerHTML);
    //         li.append(p, close);
    //         listTags.append(li)
    //         input.forEach(function() {
    //             closeFilter();
    //         })
    //         tagFilter(recipes);
    //     })
    // })
}

// filter recipes by tags
function tagFilter(data) {
    const listTags = document.querySelector(".tags ul")
    
    if (listTags.children.length > 0) {
        for (const child of listTags.children) {
            const tag = child.querySelector("p");
            const close = child.querySelector("i")
            let newData = new Set();
            for (let i = 0; i < data.length; i++) {
                let type = child.className.split(" ").splice(-1)[0]
                    switch (type) {
                        case 'ingrédients':
                            const ingredients = data[i].ingredients;
                            for (const prop in ingredients) {
                            if (ingredients[prop].ingredient.toLowerCase().includes(tag.innerHTML.toLowerCase()))
                                {
                                    newData.add(data[i])
                                }
                            }
                            break;
                        case 'appareils':
                            if (data[i].appliance.toLowerCase().includes(tag.innerHTML.toLowerCase())) {
                                newData.add(data[i])
                            }
                            break;
                        case 'ustensiles':
                            for (let j = 0; j < data[i].ustensils.length; j++) {
                                if (data[i].ustensils[j].toLowerCase().includes(tag.innerHTML.toLowerCase())) {
                                    newData.add(data[i])
                                }
                            }
                            break;
                    }
            }
          init(Array.from(newData))
        }
    } else {
        init(data)
    }
}

function closeFilter() {
    const input = document.querySelectorAll(".bouton")
    for (let i = 0; i < input.length; i++) {
        const title = input[i].dataset.title;
        const search = document.querySelector(" input[name='"+ title +"']")
        search.parentNode.style.display = 'none';
        input[i].style.display = 'block';
        const div = document.querySelectorAll(".listFilter");
        for (let j = 0; j < div.length; j++) {
            div[i].innerHTML = "";
        }
    }
    // input.forEach(function(button) {
    //     const title = button.dataset.title;
    //     const search = document.querySelector(" input[name='"+ title +"']")
    //     search.style.display = 'none';
    //     button.style.display = 'block';
    //     const div = document.querySelectorAll(".listFilter")
    //     div.forEach((el) => {
    //         el.innerHTML = "";
    //     })
    // })
}

// delete tags
function closetags(data) {
    const listTags = document.querySelectorAll(".tags ul li i")
    for (let i = 0; i < listTags.length; i++) {
        listTags[i].addEventListener("click", (evt) => {
            listTags[i].parentElement.remove()
            boolean = true
            filterGlobal(data);
        })
    }
    // listTags.forEach((close) => {
    //     close.addEventListener("click", (evt) => {
    //         close.parentElement.remove()
    //         boolean = true
    //         filterGlobal(data);
    //       })
    // })

}