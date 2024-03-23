window.addEventListener('load', function () {

    let boxNombre = document.querySelector('.nombre');
    let inputNombre = document.querySelector('.nombre .inp');
    let labelNombre = document.querySelector('.nombre .lbl');
    let errorNombre = document.querySelector(".nombre .error");

    let boxApellido = document.querySelector('.apellido');
    let inputApellido = document.querySelector('.apellido .inp');
    let labelApellido = document.querySelector('.apellido .lbl');
    let errorApellido = document.querySelector(".apellido .error");

    let boxEmail = document.querySelector('.email');
    let inputEmail = document.querySelector('.email .inp');
    let labelEmail = document.querySelector('.email .lbl');
    let errorEmail = document.querySelector(".email .error");

    let boxContrasena = document.querySelector('.contrasena');
    let inputContrasena = document.querySelector('.contrasena .inp');
    let labelContrasena = document.querySelector('.contrasena .lbl');
    let errorContrasena = document.querySelector(".contrasena .error");

    let boxReContrasena = document.querySelector('.reContrasena');
    let inputReContrasena = document.querySelector('.reContrasena .inp');
    let labelReContrasena = document.querySelector('.reContrasena .lbl');
    let errorReContrasena = document.querySelector(".reContrasena .error");

    let fileBox = document.querySelector('.image');
    let fileInput = document.querySelector("#img");
    let fileInfo = document.querySelector('.file-info');
    let fileList = document.querySelector('.file-info-p');
    let fileImg = document.querySelector('.file-image');
    let fileError = document.querySelector('.image .error');

    const expRegEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const expRegContrasena = /^(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    let form = document.querySelector('.registerForm');

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

    function validarImg(input) {
        let imagen = input.files[0];
        let extension = imagen.name.split('.').pop().toLowerCase();
        let extensionesValidas = ['jpg', 'png', 'jpeg'];
        if (!extensionesValidas.includes(extension)) {
            return 'La extensión es invalida.';
        }

        let size = imagen.size / (1024 * 1024);
        if (size > 10) {
            return 'El tamaño supera los 10Mb.';
        }

        return null;
    }


    // VALIDACIONES DE LOS CAMPOS

    // Evento para validar el campo nombre
    inputNombre.addEventListener('blur', () => {
        if (inputNombre.value.trim().length == 0) {
            return errorNombre = validarError(boxNombre, inputNombre, labelNombre, errorNombre, "Este campo es obligatorio.")
        }

        if (inputNombre.value.length < 2) {
            return errorNombre = validarError(boxNombre, inputNombre, labelNombre, errorNombre, "El nombre debe tener al menos 2 caracteres.")
        }

        return datosCorrectos(inputNombre, labelNombre, errorNombre);
    })

    // Evento para validar el campo apellido
    inputApellido.addEventListener('blur', () => {
        if (inputApellido.value.length == 0) {
            return errorApellido = validarError(boxApellido, inputApellido, labelApellido, errorApellido, "Este campo es obligatorio.")
        }

        if (inputApellido.value.length < 2) {
            return errorApellido = validarError(boxApellido, inputApellido, labelApellido, errorApellido, "El apellido debe tener al menos 2 caracteres.")
        }

        return datosCorrectos(inputApellido, labelApellido, errorApellido);
    })

    // Evento para validar el campo email
    inputEmail.addEventListener('blur', () => {
        if (inputEmail.value.length == 0) {
            return errorEmail = validarError(boxEmail, inputEmail, labelEmail, errorEmail, "Este campo es obligatorio.")
        }

        if (!expRegEmail.test(inputEmail.value)) {
            return errorEmail = validarError(boxEmail, inputEmail, labelEmail, errorEmail, "Introduzca un email valido.")
        }

        return datosCorrectos(inputEmail, labelEmail, errorEmail);
    })

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
    })

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


    // Validacion del input de imagen
    fileInput.addEventListener('change', () => {
        const result = validarImg(fileInput);

        if (result) {
            fileError = validarError(fileBox, fileInfo, fileList, fileError, result);
            fileList.textContent = 'Ningun archivo seleccionado.';
            fileInput.value = '';
            return;
        }

        fileList.textContent = fileInput.files[0].name;
        let reader = new FileReader();
        reader.onload = function (event) {
            fileImg.src = event.target.result;
        }
        reader.readAsDataURL(fileInput.files[0]);
        if (fileError) {
            fileError.style.display = 'none';
        }
        fileInfo.classList.add('inp-valid');
        fileList.classList.add('lbl-valid');
        fileInfo.classList.remove('inp-error');
        fileList.classList.remove('lbl-error');
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let validado = true;

        // Valida el campo nombre
        if (inputNombre.value.trim().length == 0) {
            errorNombre = validarError(boxNombre, inputNombre, labelNombre, errorNombre, "Este campo es obligatorio.")
            validado = false;
        } else if (inputNombre.value.length < 2) {
            errorNombre = validarError(boxNombre, inputNombre, labelNombre, errorNombre, "El nombre debe tener al menos 2 caracteres.")
            validado = false;
        }

        // Valida el campo apellido
        if (inputApellido.value.length == 0) {
            errorApellido = validarError(boxApellido, inputApellido, labelApellido, errorApellido, "Este campo es obligatorio.")
            validado = false;
        } else if (inputApellido.value.length < 2) {
            errorApellido = validarError(boxApellido, inputApellido, labelApellido, errorApellido, "El apellido debe tener al menos 2 caracteres.")
            validado = false;
        }

        // Valida el campo email
        if (inputEmail.value.length == 0) {
            errorEmail = validarError(boxEmail, inputEmail, labelEmail, errorEmail, "Este campo es obligatorio.")
            validado = false;
        } else if (!expRegEmail.test(inputEmail.value)) {
            errorEmail = validarError(boxEmail, inputEmail, labelEmail, errorEmail, "Introduzca un email valido.")
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