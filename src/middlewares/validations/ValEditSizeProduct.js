const { body } = require('express-validator');

const path = require('path');

let ValEditSizeProduct = [
    body('stock')
        .notEmpty().withMessage('Ingresar un numero para indicar el Stock de este producto.')
        .isInt().withMessage('Se debe ingresar un numero entero'),
]

module.exports = ValEditSizeProduct;