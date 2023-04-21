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