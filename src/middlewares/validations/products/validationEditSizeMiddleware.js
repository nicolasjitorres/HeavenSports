import {
    body,
    validationResult
} from 'express-validator';
import productService from '../../../services/productService.js';

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

export default validationEditSizeMiddleware;