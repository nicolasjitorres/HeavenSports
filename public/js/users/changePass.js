window.addEventListener('load', function () {
    let boxContrasenaActual = document.querySelector('.contrasenaActual');
    let inputContrasenaActual = document.querySelector('.contrasenaActual .inp');
    let labelContrasenaActual = document.querySelector('.contrasenaActual .lbl');
    let errorContrasenaActual = document.querySelector(".contrasenaActual .error");

    let boxContrasena = document.querySelector('.contrasena');
    let inputContrasena = document.querySelector('.contrasena .inp');
    let labelContrasena = document.querySelector('.contrasena .lbl');
    let errorContrasena = document.querySelector(".contrasena .error");

    let boxReContrasena = document.querySelector('.reContrasena');
    let inputReContrasena = document.querySelector('.reContrasena .inp');
    let labelReContrasena = document.querySelector('.reContrasena .lbl');
    let errorReContrasena = document.querySelector(".reContrasena .error");

    let form = document.querySelector('.changePassForm');

    const expRegContrasena = /^(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

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

    // Evento para validar el campo contraseñaActual
    inputContrasenaActual.addEventListener('blur', () => {
        if (inputContrasenaActual.value.length == 0) {
            return errorContrasenaActual = validarError(boxContrasenaActual, inputContrasenaActual, labelContrasenaActual, errorContrasenaActual, "Este campo es obligatorio.")
        }

        /*if (inputContrasenaActual.value.length < 8) {
                    return errorContrasenaActual = validarError(boxContrasenaActual, inputContrasenaActual, labelContrasenaActual, errorContrasenaActual, "La contraseña debe tener al menos 8 caracteres.")
                }

                if (!expRegContrasena.test(inputContrasenaActual.value)) {
                    return errorContrasenaActual = validarError(boxContrasenaActual, inputContrasenaActual, labelContrasenaActual, errorContrasenaActual, "La contraseña debe contener al menos una minúscula, una mayúscula, un dígito y un carácter especial.")
                } */

        return datosCorrectos(inputContrasenaActual, labelContrasenaActual, errorContrasenaActual);
    });


    // Evento para validar el campo contraseña
    inputContrasena.addEventListener('blur', () => {
        if (inputContrasena.value.length == 0) {
            return errorContrasena = validarError(boxContrasena, inputContrasena, labelContrasena, errorContrasena, "Este campo es obligatorio.")
        }

        if (inputContrasena.value.length < 8) {
            return errorContrasena = validarError(boxContrasena, inputContrasena, labelContrasena, errorContrasena, "La contraseña debe tener al menos 8 caracteres.")
        }

        if (!expRegContrasena.test(inputContrasena.value)) {
            return errorContrasena = validarError(boxContrasena, inputContrasena, labelContrasena, errorContrasena, "La contraseña debe contener al menos una minúscula, una mayúscula, un dígito y un carácter especial.")
        }

        return datosCorrectos(inputContrasena, labelContrasena, errorContrasena);
    });

    // Evento para validar el campo reContraseña
    inputReContrasena.addEventListener('blur', () => {
        if (inputReContrasena.value.length == 0) {
            return errorReContrasena = validarError(boxReContrasena, inputReContrasena, labelReContrasena, errorReContrasena, "Este campo es obligatorio.")
        }

        if (inputContrasena.value != inputReContrasena.value) {
            return errorReContrasena = validarError(boxReContrasena, inputReContrasena, labelReContrasena, errorReContrasena, "Las contraseñas no coinciden.")
        }

        return datosCorrectos(inputReContrasena, labelReContrasena, errorReContrasena);
    });


    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let validado = true;
        
        // Valida el campo contrasenaActual
        if (inputContrasenaActual.value.length == 0) {
            errorContrasenaActual = validarError(boxContrasenaActual, inputContrasenaActual, labelContrasenaActual, errorContrasenaActual, "Este campo es obligatorio.")
            validado = false;
        }

        // Valida el campo contrasena
        if (inputContrasena.value.length == 0) {
            errorContrasena = validarError(boxContrasena, inputContrasena, labelContrasena, errorContrasena, "Este campo es obligatorio.")
            validado = false;
        } else if (inputContrasena.value.length < 8) {
            errorContrasena = validarError(boxContrasena, inputContrasena, labelContrasena, errorContrasena, "La contraseña debe tener al menos 8 caracteres.")
            validado = false;
        } else if (!expRegContrasena.test(inputContrasena.value)) {
            errorContrasena = validarError(boxContrasena, inputContrasena, labelContrasena, errorContrasena, "La contraseña debe contener al menos una minúscula, una mayúscula, un dígito y un carácter especial.")
            validado = false;
        }

        // Valida el campo reContrasena
        if (inputReContrasena.value.length == 0) {
            errorReContrasena = validarError(boxReContrasena, inputReContrasena, labelReContrasena, errorReContrasena, "Este campo es obligatorio.")
            validado = false;
        } else if (inputContrasena.value != inputReContrasena.value) {
            errorReContrasena = validarError(boxReContrasena, inputReContrasena, labelReContrasena, errorReContrasena, "Las contraseñas no coinciden.")
            validado = false;
        }

        // En caso de que todo sea correcto
        if (validado) {
            form.submit();
        }
    })

});