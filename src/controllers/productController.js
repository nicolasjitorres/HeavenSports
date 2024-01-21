const productService = require('../data/productService');


const controller = {
    // Mostrar todos los productos
    index: (req, res) => {
		res.render('products/products', ({
			productos: productService.getAll()
		}));
	},
    // Mostrar detalle producto por ID
    detail: (req, res) => {
		res.render('products/detail', ({
			producto: productService.getOne(req.params.id)
		}));
	},
    cart: (req, res) => {
        res.render('products/cart', {});
    },
    create: (req, res) => {
        res.render('products/create');
    },
    save: (req, res) => {
        productService.saveProduct(req.body, req.files);
		res.redirect('/products');
    },
    edit: (req, res) => {
        res.render('products/productEdit', ({
			producto: productService.getOne(req.params.id)
		}));
    },
    update: (req, res) => {
        productService.edit(req.body, req.params.id, req.files);
        res.redirect('/products/'+ req.params.id + "/detail");
    },
    destroy: (req, res) => {
		productService.delete(req);
		res.redirect('/products')
	}
}

module.exports = controller