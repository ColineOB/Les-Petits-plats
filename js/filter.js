function filterGlobal(data) {
    console.log("data", data);
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

function filterDetails(data, search) {
    
    search.addEventListener('input', (evt) => {
        let input = search.value
            if (search.value.length >= 1) {
                let filterG = data.has(function (el)
                {
                    return el.name.toLowerCase().includes(input.toLowerCase())
                });
                getFilter(filterG)
            } else {
                init(undefined)
    
            }
        })
}