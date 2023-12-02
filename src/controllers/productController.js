const controller = {
    cart: (req, res) => {
        res.render('products/cart', {});
    },
    detail: (req, res) => {
        res.render('products/detail', {});
    }
}

module.exports = controller