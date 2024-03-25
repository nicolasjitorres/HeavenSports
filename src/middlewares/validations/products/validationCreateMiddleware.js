const {
    body,
    validationResult
} = require('express-validator');
const productService = require('../../../services/productService');

const validationCreateMiddleware = {
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
        .custom(async (value) => {
            if (value == undefined) {
                throw new Error('Debe seleccionar una marca.');
            }
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
            if (value == undefined) {
                throw new Error('Debe seleccionar un color.');
            }
            const {
                colores
            } = await productService.getCreateView();
            if (!colores.find(color => value == color.id)) {
                throw new Error('El color seleccionado no es valida.');
            }
            return true;
        }),

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

        body('stock')
        .notEmpty().withMessage('El campo stock es obligatorio.').bail()
        .isInt({
            min: 0
        }).withMessage('Debe tener un valor mayor a 0'),

        body('categorias')
        .custom(async (cats) => {
            const {
                categorias
            } = await productService.getCreateView();
            cats.forEach(cat => {
                if (!categorias.find(categoria => cat == categoria.id)) {
                    throw new Error('La categoria no es valida.');
                }
            });
            return true;
        }),

        body('imagenes')
        .custom((value, {
            req
        }) => {
            if (req.files) {
                const extensionesValidas = ['jpg', 'png', 'jpeg'];
                for (const image of req.files) {
                    if (!extensionesValidas.includes(image.mimetype.split('/').pop())) {
                        throw new Error(`La imagen ${image.filename} tiene una extensión inválida.`);
                    }
                    const size = image.size / (1024 * 1024);
                    if(size > 10){
                        throw new Error(`La imagen ${image.filename} tiene un peso mayor a 10Mb.`);
                    }
                }
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
                marcas,
                talles
            } = await productService.getCreateView();
            return res.render('products/create', {
                errors: errors.array(),
                product: req.body,
                cat: categorias,
                col: colores,
                mar: marcas,
                tal: talles
            });
        }
        next();
    }
}

module.exports = validationCreateMiddleware;