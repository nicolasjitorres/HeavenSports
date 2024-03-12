const {
    body,
    validationResult
} = require('express-validator');
const productService = require('../../../services/productService');

const validationEditSizeMiddleware = {
    validation: [
        body('stock')
        .notEmpty().withMessage('El campo stock es obligatorio.').bail()
        .isInt({
            min: 0
        }).withMessage('Debe tener un valor mayor a 0')
    ],
    result: async (req, res, next) => {
        const errors = validationResult(req);
        console.log(errors);
        if (errors.array().length) {
            const [prodTal] = await productService.getEditSizeView(req.params);
            return res.render(`products/relations/editSize`, {
                errors: errors.array(),
                prodTal: {
                    ...prodTal,
                    stock: req.body.stock
                }
            });
        }
        next();
    }
}

module.exports = validationEditSizeMiddleware;