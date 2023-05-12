let boolean = true;
function filterGlobal(data) {
    console.log("filterGlobal", boolean);
    closeFilter(); 
    const search = document.querySelector('.search');
        let input = search.value
        let newData = new Set();
        if (search.value.length >= 3) {
            console.log("search.value");
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
            console.log(newData);
            tagFilter(Array.from(newData))
        } else if (boolean){
            boolean = false
            console.log('filter global else');
            tagFilter(data);
        }
}

// function filterDetails(data, title) {
//     const array = [...data];
//     const searches =  document.querySelectorAll('.searchFilter');
//     searches.forEach((search) => {
//         search.addEventListener('input', (evt)=> {
//             let input = search.value
//             if (search.value.length >= 1) {
//                 let filterD = array.filter(function (el)
//                 {
//                     return el.toLowerCase().includes(input.toLowerCase())
//                 });
                
//                 list(filterD, title)
//             } else {
//                 list(data, title)
//             }
//         })
//     })
// }

function selectTag(recipes, title) {
    console.log("coucou");
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

function tagFilter(data) {
    console.log("data", data);
    const listTags = document.querySelector(".tags ul")
    
    if (listTags.children.length > 0) {
        for (const child of listTags.children) {
            const tag = child.querySelector("p");
            const close = child.querySelector("i")
            console.log(tag.innerHTML, child.className);
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
        const div = document.querySelector(".listFilter")
        div.innerHTML = "";
    })
}

function closetags(data) {
    console.log("data",data);
    const listTags = document.querySelectorAll(".tags ul li i")
    listTags.forEach((close) => {
        close.addEventListener("click", (evt) => {
            close.parentElement.remove()
            console.log("click", data);
            boolean = true
            filterGlobal(data);
          })
    })

}
// function filterF(data) {
//     console.log("filterF", data);
//     const search = document.querySelector('.search');
//     const listTags = document.querySelector(".tags ul");
//     let input = search.value
//     let newData = new Set();
//     if (input.length >= 3){
//         console.log("input.length");
//         let filterG = data.filter(function (el)
//             {
//                 if (el.name.toLowerCase().includes(input.toLowerCase()) ||
//                 el.appliance.toLowerCase().includes(input.toLowerCase())) {
//                     newData.add(el)
//                 }
//                 el.ustensils.filter(function(us) {
//                     if (us.toLowerCase().includes(input.toLowerCase())) {
//                         newData.add(el)
//                     }
//                 })
//                 el.ingredients.filter(function(li) {
//                     if (li.ingredient.toLowerCase().includes(input.toLowerCase()))
//                     {
//                         newData.add(el)
//                     }
//                 })
//             })
//     }
//     if (listTags.children.length > 0) {
//         console.log("listTags.children.length");
//         for (const child of listTags.children) {
//             console.log(child);
//             const tag = child.querySelector("p");
//             let filterTag = data.filter(function (el) {
//                 switch (child.className) {
//                     case 'ingrédients':
//                         el.ingredients.filter(function(li) {
//                             if (li.ingredient.toLowerCase().includes(tag.innerHTML.toLowerCase()))
//                             {
//                                 newData.add(el)
//                             }
//                         })
//                         break;
//                     case 'appareils':
//                         if (el.appliance.toLowerCase().includes(tag.innerHTML.toLowerCase())) {
//                             newData.add(el)
//                         }
//                         break;
//                     case 'ustensiles':
//                         el.ustensils.filter(function(us) {
//                             if (us.toLowerCase().includes(tag.innerHTML.toLowerCase())) {
//                                 newData.add(el)
//                             }
//                         })
//                         break;
//                 }
//             })

//         }
//     }
//     if (newData.size > 0) {
//         console.log(newData);
//         init(Array.from(newData))
//     } else {
//         console.log(newData);
//         init(data)
//     }
// }