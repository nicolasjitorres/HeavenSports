window.addEventListener('load', function () {

    let boxEmail = document.querySelector(".email");
    let inpEmail = document.querySelector(".email .inp");
    let lblEmail = document.querySelector(".email .lbl");
    let errorEmail = document.querySelector(".email .error");

    let boxPass = document.querySelector(".pass");
    let inpPass = document.querySelector(".pass .inp");
    let lblPass = document.querySelector(".pass .lbl");
    let errorPass = document.querySelector(".pass .error");

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

    /* EMAIL */
    email.addEventListener('blur', () => {
        if (inpEmail.value.trim().length == 0) {
            errorEmail = validar({
                box: boxEmail,
                input: inpEmail,
                label: lblEmail,
                error: errorEmail,
                msg: "Este campo es obligatorio"
            });
        } else {
            if (!inpEmail.validity.valid) {
                errorEmail = validar({
                    box: boxEmail,
                    input: inpEmail,
                    label: lblEmail,
                    error: errorEmail,
                    msg: "Introduzca un email valido"
                });
            } else {
                errorEmail.style.display = "none"
                inpEmail.classList.add("inp-valid");
                lblEmail.classList.add("lbl-valid");
                inpEmail.classList.remove("inp-error");
                lblEmail.classList.remove("lbl-error");
            };
        }
    });


    /* CONTRASENA */
    contrasena.addEventListener('blur', () => {
        if (inpPass.value.trim().length == 0) {
            errorPass = validar({
                box: boxPass,
                input: inpPass,
                label: lblPass,
                error: errorPass,
                msg: "Este campo es obligatorio"
            })
        } else {
            errorPass.style.display = "none"
            inpPass.classList.add("inp-valid");
            lblPass.classList.add("lbl-valid");
            inpPass.classList.remove("inp-error");
            lblPass.classList.remove("lbl-error");
        }
    });


    contrasena.addEventListener('focus', () => {
        divContrasena.classList.remove('errorBox');
        divErrorMsgContrasena.style.display = "none"
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