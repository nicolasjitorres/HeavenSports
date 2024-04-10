const productService = require('../services/productService');

const controller = {
    index: async (req, res) => {
        try {
            const {
                productos,
                categorias
            } = await productService.getIndex();
            res.status(200).render('info/index', {
                ultimosProductos: productos.slice(-3),
                mejoresOfertas: productos.filter(p => p.descuento > 0).sort((a, b) => b.descuento - a.descuento).slice(-3),
                categorias
            });
        } catch (error) {
            res.status(404).redirect('/info/error');
        }
    },
    about: (req, res) => {
        res.render('info/about.ejs', {});
    }
}

module.exports = controller