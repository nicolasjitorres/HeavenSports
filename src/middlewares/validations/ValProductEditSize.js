const { body } = require('express-validator');

const path = require('path');

let ValProductEditSize = [
    body('id_talle')
        .notEmpty().withMessage('Se debe escoger un talle del listado.'),
    body('stock')
        .notEmpty().withMessage('Ingresar un numero para indicar el Stock de este producto.')
        .isInt().withMessage('Se debe ingresar un numero entero'),
]

module.exports = ValProductEditSize;