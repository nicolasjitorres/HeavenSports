window.addEventListener('load', function() {

    console.log('Vinculado exitosamente');

    let email = document.querySelector("input#email");
    let divEmail = document.querySelector("div.email");
    let divErrorMsgEmail = document.querySelector("div.errorMsg.email");

    console.log(divErrorMsgEmail);

    email.addEventListener('blur', () => {
        if (!email.value) {
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
        if (!email.value) {
            divEmail.classList.add('errorBox');
            divErrorMsgEmail.innerHTML = "Este campo es obligatorio";

            divErrorMsgEmail.style.display = "block";
        } else if (!email.validity.valid) {
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

/*********/
/*
    email.addEventListener('focus', () => {
        if (!email.validity.valid) {
            divErrorMsgEmail.innerHTML = "Introduzca al menos 8 caracteres";
            divErrorMsgEmail.style.display = "block";
        } else {
            divErrorMsgEmail.innerHTML = "sdwedwes";

            divErrorMsgEmail.style.display = "none"
        }
    });
    
*/

});

