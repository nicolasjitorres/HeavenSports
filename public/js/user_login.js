window.addEventListener('load', function () {

    let boxEmail = document.querySelector(".email");
    let inpEmail = document.querySelector(".email .inp");
    let lblEmail = document.querySelector(".email .lbl");
    let errorEmail = document.querySelector(".email .error");

    let boxPass = document.querySelector(".pass");
    let inpPass = document.querySelector(".pass .inp");
    let lblPass = document.querySelector(".pass .lbl");
    let errorPass = document.querySelector(".pass .error");

    const expRegEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let form = document.querySelector(".loginForm");

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
    function datosCorrectos({
        input,
        label,
        error
    }) {
        if (error) {
            error.style.display = "none"
        }
        input.classList.add("inp-valid");
        label.classList.add("lbl-valid");
        input.classList.remove("inp-error");
        label.classList.remove("lbl-error");
    }


    /* Validacion email */
    email.addEventListener('blur', () => {
        if (inpEmail.value.trim().length == 0) {
            return errorEmail = validar({
                box: boxEmail,
                input: inpEmail,
                label: lblEmail,
                error: errorEmail,
                msg: "Este campo es obligatorio."
            });
        }

        if (!expRegEmail.test(inpEmail.value)) {
            return errorEmail = validar({
                box: boxEmail,
                input: inpEmail,
                label: lblEmail,
                error: errorEmail,
                msg: "Introduzca un email valido."
            });
        }

        return datosCorrectos({
            input: inpEmail,
            label: lblEmail,
            error: errorEmail
        });

    });


    /* CONTRASENA */
    contrasena.addEventListener('blur', () => {
        if (inpPass.value.trim().length == 0) {
            return errorPass = validar({
                box: boxPass,
                input: inpPass,
                label: lblPass,
                error: errorPass,
                msg: "Este campo es obligatorio"
            })
        }

        return datosCorrectos({
            input: inpPass,
            label: lblPass,
            error: errorPass
        });
    });



    /* BOTON DE CARGA */
    form.addEventListener('submit', (event) => {
        if (inpEmail.value.trim().length == 0 || inpPass.value.trim().length == 0) {
            event.preventDefault();
            if (inpEmail.value.trim().length == 0) {
                errorEmail = validar({
                    box: boxEmail,
                    input: inpEmail,
                    label: lblEmail,
                    error: errorEmail,
                    msg: "Este campo es obligatorio"
                });
            } else if(!expRegEmail.test(inpEmail.value)) {
                errorEmail = validar({
                    box: boxEmail,
                    input: inpEmail,
                    label: lblEmail,
                    error: errorEmail,
                    msg: "Introduzca un email valido."
                });
            }

            if (inpPass.value.trim().length == 0) {
                errorPass = validar({
                    box: boxPass,
                    input: inpPass,
                    label: lblPass,
                    error: errorPass,
                    msg: "Este campo es obligatorio"
                })
            }
        }
    })


});