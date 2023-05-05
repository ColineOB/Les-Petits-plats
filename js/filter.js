let boolean = true;
function filterGlobal(data) {
    const search = document.querySelector('.search');
    search.addEventListener('input', (evt) => {
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
            console.log(newData);
            init(Array.from(newData))
        } else if (boolean){
            boolean = false
            console.log("init");
            init(undefined)

        }
      });

}

function filterDetails(data) {
    const array = [...data];
    const searches =  document.querySelectorAll('.searchFilter');
    searches.forEach((search) => {
        search.addEventListener('input', (evt)=> {
            let input = search.value
            if (search.value.length >= 1) {
                let filterD = array.filter(function (el)
                {
                    return el.toLowerCase().includes(input.toLowerCase())
                });
                
                list(filterD)
            } else {
                list(data)
            }
        })
    })


}