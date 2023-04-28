function filterGlobal(data) {
    const search = document.querySelector('.search');
    search.addEventListener('input', (evt) => {
        let input = search.value
        if (search.value.length >= 3) {
            let filterG = data.filter(function (el)
            {
                return el.name.toLowerCase().includes(input.toLowerCase())
            });
            init(filterG)
        } else {
            init(undefined)

        }
      });

}

function filterDetails(data) {
    const inputSearch = document.querySelectorAll(".searchFilter")
    inputSearch.forEach(function(input) {
        search.addEventListener('input', (evt) => {
            if (search.value.length >= 1) {
                let filterG = data.filter(function (el)
                {
                    return el.name.toLowerCase().includes(input.toLowerCase())
                });
                init(filterG)
            } else {
                init(undefined)
    
            }
        })
    })
    
}