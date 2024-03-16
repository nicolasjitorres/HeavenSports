window.addEventListener('load', function() {

    console.log('Vinculado exitosamente');

    let nombre = document.querySelector("input#nombre");
    let divNombre = document.querySelector("div.nombre");
    let divErrorMsgNombre = document.querySelector("div.errorMsg.nombre");

    let apellido = document.querySelector("input#apellido");
    let divApellido = document.querySelector("div.apellido");
    let divErrorMsgApellido = document.querySelector("div.errorMsg.apellido");

    let email = document.querySelector("input#email");
    let divEmail = document.querySelector("div.email");
    let divErrorMsgEmail = document.querySelector("div.errorMsg.email");

    let contrasena = document.querySelector("input#contrasena");
    let divContrasena = document.querySelector("div.contrasena");
    let divErrorMsgContrasena = document.querySelector("div.errorMsg.contrasena");

    let reContrasena = document.querySelector("input#re-contrasena");
    let divReContrasena = document.querySelector("div.reContrasena");
    let divErrorMsgReContrasena = document.querySelector("div.errorMsg.reContrasena");

    let imagen = document.querySelector("input#img");
    let divImagen = document.querySelector("div.box-img");
    let divErrorMsgImagen = document.querySelector("div.errorMsg.img");

    let form = document.querySelector(".registerForm")


    /* NOMBRE */
    nombre.addEventListener('blur', () => {
        if (nombre.value.trim().length == 0) {
            divNombre.classList.add('errorBox');
            divErrorMsgNombre.innerHTML = "Este campo es obligatorio";
            divErrorMsgNombre.style.display = "block";
        } else if (nombre.value.trim().length < 2) {
            divNombre.classList.add('errorBox');
            divErrorMsgNombre.innerHTML = "El campo deberá tener al menos 2 caracteres";
            divErrorMsgNombre.style.display = "block";
        }
    });

    nombre.addEventListener('focus', () => {
        divNombre.classList.remove('errorBox');
        divErrorMsgNombre.style.display = "none"
    });


    /* APELLIDO */
    apellido.addEventListener('blur', () => {
        if (apellido.value.trim().length == 0) {
            divApellido.classList.add('errorBox');
            divErrorMsgApellido.innerHTML = "Este campo es obligatorio";
            divErrorMsgApellido.style.display = "block";
        } else if (apellido.value.trim().length < 2) {
            divApellido.classList.add('errorBox');
            divErrorMsgApellido.innerHTML = "El campo deberá tener al menos 2 caracteres";
            divErrorMsgApellido.style.display = "block";
        }
    });

    apellido.addEventListener('focus', () => {
        divApellido.classList.remove('errorBox');
        divErrorMsgApellido.style.display = "none"
    });


    /* EMAIL */
    email.addEventListener('blur', () => {
        if (email.value.trim().length == 0) {
            divEmail.classList.add('errorBox');
            divErrorMsgEmail.innerHTML = "Este campo es obligatorio";
            divErrorMsgEmail.style.display = "block";
        } else {
            if (!email.validity.valid) {
                divErrorMsgEmail.innerHTML = "Introduzca un email valido";
                divErrorMsgEmail.style.display = "block";
                console.log(email.value);
            } else {
                divErrorMsgEmail.style.display = "none"
            };
        }
    });

    email.addEventListener('focus', () => {
        divEmail.classList.remove('errorBox');
        if (email.value.trim().length !== 0 && !email.validity.valid) {
            divErrorMsgEmail.innerHTML = "Introduzca un email valido";
            divErrorMsgEmail.style.display = "block";
        } else {
            divErrorMsgEmail.style.display = "none"
        }
    });

    email.addEventListener('change', () => {
            if (!email.validity.valid) {
                divErrorMsgEmail.innerHTML = "Introduzca un email valido";
                divErrorMsgEmail.style.display = "block";
                console.log(email.value);
            } else {
                divErrorMsgEmail.style.display = "none"
            };
    }); 


    /* CONTRASENA */
    contrasena.addEventListener('blur', () => {
        const contrasenaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[=+-_*/¡!¿?()@#$%&^.,:;])(?!\s)[a-zA-Z\d=+-_*/¡!¿?()@#$%&^.,:;]{8,20}$/;
        contrasenaRegex.test(contrasena.value);
        if (contrasena.value.trim().length == 0) {
            divContrasena.classList.add('errorBox');
            divErrorMsgContrasena.innerHTML = "Este campo es obligatorio";
            divErrorMsgContrasena.style.display = "block";
        } else if (contrasena.value.trim().length <= 8 || !contrasenaRegex.test(contrasena.value)) {
            divContrasena.classList.add('errorBox');
            divErrorMsgContrasena.innerHTML = "El campo deberá tener al menos 8 caracteres con una mayuscula, una minuscula, un digito y un caracter especial";
            divErrorMsgContrasena.style.display = "block";
        } 
    });
    
    contrasena.addEventListener('focus', () => {
        divContrasena.classList.remove('errorBox');
        divErrorMsgContrasena.style.display = "none"
    });


    /* REPETIR CONTRASENA */
    reContrasena.addEventListener('blur', () => {
        if (reContrasena.value.trim().length == 0) {
            divReContrasena.classList.add('errorBox');
            divErrorMsgReContrasena.innerHTML = "Este campo es obligatorio";
            divErrorMsgReContrasena.style.display = "block";
        } else if (reContrasena.value.trim().length < 8) {
            divReContrasena.classList.add('errorBox');
            divErrorMsgReContrasena.innerHTML = "El campo deberá tener al menos 8 caracteres";
            divErrorMsgReContrasena.style.display = "block";
        }
    });
    
    reContrasena.addEventListener('focus', () => {
        divReContrasena.classList.remove('errorBox');
        divErrorMsgReContrasena.style.display = "none"
    });


    /* IMAGEN */
    imagen.addEventListener('change', (event) => {
        let ExtPermitidas = ["jpeg", "png", "jpg"];
        let imagenExt = event.target.files[0].name.split(".").pop().toLowerCase();
        if (!ExtPermitidas.includes(imagenExt)) {
            divImagen.classList.add('errorBox');
            divErrorMsgImagen.innerHTML = `Las extensiones permitidas son ${ExtPermitidas.join(", ")}.`;
            divErrorMsgImagen.style.display = "block";
        } else {
            divImagen.classList.remove('errorBox');
            divErrorMsgImagen.style.display = "none"
        }
    })


    /* BOTON DE CARGA */
    form.addEventListener('submit', (event) => {
        const contrasenaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[=+-_*/¡!¿?()@#$%&^.,:;])(?!\s)[a-zA-Z\d=+-_*/¡!¿?()@#$%&^.,:;]{8,20}$/;
        contrasenaRegex.test(contrasena.value);
        if (nombre.value.trim().length == 0 || apellido.value.trim().length == 0 || email.value.trim().length == 0 || contrasena.value.trim().length == 0 || !contrasenaRegex.test(contrasena.value) || reContrasena.value.trim().length == 0 || !imagen.value) {
            event.preventDefault();
            if (nombre.value.trim().length == 0) {
                divNombre.classList.add('errorBox');
                divErrorMsgNombre.innerHTML = "Este campo es obligatorio";
                divErrorMsgNombre.style.display = "block";
            };
            if (apellido.value.trim().length == 0) {
                divApellido.classList.add('errorBox');
                divErrorMsgApellido.innerHTML = "Este campo es obligatorio";
                divErrorMsgApellido.style.display = "block";
            };
            if (email.value.trim().length == 0) {
                divEmail.classList.add('errorBox');
                divErrorMsgEmail.innerHTML = "Este campo es obligatorio";
                divErrorMsgEmail.style.display = "block";
            };
            
            if (contrasena.value.trim().length == 0) {
                divContrasena.classList.add('errorBox');
                divErrorMsgContrasena.innerHTML = "Este campo es obligatorio";
                divErrorMsgContrasena.style.display = "block";
            }
            if (contrasena.value.trim().length <= 8 || !contrasenaRegex.test(contrasena.value)) {
                divContrasena.classList.add('errorBox');
                divErrorMsgContrasena.innerHTML = "El campo deberá tener al menos 8 caracteres con una mayuscula, una minuscula, un digito y un caracter especial";
                divErrorMsgContrasena.style.display = "block";
            };
            if (reContrasena.value.trim().length == 0) {
                divReContrasena.classList.add('errorBox');
                divErrorMsgReContrasena.innerHTML = "Este campo es obligatorio";
                divErrorMsgReContrasena.style.display = "block";
            };
            if (!imagen.value) {
                divImagen.classList.add('errorBox');
                divErrorMsgImagen.innerHTML = "Este campo es obligatorio";
                divErrorMsgImagen.style.display = "block";
            }
        }
    })
    
});

