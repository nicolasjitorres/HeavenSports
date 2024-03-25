window.addEventListener('load', function () {
    let boxNombre = document.querySelector('.nombre');
    let inputNombre = document.querySelector('.nombre .inp');
    let labelNombre = document.querySelector('.nombre .lbl');
    let errorNombre = document.querySelector(".nombre .error");

    let boxPrecio = document.querySelector('.precio');
    let inputPrecio = document.querySelector('.precio .inp');
    let labelPrecio = document.querySelector('.precio .lbl');
    let errorPrecio = document.querySelector(".precio .error");

    let boxDescuento = document.querySelector('.descuento');
    let inputDescuento = document.querySelector('.descuento .inp');
    let labelDescuento = document.querySelector('.descuento .lbl');
    let errorDescuento = document.querySelector(".descuento .error");

    let boxMarca = document.querySelector('.marca');
    let selectMarca = document.querySelector('.marca .select');
    let labelMarca = document.querySelector('.marca .lbl');
    let arrowMarca = document.querySelector('.marca .select-arrow');
    let errorMarca = document.querySelector(".marca .error");

    let boxColor = document.querySelector('.color');
    let selectColor = document.querySelector('.color .select');
    let labelColor = document.querySelector('.color .lbl');
    let arrowColor = document.querySelector('.color .select-arrow');
    let errorColor = document.querySelector(".color .error");

    let boxTalle = document.querySelector('.talle');
    let selectTalle = document.querySelector('.talle .select');
    let labelTalle = document.querySelector('.talle .lbl');
    let arrowTalle = document.querySelector('.talle .select-arrow');
    let errorTalle = document.querySelector(".talle .error");

    let boxStock = document.querySelector('.stock');
    let inputStock = document.querySelector('.stock .inp');
    let labelStock = document.querySelector('.stock .lbl');
    let errorStock = document.querySelector(".stock .error");

    let fileBox = document.querySelector('.image');
    let fileInput = document.querySelector("#img");
    let fileInfo = document.querySelector('.file-info');
    let fileList = document.querySelector('.file-info-p');
    let divImages = document.querySelector('.div-images');
    let fileImg = document.querySelector('.file-image');
    let fileError = document.querySelector('.image .error');

    const expRegEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const expRegContrasena = /^(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    let form = document.querySelector('.createProductForm');

    // Valida los datos 
    function validarError(box, input, label, error, msg) {
        if (error) {
            error.style.display = "block";
            error.textContent = msg;
        } else {
            error = document.createElement("p");
            error.classList.add("error");
            error.textContent = msg;
            box.appendChild(error);
        }
        input.classList.add("inp-error");
        label.classList.add("lbl-error");
        input.classList.remove("inp-valid");
        label.classList.remove("lbl-valid");

        return error;
    }


    // Si todo es correcto, se ejecuta esta funcion
    function datosCorrectos(input, label, error) {
        if (error) {
            error.style.display = "none"
        }
        input.classList.add("inp-valid");
        label.classList.add("lbl-valid");
        input.classList.remove("inp-error");
        label.classList.remove("lbl-error");
    }

    // Valida si los elementos cargados mediante el input de tipo file son correctos
    function validarImg(input) {
        let imagenes = input.files;
        for (const imagen of imagenes) {
            let extension = imagen.name.split('.').pop().toLowerCase();
            let extensionesValidas = ['jpg', 'png', 'jpeg'];
            if (!extensionesValidas.includes(extension)) {
                return `La extensión del archivo ${imagen.name} no está permitida.`;
            }

            let size = imagen.size / (1024 * 1024);
            if (size > 10) {
                return `El tamaño del archivo ${imagen.name} supera los 10Mb.`;
            }
        }

        return null;
    }

    // Funcion que elimina todas las imagenes menos la imagen por defecto
    function eliminarHermanos(div, img) {
        // Aqui buscamos al hermano de la imagen por defecto (default.png) dentro del contenedor de imagenes (divImages) ya que
        // se pretende que no se elimine la imagen por defecto
        let imgActual = img.nextElementSibling;
        while (imgActual) {
            // Se guarda la referencia del siguiente hermano, antes de eliminar el actual
            const imgSiguiente = imgActual.nextElementSibling;
            // Se elimina el actual
            div.removeChild(imgActual);
            // Ahora el hermano del eliminado pasa a ser el actual
            imgActual = imgSiguiente;
        }
    }

    // Agrega las imagenes cargadas, si todo está correcto, a la vista previa
    function agregarImagenes(input, list, info, error, div) {
        const imagenes = input.files;
        list.textContent = '';
        for (const imagen of imagenes) {
            list.innerHTML += `● ${imagen.name} <br>`;
            const img = document.createElement('img');
            img.classList.add('images');
            let reader = new FileReader();
            reader.onload = function (event) {
                img.src = event.target.result;
            }
            div.appendChild(img);
            reader.readAsDataURL(imagen);
            if (error) {
                error.style.display = 'none';
            }
            info.classList.add('inp-valid');
            list.classList.add('lbl-valid');
            info.classList.remove('inp-error');
            list.classList.remove('lbl-error');
        }

    }


    // VALIDACIONES DE LOS CAMPOS

    // Evento para validar el campo nombre
    inputNombre.addEventListener('blur', () => {
        if (inputNombre.value.trim().length == 0) {
            return errorNombre = validarError(boxNombre, inputNombre, labelNombre, errorNombre, "Este campo es obligatorio.")
        }

        if (inputNombre.value.length < 5) {
            return errorNombre = validarError(boxNombre, inputNombre, labelNombre, errorNombre, "El nombre debe tener al menos 2 caracteres.")
        }

        return datosCorrectos(inputNombre, labelNombre, errorNombre);
    })

    // Evento para validar el campo precio
    inputPrecio.addEventListener('blur', () => {
        if (inputPrecio.value.length == 0) {
            return errorPrecio = validarError(boxPrecio, inputPrecio, labelPrecio, errorPrecio, "Este campo es obligatorio.")
        }

        if (inputPrecio.value < 0) {
            return errorPrecio = validarError(boxPrecio, inputPrecio, labelPrecio, errorPrecio, "El precio debe ser mayor o igual a 0.")
        }

        return datosCorrectos(inputPrecio, labelPrecio, errorPrecio);
    })

    // Evento para validar el campo descuento
    inputDescuento.addEventListener('blur', () => {
        if (inputDescuento.value.length == 0) {
            return errorDescuento = validarError(boxDescuento, inputDescuento, labelDescuento, errorDescuento, "Este campo es obligatorio.")
        }

        if (inputDescuento.value < 0 || inputDescuento.value > 100) {
            return errorDescuento = validarError(boxDescuento, inputDescuento, labelDescuento, errorDescuento, "El precio debe tener un valor entre 0 y 100.")
        }

        return datosCorrectos(inputDescuento, labelDescuento, errorDescuento);
    })


    // Evento para validar el campo marca
    selectMarca.addEventListener('blur', () => {
        if (selectMarca.value.includes('Seleccione')) {
            selectMarca.classList.remove('lbl-valid');
            arrowMarca.classList.remove('inp-valid');
            selectMarca.classList.add('lbl-error');
            arrowMarca.classList.add('inp-error');
            return errorMarca = validarError(boxMarca, selectMarca, labelMarca, errorMarca, "Seleccione una marca.");
        }

        selectMarca.classList.remove('lbl-error');
        arrowMarca.classList.remove('inp-error');
        selectMarca.classList.add('lbl-valid');
        arrowMarca.classList.add('inp-valid');
        return datosCorrectos(selectMarca, labelMarca, errorMarca);
    })

    // Evento para validar el campo color
    selectColor.addEventListener('blur', () => {
        if (selectColor.value.includes('Seleccione')) {
            selectColor.classList.remove('lbl-valid');
            arrowColor.classList.remove('inp-valid');
            selectColor.classList.add('lbl-error');
            arrowColor.classList.add('inp-error');
            return errorColor = validarError(boxColor, selectColor, labelColor, errorColor, "Seleccione un color.");
        }

        selectColor.classList.remove('lbl-error');
        arrowColor.classList.remove('inp-error');
        selectColor.classList.add('lbl-valid');
        arrowColor.classList.add('inp-valid');
        return datosCorrectos(selectColor, labelColor, errorColor);
    })

    // Evento para validar el campo talle
    selectTalle.addEventListener('blur', () => {
        if (selectTalle.value.includes('Seleccione')) {
            selectTalle.classList.remove('lbl-valid');
            arrowTalle.classList.remove('inp-valid');
            selectTalle.classList.add('lbl-error');
            arrowTalle.classList.add('inp-error');
            return errorTalle = validarError(boxTalle, selectTalle, labelTalle, errorTalle, "Seleccione un talle.");
        }

        selectTalle.classList.remove('lbl-error');
        arrowTalle.classList.remove('inp-error');
        selectTalle.classList.add('lbl-valid');
        arrowTalle.classList.add('inp-valid');
        return datosCorrectos(selectTalle, labelTalle, errorTalle);
    })

    // Evento para validar el campo stock
    inputStock.addEventListener('blur', () => {
        if (inputStock.value.length == 0) {
            return errorStock = validarError(boxStock, inputStock, labelStock, errorStock, "Este campo es obligatorio.")
        }

        if (inputStock.value < 0) {
            return errorStock = validarError(boxStock, inputStock, labelStock, errorStock, "El stock debe ser mayor o igual a 0.")
        }

        return datosCorrectos(inputStock, labelStock, errorStock);
    })


    // Validacion del input de imagen
    fileInput.addEventListener('change', () => {
        const result = validarImg(fileInput);
        if (result) {
            fileError = validarError(fileBox, fileInfo, fileList, fileError, result);
            fileList.textContent = 'Ningun archivo seleccionado.';
            fileInput.value = '';
            fileImg.style.display = 'block';
            eliminarHermanos(divImages, fileImg);
            return;
        }

        eliminarHermanos(divImages, fileImg);
        fileImg.style.display = 'none';
        agregarImagenes(fileInput, fileList, fileInfo, fileError, divImages);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let validado = true;

        // Valida el campo nombre
        if (inputNombre.value.trim().length == 0) {
            errorNombre = validarError(boxNombre, inputNombre, labelNombre, errorNombre, "Este campo es obligatorio.")
            validado = false;
        } else if (inputNombre.value.length < 5) {
            errorNombre = validarError(boxNombre, inputNombre, labelNombre, errorNombre, "El nombre debe tener al menos 2 caracteres.")
            validado = false;
        }

        // Valida el campo precio
        if (inputPrecio.value.length == 0) {
            errorPrecio = validarError(boxPrecio, inputPrecio, labelPrecio, errorPrecio, "Este campo es obligatorio.")
            validado = false;
        } else if (inputPrecio.value < 0) {
            errorPrecio = validarError(boxPrecio, inputPrecio, labelPrecio, errorPrecio, "El precio debe ser mayor o igual a 0..")
            validado = false;
        }

        // Valida el campo descuento
        if (inputDescuento.value.length == 0) {
            errorDescuento = validarError(boxDescuento, inputDescuento, labelDescuento, errorDescuento, "Este campo es obligatorio.")
            validado = false;
        } else if (inputDescuento.value < 0 || inputDescuento.value > 100) {
            errorDescuento = validarError(boxDescuento, inputDescuento, labelDescuento, errorDescuento, "El precio debe tener un valor entre 0 y 100.")
            validado = false;
        }

        // Valida el campo stock
        if (inputStock.value.length == 0) {
            errorStock = validarError(boxStock, inputStock, labelStock, errorStock, "Este campo es obligatorio.")
            validado = false;
        } else if (inputPrecio.value < 0) {
            errorStock = validarError(boxStock, inputStock, labelStock, errorStock, "El stock debe ser mayor o igual a 0.")
            validado = false;
        }

        // Valida el campo marca
        if (selectMarca.value.includes('Seleccione')) {
            selectMarca.classList.remove('lbl-valid');
            arrowMarca.classList.remove('inp-valid');
            selectMarca.classList.add('lbl-error');
            arrowMarca.classList.add('inp-error');
            errorMarca = validarError(boxMarca, selectMarca, labelMarca, errorMarca, "Seleccione una marca.");
            validado = false;
        }

        // Valida el campo color
        if (selectColor.value.includes('Seleccione')) {
            selectColor.classList.remove('lbl-valid');
            arrowColor.classList.remove('inp-valid');
            selectColor.classList.add('lbl-error');
            arrowColor.classList.add('inp-error');
            errorColor = validarError(boxColor, selectColor, labelColor, errorColor, "Seleccione un color.");
            validado = false;
        }

        // Valida el campo talle
        if (selectTalle.value.includes('Seleccione')) {
            selectTalle.classList.remove('lbl-valid');
            arrowTalle.classList.remove('inp-valid');
            selectTalle.classList.add('lbl-error');
            arrowTalle.classList.add('inp-error');
            errorTalle = validarError(boxTalle, selectTalle, labelTalle, errorTalle, "Seleccione un talle.");
            validado = false;
        }

        // En caso de que todo sea correcto
        if (validado) {
            form.submit();
        }
    })










    // let nombre = document.querySelector("input#nombre");
    // let divNombre = document.querySelector("div.nombre");
    // let divErrorMsgNombre = document.querySelector("div.errorMsg.nombre");

    // let descripcion = document.querySelector("input#descripcion");
    // let divDescripcion = document.querySelector("div.descripcion");
    // let divErrorMsgDescripcion = document.querySelector("div.errorMsg.descripcion");

    // let precio = document.querySelector("input#precio");
    // let divPrecio = document.querySelector("div.precio");
    // let divErrorMsgPrecio = document.querySelector("div.errorMsg.precio");

    // let descuento = document.querySelector("input#descuento");
    // let divDescuento = document.querySelector("div.descuento");
    // let divErrorMsgDescuento = document.querySelector("div.errorMsg.descuento");

    // let marca = document.querySelector("select#marca");
    // let divMarca = document.querySelector("div.marca");
    // let divErrorMsgMarca = document.querySelector("div.errorMsg.marca");

    // let color = document.querySelector("select#color");
    // let divColor = document.querySelector("div.color");
    // let divErrorMsgColor = document.querySelector("div.errorMsg.color");

    // let talle = document.querySelector("select#talle");
    // let divTalle = document.querySelector("div.talle");
    // let divErrorMsgTalle = document.querySelector("div.errorMsg.talle");

    // let stock = document.querySelector("input#stock");
    // let divStock = document.querySelector("div.stock");
    // let divErrorMsgStock = document.querySelector("div.errorMsg.stock");

    // let imagen = document.querySelector("input#img");
    // let divImagen = document.querySelector("div.box-img");
    // let divErrorMsgImagen = document.querySelector("div.errorMsg.img");

    // let formC = document.querySelector(".createProductForm")
    // let formE = document.querySelector(".editProductForm")
    // let form
    // if (formC) {
    //     form = formC
    // } else {
    //     form = formE
    // }


    // /* NOMBRE */
    // nombre.addEventListener('blur', () => {
    //     if (nombre.value.trim().length == 0) {
    //         divNombre.classList.add('errorBox');
    //         divErrorMsgNombre.innerHTML = "Este campo es obligatorio";
    //         divErrorMsgNombre.style.display = "block";
    //     } else if (nombre.value.trim().length < 5) {
    //         divNombre.classList.add('errorBox');
    //         divErrorMsgNombre.innerHTML = "El campo deberá tener al menos 5 caracteres";
    //         divErrorMsgNombre.style.display = "block";
    //     }
    // });

    // nombre.addEventListener('focus', () => {
    //     divNombre.classList.remove('errorBox');
    //     divErrorMsgNombre.style.display = "none"
    // });


    // /* DESCRIPCION */
    // descripcion.addEventListener('blur', () => {
    //     if (descripcion.value.trim().length == 0) {
    //         divDescripcion.classList.add('errorBox');
    //         divErrorMsgDescripcion.innerHTML = "Este campo es obligatorio";
    //         divErrorMsgDescripcion.style.display = "block";
    //     } else if (descripcion.value.length < 20) {
    //         divDescripcion.classList.add('errorBox');
    //         divErrorMsgDescripcion.innerHTML = "El campo deberá tener al menos 20 caracteres";
    //         divErrorMsgDescripcion.style.display = "block";
    //     }
    // });

    // descripcion.addEventListener('focus', () => {
    //     divDescripcion.classList.remove('errorBox');
    //     divErrorMsgDescripcion.style.display = "none"
    // });


    // /* PRECIO */
    // precio.addEventListener('blur', () => {
    //     /*const precioRegex = /^(?=.*\d)(?=.*[,])(?!\s)[\d.]{8,20}$/;
    //     precioRegex.test(precio.value);*/
    //     if (precio.value.trim().length == 0) {
    //         divPrecio.classList.add('errorBox');
    //         divErrorMsgPrecio.innerHTML = "Este campo es obligatorio y debe ser numerico";
    //         divErrorMsgPrecio.style.display = "block";
    //     } /*else if (!precioRegex.test(precio.value)) {
    //         divPrecio.classList.add('errorBox');
    //         divErrorMsgPrecio.innerHTML = "Solo caracteres numericos, con coma como separador decimal";
    //         divErrorMsgPrecio.style.display = "block";
    //     }*/
    // });

    // precio.addEventListener('focus', () => {
    //     divPrecio.classList.remove('errorBox');
    //     divErrorMsgPrecio.style.display = "none"
    // });


    // /* DESCUENTO */
    // descuento.addEventListener('blur', () => {
    //     /*const precioRegex = /^(?=.*\d)(?=.*[,])(?!\s)[\d.]{8,20}$/;
    //     precioRegex.test(precio.value);*/
    //     if (descuento.value.trim().length == 0) {
    //         divDescuento.classList.add('errorBox');
    //         divErrorMsgDescuento.innerHTML = "Este campo es obligatorio y debe ser numerico";
    //         divErrorMsgDescuento.style.display = "block";
    //     } /*else if (!precioRegex.test(precio.value)) {
    //         divPrecio.classList.add('errorBox');
    //         divErrorMsgPrecio.innerHTML = "Solo caracteres numericos, con coma como separador decimal";
    //         divErrorMsgPrecio.style.display = "block";
    //     }*/
    // });

    // descuento.addEventListener('focus', () => {
    //     divDescuento.classList.remove('errorBox');
    //     divErrorMsgDescuento.style.display = "none"
    // });


    // /* MARCA */
    // marca.addEventListener('blur', () => {
    //     if (marca.value == "- Seleccione la marca -") {
    //         divMarca.classList.add('errorBox');
    //         divErrorMsgMarca.innerHTML = "Seleccione una marca";
    //         divErrorMsgMarca.style.display = "block";
    //     } 
    // });

    // marca.addEventListener('focus', () => {
    //     divMarca.classList.remove('errorBox');
    //     divErrorMsgMarca.style.display = "none"
    // });


    // /* COLOR */
    // color.addEventListener('blur', () => {
    //     if (color.value == "- Seleccione el color -") {
    //         divColor.classList.add('errorBox');
    //         divErrorMsgColor.innerHTML = "Seleccione un color";
    //         divErrorMsgColor.style.display = "block";
    //     } 
    // });

    // color.addEventListener('focus', () => {
    //     divColor.classList.remove('errorBox');
    //     divErrorMsgColor.style.display = "none"
    // });


    // /* TALLE */
    // if (talle) {
    //     talle.addEventListener('blur', () => {
    //         if (talle.value == "- Seleccione el talle -") {
    //             divTalle.classList.add('errorBox');
    //             divErrorMsgTalle.innerHTML = "Seleccione un talle";
    //             divErrorMsgTalle.style.display = "block";
    //         } 
    //     });

    //     talle.addEventListener('focus', () => {
    //         divTalle.classList.remove('errorBox');
    //         divErrorMsgTalle.style.display = "none"
    //     });

    // }


    // /* STOCK */
    // if (stock) {
    //     stock.addEventListener('blur', () => {
    //         /*const precioRegex = /^(?=.*\d)(?=.*[,])(?!\s)[\d.]{8,20}$/;
    //         precioRegex.test(precio.value);*/
    //         if (stock.value.trim().length == 0) {
    //             divStock.classList.add('errorBox');
    //             divErrorMsgStock.innerHTML = "Este campo es obligatorio y debe ser numerico";
    //             divErrorMsgStock.style.display = "block";
    //         } /*else if (!precioRegex.test(precio.value)) {
    //             divPrecio.classList.add('errorBox');
    //             divErrorMsgPrecio.innerHTML = "Solo caracteres numericos, con coma como separador decimal";
    //             divErrorMsgPrecio.style.display = "block";
    //         }*/
    //     });

    //     stock.addEventListener('focus', () => {
    //         divStock.classList.remove('errorBox');
    //         divErrorMsgStock.style.display = "none"
    //     });
    // }


    // /* IMAGEN */
    // if (imagen) {
    //     imagen.addEventListener('change', (event) => {
    //         let ExtPermitidas = ["jpeg", "png", "jpg"];
    //         let imagenExt = event.target.files[0].name.split(".").pop().toLowerCase();
    //         if (!ExtPermitidas.includes(imagenExt)) {
    //             divImagen.classList.add('errorBox');
    //             divErrorMsgImagen.innerHTML = `Las extensiones permitidas son ${ExtPermitidas.join(", ")}.`;
    //             divErrorMsgImagen.style.display = "block";
    //         } else {
    //             divImagen.classList.remove('errorBox');
    //             divErrorMsgImagen.style.display = "none"
    //         }
    //     });
    // }





    // /* BOTON DE CARGA */

    // let accionesPreventFormE = () => {
    //     if (nombre.value.trim().length == 0) {
    //         divNombre.classList.add('errorBox');
    //         divErrorMsgNombre.innerHTML = "Este campo es obligatorio";
    //         divErrorMsgNombre.style.display = "block";
    //     } else if (nombre.value.trim().length < 5) {
    //         divNombre.classList.add('errorBox');
    //         divErrorMsgNombre.innerHTML = "El campo deberá tener al menos 5 caracteres";
    //         divErrorMsgNombre.style.display = "block";
    //     };
    //     if (descripcion.value.trim().length == 0) {
    //         divDescripcion.classList.add('errorBox');
    //         divErrorMsgDescripcion.innerHTML = "Este campo es obligatorio";
    //         divErrorMsgDescripcion.style.display = "block";
    //     } else if (descripcion.value.length < 20) {
    //         divDescripcion.classList.add('errorBox');
    //         divErrorMsgDescripcion.innerHTML = "El campo deberá tener al menos 20 caracteres";
    //         divErrorMsgDescripcion.style.display = "block";
    //     };
    //     if (precio.value.trim().length == 0) {
    //         divPrecio.classList.add('errorBox');
    //         divErrorMsgPrecio.innerHTML = "Este campo es obligatorio y debe ser numerico";
    //         divErrorMsgPrecio.style.display = "block";
    //     };    
    //     if (descuento.value.trim().length == 0) {
    //         divDescuento.classList.add('errorBox');
    //         divErrorMsgDescuento.innerHTML = "Este campo es obligatorio y debe ser numerico";
    //         divErrorMsgDescuento.style.display = "block";
    //     };
    //     if (marca.value == "- Seleccione la marca -") {
    //         divMarca.classList.add('errorBox');
    //         divErrorMsgMarca.innerHTML = "Seleccione una marca";
    //         divErrorMsgMarca.style.display = "block";
    //     };
    //     if (color.value == "- Seleccione el color -") {
    //         divColor.classList.add('errorBox');
    //         divErrorMsgColor.innerHTML = "Seleccione un color";
    //         divErrorMsgColor.style.display = "block";
    //     };
    // };

    // let accionesPreventFormCAdic = () => {
    //     if (talle.value == "- Seleccione el talle -") {
    //         divTalle.classList.add('errorBox');
    //         divErrorMsgTalle.innerHTML = "Seleccione un talle";
    //         divErrorMsgTalle.style.display = "block";
    //     };
    //     if (stock.value.trim().length == 0) {
    //         divStock.classList.add('errorBox');
    //         divErrorMsgStock.innerHTML = "Este campo es obligatorio y debe ser numerico";
    //         divErrorMsgStock.style.display = "block";
    //     };
    //     if (!imagen.value) {
    //         divImagen.classList.add('errorBox');
    //         divErrorMsgImagen.innerHTML = "Este campo es obligatorio";
    //         divErrorMsgImagen.style.display = "block";
    //     }
    // }

    // form.addEventListener('submit', (event) => {
    //     if (nombre.value.trim().length == 0 || nombre.value.trim().length < 5 || descripcion.value.trim().length == 0 || descripcion.value.length < 20 || precio.value.trim().length == 0 || descuento.value.trim().length == 0 || marca.value.includes("seleccione") || color.value.includes("seleccione")) {
    //         event.preventDefault();
    //         accionesPreventFormE();
    //     } 
    //     if (talle && (talle.value.includes("seleccione") || stock.value.trim().length == 0 || !imagen.value)) {
    //         event.preventDefault();
    //         accionesPreventFormCAdic();
    //     }

    // })

});