window.addEventListener('load', function () {

    let fileBox = document.querySelector('.image');
    let fileInput = document.querySelector("#img");
    let fileInfo = document.querySelector('.file-info');
    let fileList = document.querySelector('.file-info-p');
    let divImages = document.querySelector('.div-images');
    let fileError = document.querySelector('.image .error');


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

    // Valida si los elementos cargados mediante el input de tipo file son correctos
    function validarImg(input) {
        let imagenes = input.files;
        for (const imagen of imagenes) {
            let extension = imagen.name.split('.').pop().toLowerCase();
            let extensionesValidas = ['jpg', 'png', 'jpeg'];
            if (!extensionesValidas.includes(extension)) {
                return `La extensión del archivo ${imagen.name} no está permitida.`;
            }

            let size = imagen.size / (1024 * 1024);
            if (size > 10) {
                return `El tamaño del archivo ${imagen.name} supera los 10Mb.`;
            }
        }

        return null;
    }

    // Funcion que elimina todas las imagenes del contenedor
    function eliminarHijos(div) {
        while (div.firstChild) {
            div.removeChild(div.firstChild)
        }
    }

    // Agrega las imagenes cargadas, si todo está correcto, a la vista previa
    function agregarImagenes(input, list, info, error, div) {
        const imagenes = input.files;
        list.textContent = '';
        for (const imagen of imagenes) {
            list.innerHTML += `● ${imagen.name} <br>`;
            const img = document.createElement('img');
            img.classList.add('images');
            let reader = new FileReader();
            reader.onload = function (event) {
                img.src = event.target.result;
            }
            div.appendChild(img);
            reader.readAsDataURL(imagen);
            if (error) {
                error.style.display = 'none';
            }
            info.classList.add('inp-valid');
            list.classList.add('lbl-valid');
            info.classList.remove('inp-error');
            list.classList.remove('lbl-error');
        }

    }


    // Validacion del input de imagen
    fileInput.addEventListener('change', () => {
        const result = validarImg(fileInput);
        if (result) {
            fileError = validarError(fileBox, fileInfo, fileList, fileError, result);
            fileList.textContent = 'Ningun archivo seleccionado.';
            fileInput.value = '';
            eliminarHijos(divImages);
            return;
        }
        eliminarHijos(divImages);
        agregarImagenes(fileInput, fileList, fileInfo, fileError, divImages);
    });

});