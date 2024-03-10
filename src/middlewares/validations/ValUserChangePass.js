const { body } = require('express-validator');

const path = require('path');

let ValUserChangePass = [
    body('contrasena')
        .notEmpty().withMessage('Este campo no puede quedar vacio.')
        .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}).withMessage('Se deben introducir al menos 8 caracteres, con al menos una miniscula, una mayuscula, un número y un simbolo.'),

]

module.exports = ValUserChangePass;