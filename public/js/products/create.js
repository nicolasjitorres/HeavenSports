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
        } else if (inputStock.value < 0) {
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

});