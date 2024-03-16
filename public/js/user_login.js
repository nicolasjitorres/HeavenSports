window.addEventListener('load', function() {

    console.log('Vinculado exitosamente');

    let email = document.querySelector("input#email");
    let divEmail = document.querySelector("div.email");
    let divErrorMsgEmail = document.querySelector("div.errorMsg.email");

    let contrasena = document.querySelector("input#contrasena");
    let divContrasena = document.querySelector("div.contrasena");
    let divErrorMsgContrasena = document.querySelector("div.errorMsg.contrasena");

    email.addEventListener('blur', () => {
        if (email.value.trim().length == 0) {
            divEmail.classList.add('errorBox');
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
        /*if (email.value.trim().length == 0) {
            console.log(email.value);
            divEmail.classList.add('errorBox');
            divErrorMsgEmail.innerHTML = "Este campo es obligatorio";

            divErrorMsgEmail.style.display = "block";
        } else */if (email.value.trim().length !== 0 && !email.validity.valid) {
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

    contrasena.addEventListener('blur', () => {
        if (contrasena.value.trim().length == 0) {
            divContrasena.classList.add('errorBox');
            divErrorMsgContrasena.style.display = "block";
        }
    });

    
    contrasena.addEventListener('focus', () => {
        divContrasena.classList.remove('errorBox');
        divErrorMsgContrasena.style.display = "none"
        /*
        if (contrasena.value.trim().length == 0) {
            divContrasena.classList.add('errorBox');
            divErrorMsgContrasena.innerHTML = "Este campo es obligatorio";
            divErrorMsgContrasena.style.display = "block";
        } else {
            divErrorMsgContrasena.style.display = "none"
        };*/
    });
    
});

