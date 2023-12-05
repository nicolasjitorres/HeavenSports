const controller = {
    cart: (req, res) => {
        res.render('products/cart', {});
    },
    detail: (req, res) => {
        res.render('products/detail', {});
    },
    formCarga: (req, res) => {
        res.render('products/formCarga', {});
    },
    formEdit: (req, res) => {
        res.render('products/formEdit', {});
    }
}

module.exports = controller