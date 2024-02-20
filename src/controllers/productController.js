const productService = require('../services/productService');

const controller = {
    // Mostrar todos los productos
    index: async (req, res) => {
        try {
            const productos = await productService.getAll();
            res.status(200).render('products/products', {productos: productos});
        } catch (error) {
            console.log(error);
        }
    },
    // Mostrar detalle de un producto mediante su id
    detail: async (req, res) => {
        try {
            const producto = await productService.getByPk(req.params.id);
            res.status(200).render('products/detail', {producto: producto});
        } catch (error) {
            console.log(error);
        }
    },
    cart: (req, res) => {
        res.render('products/cart', {});
    },
    // Muestra el formulario de creacion de un producto
    create: async (req, res) => {
        try {
            const { categorias, colores, marcas, talles } = await productService.getCreateView();
            res.status(200).render('products/create', { cat: categorias, col: colores, mar: marcas, tal: talles});
        } catch (error) {
            console.log(error);
        }
    },
    // Metodo para almacenar el nuevo producto creado
    save: async (req, res) => {
        try {
            const idProducto = await productService.saveProduct(req.body, req.files);
            res.redirect(`/products/detail/${idProducto}`);
        } catch (error) {
            console.log(error);
        }
    },
    // Muestra el formulario de edicion de un producto mediante su id
    edit: async (req, res) => {
        try {
            const { producto, categorias, colores, marcas} = await productService.getEditView(req.params.id);
            res.status(200).render('products/productEdit', { producto: producto, cat: categorias, col: colores, mar: marcas});
        } catch (error) {
            console.log(error);
        }

/*         res.render('products/productEdit', ({
            producto: productService.getOne(req.params.id)
        })); */
    },
    // Metodo para actualizar un determinado producto
    update: async (req, res) => {
        await productService.edit(req.body, req.params.id);
        res.redirect(`/products/detail/${req.params.id}`);
    },
    logicDelete: async(req, res) => {
        try {
            await productService.softDelete(req.params.id);
        } catch (error) {
            console.log(error);
        }

        // productService.softDelete(req);
        // res.redirect('/products')
    }
}

module.exports = controller