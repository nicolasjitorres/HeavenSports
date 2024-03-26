window.addEventListener('load', function () {
    let boxTalle = document.querySelector('.talle');
    let selectTalle = document.querySelector('.talle .select');
    let labelTalle = document.querySelector('.talle .lbl');
    let arrowTalle = document.querySelector('.talle .select-arrow');
    let errorTalle = document.querySelector(".talle .error");

    let boxStock = document.querySelector('.stock');
    let inputStock = document.querySelector('.stock .inp');
    let labelStock = document.querySelector('.stock .lbl');
    let errorStock = document.querySelector(".stock .error");

    let form = document.querySelector('.createSizeForm');
    let editForm = document.querySelector('.editSizeForm');

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


    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let validado = true;

        // Valida el campo stock
        if (inputStock.value.length == 0) {
            errorStock = validarError(boxStock, inputStock, labelStock, errorStock, "Este campo es obligatorio.")
            validado = false;
        } else if (inputStock.value < 0) {
            errorStock = validarError(boxStock, inputStock, labelStock, errorStock, "El stock debe ser mayor o igual a 0.")
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

    editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let validado = true;

        // Valida el campo stock
        if (inputStock.value.length == 0) {
            errorStock = validarError(boxStock, inputStock, labelStock, errorStock, "Este campo es obligatorio.")
            validado = false;
        } else if (inputStock.value < 0) {
            errorStock = validarError(boxStock, inputStock, labelStock, errorStock, "El stock debe ser mayor o igual a 0.")
            validado = false;
        }

        // En caso de que todo sea correcto
        if (validado) {
            form.submit();
        }
    })

});