const { body } = require('express-validator');

const path = require('path');

let ValProductCreateEdit = [
    body('nombre')
        .notEmpty().withMessage('Se debe completar este campo con el nombre del producto.')
        .isLength({ min: 5}, {max: 100}).withMessage('El nombre debe contener entre 5 y 100 caracteres.'),
    body('descripcion')
        .notEmpty().withMessage('Se debe completar este campo con la descripcion del producto.')
        .isLength({ min: 20}, {max: 200}).withMessage('La descripción debe contener entre 20 y 200 caracteres.'),
    body('precio')
        .notEmpty().withMessage('Se debe completar este campo el precio del producto.')
        .isDecimal().withMessage('Se debe ingresar un numero decimal.'),
    body('descuento')
        .notEmpty().withMessage('Si no se aplica descuento, completar con "0".')
        .isInt().withMessage('Se debe ingresar un numero entero.'),
    body('id_marca')
        .notEmpty().withMessage('Se debe escoger una marca del listado.'),
    body('id_color')
        .notEmpty().withMessage('Se debe escoger un color del listado.'),
    body('id_talle')
        .notEmpty().withMessage('Se debe escoger un talle del listado.'),
    body('stock')
        .notEmpty().withMessage('Ingresar un numero para indicar el Stock de este producto.')
        .isInt().withMessage('Se debe ingresar un numero entero.'),
    body('categorias')
        .notEmpty().withMessage('Se debe escoger una categoria.'),

    body('imagenes').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = [".jpg, .png"];

        if (!file) {
            throw new Error('Se debe subir al menos una imagen')
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Los formatos aceptados son ${acceptedExtensions.join(', ')}`)
            }
        }
        
        return true
    })
]

module.exports = ValProductCreateEdit;