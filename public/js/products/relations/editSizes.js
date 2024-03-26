window.addEventListener('load', function () {
    let boxStock = document.querySelector('.stock');
    let inputStock = document.querySelector('.stock .inp');
    let labelStock = document.querySelector('.stock .lbl');
    let errorStock = document.querySelector(".stock .error");

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
            editForm.submit();
        }
    })

});