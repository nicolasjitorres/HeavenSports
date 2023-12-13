const fs = require('fs');
const path = require('path');
const productService = require('../data/productService');

const controller = {
    index: (req, res) => {
        res.render('info/index.ejs', {productos: productService.getAll()});
    },
    about: (req, res) => {
        res.render('info/about.ejs', {});
    }
}

module.exports = controller