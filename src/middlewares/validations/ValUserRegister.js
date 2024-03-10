const { body } = require('express-validator');

const path = require('path');

let ValUserRegister = [
    body('nombre')
        .notEmpty().withMessage('Debe completar este campo con su nombre.')
        .isLength({ min: 2}, {max: 100}).withMessage('El campo debe contener entre 2 y 100 caracteres.'),
    body('apellido')
        .notEmpty().withMessage('Debe completar este campo con su apellido.')
        .isLength({ min: 2}, {max: 100}).withMessage('El campo debe contener entre 2 y 100 caracteres.'),
    body('telefono')
        .notEmpty().isMobilePhone().withMessage('Debe completar este campo con un numero de telefono movil.')
        .isLength({max: 10}).withMessage('Maximo permitido: 10 numeros.'),
    body('email')
        .notEmpty().isEmail().withMessage('Debe completar este campo con un email valido.'),
    body('contrasena')
        .notEmpty().withMessage('Este campo no puede quedar vacio.')
        .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}).withMessage('Se deben introducir al menos 8 caracteres, con al menos una miniscula, una mayuscula, un número y un simbolo.'),

    body('imagen').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = [".jpeg, .png, .jpg"];

        if (!file) {
            throw new Error('Debe subir una foto de perfil')
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Los formatos aceptados son ${acceptedExtensions.join(', ')}`)
            }
        }
        
        return true
    })
]

module.exports = ValUserRegister;