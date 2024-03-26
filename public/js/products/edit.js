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


    let form = document.querySelector('.editProductForm');

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


        // En caso de que todo sea correcto
        if (validado) {
            form.submit();
        }
    })

});