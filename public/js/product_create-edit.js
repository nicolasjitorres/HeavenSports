window.addEventListener('load', function() {

    console.log('Vinculado exitosamente');

    let nombre = document.querySelector("input#nombre");
    let divNombre = document.querySelector("div.nombre");
    let divErrorMsgNombre = document.querySelector("div.errorMsg.nombre");

    let descripcion = document.querySelector("input#descripcion");
    let divDescripcion = document.querySelector("div.descripcion");
    let divErrorMsgDescripcion = document.querySelector("div.errorMsg.descripcion");

    let precio = document.querySelector("input#precio");
    let divPrecio = document.querySelector("div.precio");
    let divErrorMsgPrecio = document.querySelector("div.errorMsg.precio");

    let descuento = document.querySelector("input#descuento");
    let divDescuento = document.querySelector("div.descuento");
    let divErrorMsgDescuento = document.querySelector("div.errorMsg.descuento");

    let marca = document.querySelector("select#marca");
    let divMarca = document.querySelector("div.marca");
    let divErrorMsgMarca = document.querySelector("div.errorMsg.marca");
    
    let color = document.querySelector("select#color");
    let divColor = document.querySelector("div.color");
    let divErrorMsgColor = document.querySelector("div.errorMsg.color");

    let talle = document.querySelector("select#talle");
    let divTalle = document.querySelector("div.talle");
    let divErrorMsgTalle = document.querySelector("div.errorMsg.talle");

    let stock = document.querySelector("input#stock");
    let divStock = document.querySelector("div.stock");
    let divErrorMsgStock = document.querySelector("div.errorMsg.stock");

    let imagen = document.querySelector("input#img");
    let divImagen = document.querySelector("div.box-img");
    let divErrorMsgImagen = document.querySelector("div.errorMsg.img");

    let formC = document.querySelector(".createProductForm")
    let formE = document.querySelector(".editProductForm")
    let form
    if (formC) {
        form = formC
    } else {
        form = formE
    }


    /* NOMBRE */
    nombre.addEventListener('blur', () => {
        if (nombre.value.trim().length == 0) {
            divNombre.classList.add('errorBox');
            divErrorMsgNombre.innerHTML = "Este campo es obligatorio";
            divErrorMsgNombre.style.display = "block";
        } else if (nombre.value.trim().length < 5) {
            divNombre.classList.add('errorBox');
            divErrorMsgNombre.innerHTML = "El campo deberá tener al menos 5 caracteres";
            divErrorMsgNombre.style.display = "block";
        }
    });

    nombre.addEventListener('focus', () => {
        divNombre.classList.remove('errorBox');
        divErrorMsgNombre.style.display = "none"
    });


    /* DESCRIPCION */
    descripcion.addEventListener('blur', () => {
        if (descripcion.value.trim().length == 0) {
            divDescripcion.classList.add('errorBox');
            divErrorMsgDescripcion.innerHTML = "Este campo es obligatorio";
            divErrorMsgDescripcion.style.display = "block";
        } else if (descripcion.value.length < 20) {
            divDescripcion.classList.add('errorBox');
            divErrorMsgDescripcion.innerHTML = "El campo deberá tener al menos 20 caracteres";
            divErrorMsgDescripcion.style.display = "block";
        }
    });

    descripcion.addEventListener('focus', () => {
        divDescripcion.classList.remove('errorBox');
        divErrorMsgDescripcion.style.display = "none"
    });


    /* PRECIO */
    precio.addEventListener('blur', () => {
        /*const precioRegex = /^(?=.*\d)(?=.*[,])(?!\s)[\d.]{8,20}$/;
        precioRegex.test(precio.value);*/
        if (precio.value.trim().length == 0) {
            divPrecio.classList.add('errorBox');
            divErrorMsgPrecio.innerHTML = "Este campo es obligatorio y debe ser numerico";
            divErrorMsgPrecio.style.display = "block";
        } /*else if (!precioRegex.test(precio.value)) {
            divPrecio.classList.add('errorBox');
            divErrorMsgPrecio.innerHTML = "Solo caracteres numericos, con coma como separador decimal";
            divErrorMsgPrecio.style.display = "block";
        }*/
    });

    precio.addEventListener('focus', () => {
        divPrecio.classList.remove('errorBox');
        divErrorMsgPrecio.style.display = "none"
    });


    /* DESCUENTO */
    descuento.addEventListener('blur', () => {
        /*const precioRegex = /^(?=.*\d)(?=.*[,])(?!\s)[\d.]{8,20}$/;
        precioRegex.test(precio.value);*/
        if (descuento.value.trim().length == 0) {
            divDescuento.classList.add('errorBox');
            divErrorMsgDescuento.innerHTML = "Este campo es obligatorio y debe ser numerico";
            divErrorMsgDescuento.style.display = "block";
        } /*else if (!precioRegex.test(precio.value)) {
            divPrecio.classList.add('errorBox');
            divErrorMsgPrecio.innerHTML = "Solo caracteres numericos, con coma como separador decimal";
            divErrorMsgPrecio.style.display = "block";
        }*/
    });

    descuento.addEventListener('focus', () => {
        divDescuento.classList.remove('errorBox');
        divErrorMsgDescuento.style.display = "none"
    });


    /* MARCA */
    marca.addEventListener('blur', () => {
        if (marca.value == "- Seleccione la marca -") {
            divMarca.classList.add('errorBox');
            divErrorMsgMarca.innerHTML = "Seleccione una marca";
            divErrorMsgMarca.style.display = "block";
        } 
    });

    marca.addEventListener('focus', () => {
        divMarca.classList.remove('errorBox');
        divErrorMsgMarca.style.display = "none"
    });


    /* COLOR */
    color.addEventListener('blur', () => {
        if (color.value == "- Seleccione el color -") {
            divColor.classList.add('errorBox');
            divErrorMsgColor.innerHTML = "Seleccione un color";
            divErrorMsgColor.style.display = "block";
        } 
    });

    color.addEventListener('focus', () => {
        divColor.classList.remove('errorBox');
        divErrorMsgColor.style.display = "none"
    });


    /* TALLE */
    if (talle) {
        talle.addEventListener('blur', () => {
            if (talle.value == "- Seleccione el talle -") {
                divTalle.classList.add('errorBox');
                divErrorMsgTalle.innerHTML = "Seleccione un talle";
                divErrorMsgTalle.style.display = "block";
            } 
        });
    
        talle.addEventListener('focus', () => {
            divTalle.classList.remove('errorBox');
            divErrorMsgTalle.style.display = "none"
        });

    }

    
    /* STOCK */
    if (stock) {
        stock.addEventListener('blur', () => {
            /*const precioRegex = /^(?=.*\d)(?=.*[,])(?!\s)[\d.]{8,20}$/;
            precioRegex.test(precio.value);*/
            if (stock.value.trim().length == 0) {
                divStock.classList.add('errorBox');
                divErrorMsgStock.innerHTML = "Este campo es obligatorio y debe ser numerico";
                divErrorMsgStock.style.display = "block";
            } /*else if (!precioRegex.test(precio.value)) {
                divPrecio.classList.add('errorBox');
                divErrorMsgPrecio.innerHTML = "Solo caracteres numericos, con coma como separador decimal";
                divErrorMsgPrecio.style.display = "block";
            }*/
        });

        stock.addEventListener('focus', () => {
            divStock.classList.remove('errorBox');
            divErrorMsgStock.style.display = "none"
        });
    }


    /* IMAGEN */
    if (imagen) {
        imagen.addEventListener('change', (event) => {
            let ExtPermitidas = ["jpeg", "png", "jpg"];
            let imagenExt = event.target.files[0].name.split(".").pop().toLowerCase();
            if (!ExtPermitidas.includes(imagenExt)) {
                divImagen.classList.add('errorBox');
                divErrorMsgImagen.innerHTML = `Las extensiones permitidas son ${ExtPermitidas.join(", ")}.`;
                divErrorMsgImagen.style.display = "block";
            } else {
                divImagen.classList.remove('errorBox');
                divErrorMsgImagen.style.display = "none"
            }
        });
    }


   


    /* BOTON DE CARGA */

    let accionesPreventFormE = () => {
        if (nombre.value.trim().length == 0) {
            divNombre.classList.add('errorBox');
            divErrorMsgNombre.innerHTML = "Este campo es obligatorio";
            divErrorMsgNombre.style.display = "block";
        } else if (nombre.value.trim().length < 5) {
            divNombre.classList.add('errorBox');
            divErrorMsgNombre.innerHTML = "El campo deberá tener al menos 5 caracteres";
            divErrorMsgNombre.style.display = "block";
        };
        if (descripcion.value.trim().length == 0) {
            divDescripcion.classList.add('errorBox');
            divErrorMsgDescripcion.innerHTML = "Este campo es obligatorio";
            divErrorMsgDescripcion.style.display = "block";
        } else if (descripcion.value.length < 20) {
            divDescripcion.classList.add('errorBox');
            divErrorMsgDescripcion.innerHTML = "El campo deberá tener al menos 20 caracteres";
            divErrorMsgDescripcion.style.display = "block";
        };
        if (precio.value.trim().length == 0) {
            divPrecio.classList.add('errorBox');
            divErrorMsgPrecio.innerHTML = "Este campo es obligatorio y debe ser numerico";
            divErrorMsgPrecio.style.display = "block";
        };    
        if (descuento.value.trim().length == 0) {
            divDescuento.classList.add('errorBox');
            divErrorMsgDescuento.innerHTML = "Este campo es obligatorio y debe ser numerico";
            divErrorMsgDescuento.style.display = "block";
        };
        if (marca.value == "- Seleccione la marca -") {
            divMarca.classList.add('errorBox');
            divErrorMsgMarca.innerHTML = "Seleccione una marca";
            divErrorMsgMarca.style.display = "block";
        };
        if (color.value == "- Seleccione el color -") {
            divColor.classList.add('errorBox');
            divErrorMsgColor.innerHTML = "Seleccione un color";
            divErrorMsgColor.style.display = "block";
        };
    };

    let accionesPreventFormCAdic = () => {
        if (talle.value == "- Seleccione el talle -") {
            divTalle.classList.add('errorBox');
            divErrorMsgTalle.innerHTML = "Seleccione un talle";
            divErrorMsgTalle.style.display = "block";
        };
        if (stock.value.trim().length == 0) {
            divStock.classList.add('errorBox');
            divErrorMsgStock.innerHTML = "Este campo es obligatorio y debe ser numerico";
            divErrorMsgStock.style.display = "block";
        };
        if (!imagen.value) {
            divImagen.classList.add('errorBox');
            divErrorMsgImagen.innerHTML = "Este campo es obligatorio";
            divErrorMsgImagen.style.display = "block";
        }
    }
    
    form.addEventListener('submit', (event) => {
        if (nombre.value.trim().length == 0 || nombre.value.trim().length < 5 || descripcion.value.trim().length == 0 || descripcion.value.length < 20 || precio.value.trim().length == 0 || descuento.value.trim().length == 0 || marca.value.includes("seleccione") || color.value.includes("seleccione")) {
            event.preventDefault();
            accionesPreventFormE();
        } 
        if (talle && (talle.value.includes("seleccione") || stock.value.trim().length == 0 || !imagen.value)) {
            event.preventDefault();
            accionesPreventFormCAdic();
        }

    })
    
});

