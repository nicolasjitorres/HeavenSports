
const productService = require('../services/productService');

const controller = {
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
    about: (req, res) => {
        res.render('info/about.ejs', {});
    }
}

module.exports = controller