const productService = require('../services/productService');

const { validationResult } = require('express-validator')

const controller = {
    // Mostrar todos los productos
    index: async (req, res) => {
        try {
            const productos = await productService.getAll();
            res.status(200).render('products/products', {
                productos: productos
            });
        } catch (error) {
            console.log(error);
        }
    },
    // Mostrar detalle de un producto mediante su id
    detail: async (req, res) => {
        try {
            const producto = await productService.getByPk(req.params.id);
            const talles = producto.talles.filter(talle => talle.ProductoTalle.stock > 0);
            res.status(200).render('products/detail', {
                producto: producto,
                tal: talles
            });
        } catch (error) {
            console.log(error);
        }
    },
    addCart: async (req, res) => {
        try {
            if (!req.session.userLogged) {
                req.session.productCart = {
                    id: req.params.id,
                    data: req.body
                };
                return res.render('users/login');
            }
            const data = await productService.addToCart(req.body, req.params.id, req.session.userLogged.id);
            if (data) {
                res.redirect('/products/cart');
            } else{
                res.redirect(`/products/detail/${req.params.id}`);
            }
        } catch (error) {
            console.log(error.message);
        }
        /* res.render('products/cart', {}); */
    },
    cart: async (req, res) => {
        try {
            const carrito = await productService.getCartView(req.session.userLogged.id);
            // res.send(carrito)
            res.render('products/cart', {carrito: carrito});
        } catch (error) {
            console.log(error.message);
        }
    },
    // Muestra el formulario de creacion de un producto
    create: async (req, res) => {
        try {
            const {
                categorias,
                colores,
                marcas,
                talles
            } = await productService.getCreateView();
            res.status(200).render('products/create', {
                cat: categorias,
                col: colores,
                mar: marcas,
                tal: talles
            });
        } catch (error) {
            console.log(error);
        }
    },
    // Metodo para almacenar el nuevo producto creado
    save: async (req, res) => {
        try {
            let errors = validationResult(req);
            
            if (errors.isEmpty()) {
                const idProducto = await productService.saveProduct(req.body, req.files);
                res.redirect(`/products/detail/${idProducto}`);
            } else {
                res.render('products/create', { 
                    errors: errors.array(),
                    old: req.body 
                })
            }
        } catch (error) {
            console.log(error);
        }
    },
    // Muestra el formulario de edicion de un producto mediante su id
    edit: async (req, res) => {
        try {
            const {
                producto,
                categorias,
                colores,
                marcas
            } = await productService.getEditView(req.params.id);
            res.status(200).render('products/productEdit', {
                producto: producto,
                cat: categorias,
                col: colores,
                mar: marcas
            });
        } catch (error) {
            console.log(error);
        }
    },
    // Metodo para actualizar un determinado producto
    update: async (req, res) => {
        try {
            
            let errors = validationResult(req);
            
            if (errors.isEmpty()) {
                await productService.edit(req.body, req.params.id);
                res.redirect(`/products/detail/${req.params.id}`);
            } else {
                res.render('products/edit/:id', { 
                    errors: errors.array(),
                    old: req.body 
                })
            }
        } catch (error) {
            console.log(error);
        }
    },
    logicDelete: async (req, res) => {
        try {
            await productService.softDelete(req.params.id);
            res.redirect('/products')
        } catch (error) {
            console.log(error);
        }

    },
    relations: async (req, res) => {
        try {
            const producto = await productService.getByPk(req.params.id);
            res.render('products/relations/relations.ejs', {
                producto: producto
            });
        } catch (error) {
            console.log(error);
        }
    },
    getAddImage: async (req, res) => {
        try {
            const producto = await productService.getByPk(req.params.id);
            res.render('products/relations/addImage.ejs', {
                producto: producto
            });
        } catch (error) {
            console.log(error);
        }
    },
    addImage: async (req, res) => {
        try {
            await productService.saveImages(req.params.id, req.files);
            res.redirect(`/products/edit/${req.params.id}/relations`);
        } catch (error) {
            console.log(error);
        }
    },
    deleteImage: async (req, res) => {
        try {
            await productService.destroyImage(req.params.id, req.params.idImagen);
            res.redirect(`/products/edit/${req.params.id}/relations`);
        } catch (error) {
            console.log(error);
        }
    },
    getAddSize: async (req, res) => {
        try {
            const {
                producto,
                tallesNA
            } = await productService.getAddSizeView(req.params.id);
            res.render('products/relations/addSize.ejs', {
                producto: producto,
                tal: tallesNA
            });
        } catch (error) {
            console.log(error);
        }
    },
    addSize: async (req, res) => {
        let errors = validationResult(req);

        try {
            if (errors.isEmpty()) {
                await productService.saveSize(req.params.id, req.body);
                res.redirect(`/products/edit/${req.params.id}/relations`);
            } else {
                const {
                    producto,
                    tallesNA
                } = await productService.getAddSizeView(req.params.id);
                res.render('products/relations/addSize.ejs', {
                    producto: producto,
                    tal: tallesNA,
                    errors: errors.array(),
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
    getEditSize: async (req, res) => {
        try {
            const [prodTal] = await productService.getEditSizeView(req.params)
            res.render('products/relations/editSize.ejs', {
                prodTal: prodTal
            });

        } catch (error) {
            console.log(error);
        }
    },
    editSize: async (req, res) => {
        try {
            await productService.updateSize(req.params, req.body);
            res.redirect(`/products/edit/${req.params.id}/relations`)
        } catch (error) {
            console.log(error);
        }
    },
    deleteSize: async (req, res) => {
        try {
            await productService.destroySize(req.params.id, req.params.idTalle);
            res.redirect(`/products/edit/${req.params.id}/relations`);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = controller