window.addEventListener('load', function () {
    const filterArrow = document.querySelector('#filter-arrow');
    const formFilter = document.querySelector('.form-filters');
    
    filterArrow.addEventListener('click', () => {
        formFilter.classList.toggle('filter-appear');
        filterArrow.classList.toggle('arrow-rotate');
    })
})