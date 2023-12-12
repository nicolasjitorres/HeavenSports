const path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../data/productDatabase.json');

const productService = {
    products: JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')),

    getAll: function () {
        return this.products;
    },

    getOne: function (Id) {
        let producto = {};
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].Id == Id) {
                producto = this.products[i];
            }
        }
        return producto;
    }
}

module.exports = productService;