window.addEventListener('load', function () {
    const menuLabel = document.querySelector('.menu-lbl');
    const menuAppear = document.querySelector('.menu-appear');
    const menuNav = document.querySelector('.menu-nav');
    const headerNav = document.querySelector('.header');
    let ultimaPosicionScroll = window.scrollY;

    const searchBarIcon = document.querySelector('.search-bar-icon');
    const searchBarInp = document.querySelector('.search-bar-inp');
    
    // Funcion la cual controla el desplazamiento de la pagina, para que asi
    // podamos mostrar u ocultar la barra de navegacion que por defecto es "fixed"
    window.addEventListener('scroll', () => {
        let posicionActualScroll = window.scrollY;
        if (ultimaPosicionScroll > posicionActualScroll) {
            headerNav.style.top = '0';
        } else {
            headerNav.style.top = '-60px';
        }
        ultimaPosicionScroll = posicionActualScroll;
    });

    // Al hacer click, muestra el menu de navegacion
    menuLabel.addEventListener('click', () => {
        menuAppear.classList.add('menu-flex');
        menuNav.classList.add('menu-flex');
    });

    // Al hacer click fuera del menu, este desaparece
    menuAppear.addEventListener('click', () => {
        menuAppear.classList.remove('menu-flex');
        menuNav.classList.remove('menu-flex');
        searchBarInp.classList.remove('menu-flex');
    });

    searchBarIcon.addEventListener('click', () => {
        menuAppear.classList.add('menu-flex');
        searchBarInp.classList.add('menu-flex');
    })

});