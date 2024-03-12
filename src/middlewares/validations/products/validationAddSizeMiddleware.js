const {
    body,
    validationResult
} = require('express-validator');
const productService = require('../../../services/productService');

const validationAddSizeMiddleware = {
    validation: [
        body('id_talle')
        .custom(async (value, {
            req
        }) => {
            if (value == '- Seleccione el talle -') {
                throw new Error('Debe seleccionar un talle.');
            }
            const {
                talles
            } = await productService.getCreateView();
            if (!talles.find(talle => value == talle.id)) {
                throw new Error('El talle seleccionado no es valido.');
            }
            return true;
        }),
        body('stock')
        .notEmpty().withMessage('El campo stock es obligatorio.').bail()
        .isInt({
            min: 0
        }).withMessage('Debe tener un valor mayor a 0')
    ],
    result: async (req, res, next) => {
        const errors = validationResult(req);
        if (errors.array().length) {
            const {
                tallesNA
            } = await productService.getAddSizeView(req.params.id);
            return res.render(`products/relations/addSize`, {
                errors: errors.array(),
                producto: {
                    ...req.body,
                    id: req.params.id
                },
                tal: tallesNA
            });
        }
        next();
    }
}

module.exports = validationAddSizeMiddleware;