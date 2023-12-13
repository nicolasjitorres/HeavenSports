const fs = require('fs');
const path = require('path');
const productService = require('../data/productService');

const productsFilePath = path.join(__dirname, '../data/productDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controller = {
    // Mostrar todos los productos
    index: (req, res) => {
		res.render('products', ({
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
    formCarga: (req, res) => {
        res.render('products/formCarga', {});
    },
    formEdit: (req, res) => {
        res.render('products/formEdit', {});
    }
}

module.exports = controller