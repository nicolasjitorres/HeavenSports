const path = require('path');

const controller = {
    cart: (req, res) => {
        res.render('products/cart', {});
    },
    detail: (req, res) => {
        res.render('products/detail', {});
    },
    formCarga: (req, res) => {
        res.render('products/formCarga', {});
    }
}

module.exports = controller