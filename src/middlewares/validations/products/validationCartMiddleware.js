const {
    body,
    validationResult
} = require('express-validator');
const productService = require('../../../services/productService');
const db = require("../../../data/models");

const validationCreateMiddleware = {
    validation: [
        body('id_talle')
        .custom(async (value) => {
            if (value == undefined) {
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

        body('cantidad_producto')
        .notEmpty().withMessage('El campo es obligatorio.').bail()
        .isInt({
            min: 0
        }).withMessage('Debe tener un valor mayor a 0')
        .custom(async (value, {
            req
        }) => {
            const productoTalle = await db.ProductoTalle.findOne({
                where: {
                    id_producto: req.params.id,
                    id_talle: req.body.id_talle
                }
            });
            if (value > productoTalle.stock) {
                throw new Error('La cantidad debe ser menor o igual al stock disponible del producto.')
            }
        })
    ],
    result: async (req, res, next) => {
        const errors = validationResult(req);
        if (errors.array().length) {
            const producto = await productService.getByPk(req.params.id);
            const talles = producto.talles.filter(talle => talle.ProductoTalle.stock > 0);
            res.status(200).render('products/detail', {
                producto: producto,
                tal: talles,
                errors: errors.array()
            });
        }
        next();
    }
}

module.exports = validationCreateMiddleware;