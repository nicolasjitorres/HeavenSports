import productService from '../services/productService.js';

const controller = {
    index: (req, res) => {
        productService.getAll()
        .then(products => {res.status(200).render('products/products', {
            productos: products
        })})
        .catch(err => {console.log(err);
        })
    },
    inde: async (req, res) => {
        try {
            res.status(200).render('products/products', {
                productos: await productService.getAll()
            });
        } catch (error) {
            console.log(error);
        }
    },
    about: (req, res) => {
        res.render('info/about.ejs', {});
    }
}

export default controller