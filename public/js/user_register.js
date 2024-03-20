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

    let fileInput = document.querySelector("#img");
    let fileList = document.querySelector('.file-info-p');
    let fileImg = document.querySelector('.file-image');

    const expRegEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const expRegContrasena = /^(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;


    // Valida los datos 
    function validar({
        box,
        input,
        label,
        error,
        msg
    }) {
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
    function datosCorrectos({input, label, error}) {
        if (error) {
            error.style.display = "none"
        }
        input.classList.add("inp-valid");
        label.classList.add("lbl-valid");
        input.classList.remove("inp-error");
        label.classList.remove("lbl-error");
    }


    // Evento que escuchara si hay algun cambio en el input de imagen de perfil
    fileInput.addEventListener('change', () => {
        fileList.textContent = fileInput.files[0].name;
        let reader = new FileReader();

        reader.onload = function (event) {
            fileImg.src = event.target.result;
        }

        reader.readAsDataURL(fileInput.files[0]);
    });


    // Evento para validar el campo nombre
    inputNombre.addEventListener('blur', () => {
        if (inputNombre.value.trim().length == 0) {
            return errorNombre = validar({
                box: boxNombre,
                input: inputNombre,
                label: labelNombre,
                error: errorNombre,
                msg: "Este campo es obligatorio."
            })
        }

        return datosCorrectos({
            input: inputNombre,
            label: labelNombre,
            error: errorNombre
        });
        
    })

    // Evento para validar el campo apellido
    inputApellido.addEventListener('blur', () => {
        if (inputApellido.value.length == 0) {
            return errorApellido = validar({
                box: boxApellido,
                input: inputApellido,
                label: labelApellido,
                error: errorApellido,
                msg: "Este campo es obligatorio."
            })
        }

        return datosCorrectos({
            input: inputApellido,
            label: labelApellido,
            error: errorApellido
        });
    })

    // Evento para validar el campo email
    inputEmail.addEventListener('blur', () => {
        if (inputEmail.value.length == 0) {
            return errorEmail = validar({
                box: boxEmail,
                input: inputEmail,
                label: labelEmail,
                error: errorEmail,
                msg: "Este campo es obligatorio."
            })
        }

        if (!expRegEmail.test(inputEmail.value)) {
            return errorEmail = validar({
                box: boxEmail,
                input: inputEmail,
                label: labelEmail,
                error: errorEmail,
                msg: "Introduzca un email valido."
            })
        }

        return datosCorrectos({
            input: inputEmail,
            label: labelEmail,
            error: errorEmail
        });
    })

    // Evento para validar el campo contraseña
    inputContrasena.addEventListener('blur', () => {
        if (inputContrasena.value.length == 0) {
            return errorContrasena = validar({
                box: boxContrasena,
                input: inputContrasena,
                label: labelContrasena,
                error: errorContrasena,
                msg: "Este campo es obligatorio."
            })
        }

        if (inputContrasena.value.length < 8) {
            return errorContrasena = validar({
                box: boxContrasena,
                input: inputContrasena,
                label: labelContrasena,
                error: errorContrasena,
                msg: "La contraseña debe tener al menos 8 caracteres."
            })
        }

        if (!expRegContrasena.test(inputContrasena.value)) {
            return errorContrasena = validar({
                box: boxContrasena,
                input: inputContrasena,
                label: labelContrasena,
                error: errorContrasena,
                msg: "La contraseña debe contener al menos una minúscula, una mayúscula, un dígito y un carácter especial."
            })
        }

        return datosCorrectos({
            input: inputContrasena,
            label: labelContrasena,
            error: errorContrasena
        });
    })

    // Evento para validar el campo reContraseña
    inputReContrasena.addEventListener('blur', () => {
        if (inputReContrasena.value.length == 0) {
            return errorReContrasena = validar({
                box: boxReContrasena,
                input: inputReContrasena,
                label: labelReContrasena,
                error: errorReContrasena,
                msg: "Este campo es obligatorio."
            })
        }

        if (inputContrasena.value != inputReContrasena.value) {
            return errorReContrasena = validar({
                box: boxReContrasena,
                input: inputReContrasena,
                label: labelReContrasena,
                error: errorReContrasena,
                msg: "Las contraseñas no coinciden."
            })
        }

        return datosCorrectos({
            input: inputReContrasena,
            label: labelReContrasena,
            error: errorReContrasena
        });
    })


















    // let nombre = document.querySelector("input#nombre");
    // let divNombre = document.querySelector("div.nombre");
    // let divErrorMsgNombre = document.querySelector("div.errorMsg.nombre");

    // let apellido = document.querySelector("input#apellido");
    // let divApellido = document.querySelector("div.apellido");
    // let divErrorMsgApellido = document.querySelector("div.errorMsg.apellido");

    // let email = document.querySelector("input#email");
    // let divEmail = document.querySelector("div.email");
    // let divErrorMsgEmail = document.querySelector("div.errorMsg.email");

    // let contrasena = document.querySelector("input#contrasena");
    // let divContrasena = document.querySelector("div.contrasena");
    // let divErrorMsgContrasena = document.querySelector("div.errorMsg.contrasena");

    // let reContrasena = document.querySelector("input#re-contrasena");
    // let divReContrasena = document.querySelector("div.reContrasena");
    // let divErrorMsgReContrasena = document.querySelector("div.errorMsg.reContrasena");

    // let imagen = document.querySelector("input#img");
    // let divImagen = document.querySelector("div.box-img");
    // let divErrorMsgImagen = document.querySelector("div.errorMsg.img");

    // let form = document.querySelector(".registerForm")


    // /* NOMBRE */
    // nombre.addEventListener('blur', () => {
    //     if (nombre.value.trim().length == 0) {
    //         divNombre.classList.add('errorBox');
    //         divErrorMsgNombre.innerHTML = "Este campo es obligatorio";
    //         divErrorMsgNombre.style.display = "block";
    //     } else if (nombre.value.trim().length < 2) {
    //         divNombre.classList.add('errorBox');
    //         divErrorMsgNombre.innerHTML = "El campo deberá tener al menos 2 caracteres";
    //         divErrorMsgNombre.style.display = "block";
    //     }
    // });

    // nombre.addEventListener('focus', () => {
    //     divNombre.classList.remove('errorBox');
    //     divErrorMsgNombre.style.display = "none"
    // });


    // /* APELLIDO */
    // apellido.addEventListener('blur', () => {
    //     if (apellido.value.trim().length == 0) {
    //         divApellido.classList.add('errorBox');
    //         divErrorMsgApellido.innerHTML = "Este campo es obligatorio";
    //         divErrorMsgApellido.style.display = "block";
    //     } else if (apellido.value.trim().length < 2) {
    //         divApellido.classList.add('errorBox');
    //         divErrorMsgApellido.innerHTML = "El campo deberá tener al menos 2 caracteres";
    //         divErrorMsgApellido.style.display = "block";
    //     }
    // });

    // apellido.addEventListener('focus', () => {
    //     divApellido.classList.remove('errorBox');
    //     divErrorMsgApellido.style.display = "none"
    // });


    // /* EMAIL */
    // email.addEventListener('blur', () => {
    //     if (email.value.trim().length == 0) {
    //         divEmail.classList.add('errorBox');
    //         divErrorMsgEmail.innerHTML = "Este campo es obligatorio";
    //         divErrorMsgEmail.style.display = "block";
    //     } else {
    //         if (!email.validity.valid) {
    //             divErrorMsgEmail.innerHTML = "Introduzca un email valido";
    //             divErrorMsgEmail.style.display = "block";
    //             console.log(email.value);
    //         } else {
    //             divErrorMsgEmail.style.display = "none"
    //         };
    //     }
    // });

    // email.addEventListener('focus', () => {
    //     divEmail.classList.remove('errorBox');
    //     if (email.value.trim().length !== 0 && !email.validity.valid) {
    //         divErrorMsgEmail.innerHTML = "Introduzca un email valido";
    //         divErrorMsgEmail.style.display = "block";
    //     } else {
    //         divErrorMsgEmail.style.display = "none"
    //     }
    // });

    // email.addEventListener('change', () => {
    //     if (!email.validity.valid) {
    //         divErrorMsgEmail.innerHTML = "Introduzca un email valido";
    //         divErrorMsgEmail.style.display = "block";
    //         console.log(email.value);
    //     } else {
    //         divErrorMsgEmail.style.display = "none"
    //     };
    // });


    // /* CONTRASENA */
    // contrasena.addEventListener('blur', () => {
    //     const contrasenaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[=+-_*/¡!¿?()@#$%&^.,:;])(?!\s)[a-zA-Z\d=+-_*/¡!¿?()@#$%&^.,:;]{8,20}$/;
    //     contrasenaRegex.test(contrasena.value);
    //     if (contrasena.value.trim().length == 0) {
    //         divContrasena.classList.add('errorBox');
    //         divErrorMsgContrasena.innerHTML = "Este campo es obligatorio";
    //         divErrorMsgContrasena.style.display = "block";
    //     } else if (contrasena.value.trim().length <= 8 || !contrasenaRegex.test(contrasena.value)) {
    //         divContrasena.classList.add('errorBox');
    //         divErrorMsgContrasena.innerHTML = "El campo deberá tener al menos 8 caracteres con una mayuscula, una minuscula, un digito y un caracter especial";
    //         divErrorMsgContrasena.style.display = "block";
    //     }
    // });

    // contrasena.addEventListener('focus', () => {
    //     divContrasena.classList.remove('errorBox');
    //     divErrorMsgContrasena.style.display = "none"
    // });


    // /* REPETIR CONTRASENA */
    // reContrasena.addEventListener('blur', () => {
    //     if (reContrasena.value.trim().length == 0) {
    //         divReContrasena.classList.add('errorBox');
    //         divErrorMsgReContrasena.innerHTML = "Este campo es obligatorio";
    //         divErrorMsgReContrasena.style.display = "block";
    //     } else if (reContrasena.value.trim().length < 8) {
    //         divReContrasena.classList.add('errorBox');
    //         divErrorMsgReContrasena.innerHTML = "El campo deberá tener al menos 8 caracteres";
    //         divErrorMsgReContrasena.style.display = "block";
    //     }
    // });

    // reContrasena.addEventListener('focus', () => {
    //     divReContrasena.classList.remove('errorBox');
    //     divErrorMsgReContrasena.style.display = "none"
    // });


    // /* IMAGEN */
    // imagen.addEventListener('change', (event) => {
    //     let ExtPermitidas = ["jpeg", "png", "jpg"];
    //     let imagenExt = event.target.files[0].name.split(".").pop().toLowerCase();
    //     if (!ExtPermitidas.includes(imagenExt)) {
    //         divImagen.classList.add('errorBox');
    //         divErrorMsgImagen.innerHTML = `Las extensiones permitidas son ${ExtPermitidas.join(", ")}.`;
    //         divErrorMsgImagen.style.display = "block";
    //     } else {
    //         divImagen.classList.remove('errorBox');
    //         divErrorMsgImagen.style.display = "none"
    //     }
    // })


    // /* BOTON DE CARGA */
    // form.addEventListener('submit', (event) => {
    //     const contrasenaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[=+-_*/¡!¿?()@#$%&^.,:;])(?!\s)[a-zA-Z\d=+-_*/¡!¿?()@#$%&^.,:;]{8,20}$/;
    //     contrasenaRegex.test(contrasena.value);
    //     if (nombre.value.trim().length == 0 || apellido.value.trim().length == 0 || email.value.trim().length == 0 || contrasena.value.trim().length == 0 || !contrasenaRegex.test(contrasena.value) || reContrasena.value.trim().length == 0 || !imagen.value) {
    //         event.preventDefault();
    //         if (nombre.value.trim().length == 0) {
    //             divNombre.classList.add('errorBox');
    //             divErrorMsgNombre.innerHTML = "Este campo es obligatorio";
    //             divErrorMsgNombre.style.display = "block";
    //         };
    //         if (nombre.value.trim().length < 2) {
    //             divNombre.classList.add('errorBox');
    //             divErrorMsgNombre.innerHTML = "El campo deberá tener al menos 2 caracteres";
    //             divErrorMsgNombre.style.display = "block";
    //         };
    //         if (apellido.value.trim().length == 0) {
    //             divApellido.classList.add('errorBox');
    //             divErrorMsgApellido.innerHTML = "Este campo es obligatorio";
    //             divErrorMsgApellido.style.display = "block";
    //         };
    //         if (apellido.value.trim().length < 2) {
    //             divApellido.classList.add('errorBox');
    //             divErrorMsgApellido.innerHTML = "El campo deberá tener al menos 2 caracteres";
    //             divErrorMsgApellido.style.display = "block";
    //         };
    //         if (email.value.trim().length == 0) {
    //             divEmail.classList.add('errorBox');
    //             divErrorMsgEmail.innerHTML = "Este campo es obligatorio";
    //             divErrorMsgEmail.style.display = "block";
    //         };
    //         if (!email.validity.valid) {
    //             divErrorMsgEmail.innerHTML = "Introduzca un email valido";
    //             divErrorMsgEmail.style.display = "block";
    //             console.log(email.value);
    //         };
    //         if (contrasena.value.trim().length == 0) {
    //             divContrasena.classList.add('errorBox');
    //             divErrorMsgContrasena.innerHTML = "Este campo es obligatorio";
    //             divErrorMsgContrasena.style.display = "block";
    //         }
    //         if (contrasena.value.trim().length <= 8 || !contrasenaRegex.test(contrasena.value)) {
    //             divContrasena.classList.add('errorBox');
    //             divErrorMsgContrasena.innerHTML = "El campo deberá tener al menos 8 caracteres con una mayuscula, una minuscula, un digito y un caracter especial";
    //             divErrorMsgContrasena.style.display = "block";
    //         };
    //         if (reContrasena.value.trim().length == 0) {
    //             divReContrasena.classList.add('errorBox');
    //             divErrorMsgReContrasena.innerHTML = "Este campo es obligatorio";
    //             divErrorMsgReContrasena.style.display = "block";
    //         };
    //         if (!imagen.value) {
    //             divImagen.classList.add('errorBox');
    //             divErrorMsgImagen.innerHTML = "Este campo es obligatorio";
    //             divErrorMsgImagen.style.display = "block";
    //         }
    //     }
    // })

});