const {
    body,
    validationResult
} = require('express-validator');
const productService = require('../../../services/productService');

const validationProductEditMiddleware = {
    validation: [
        body('nombre')
        .notEmpty().withMessage('El campo nombre es obligatorio.').bail()
        .isLength({
            min: 5
        }).withMessage('Debe tener como mínimo 5 caracteres.'),

        body('precio')
        .notEmpty().withMessage('El campo precio es obligatorio.').bail()
        .isInt({
            min: 0
        }).withMessage('Debe tener un valor mayor a 0'),

        body('descuento')
        .notEmpty().withMessage('El campo descuento es obligatorio.').bail()
        .isInt({
            min: 0,
            max: 100
        }).withMessage('Debe tener un valor entre 0 y 100.'),

        body('id_marca')
        .custom(async (value, {
            req
        }) => {
            const {
                marcas
            } = await productService.getCreateView();
            if (!marcas.find(marca => value == marca.id)) {
                throw new Error('La marca seleccionada no es valida.');
            }
            return true;
        }),

        body('id_color')
        .custom(async (value) => {
            const {
                colores
            } = await productService.getCreateView();
            if (!colores.find(color => value == color.id)) {
                throw new Error('El color seleccionado no es valida.');
            }
            return true;
        })
    ],
    result: async (req, res, next) => {
        const errors = validationResult(req);
        if (errors.array().length) {
            const {
                categorias,
                colores,
                marcas
            } = await productService.getEditView();
            return res.render(`products/productEdit`, {
                errors: errors.array(),
                producto: {
                    ...req.body,
                    id: req.params.id
                },
                cat: categorias,
                col: colores,
                mar: marcas
            });
        }
        next();
    }
}

module.exports = validationProductEditMiddleware;