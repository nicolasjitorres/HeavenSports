const { body } = require('express-validator');

const path = require('path');

let ValUserLogin = [
    body('email')
        .notEmpty().isEmail().withMessage('Debe completar este campo con su email.'),
    body('contrasena')
        .notEmpty().withMessage('Ingrese su contraseña.'),

]

module.exports = ValUserLogin;