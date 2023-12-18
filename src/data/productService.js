const path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, './productDatabase.json');

const capitalize = (palabra) => {
    return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
}


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
    },
    saveProduct: function (productoNuevo, files) {
        let idNuevo = this.products[this.products.length - 1].Id + 1;
        productoNuevo.Id = idNuevo;
        productoNuevo.Nombre = capitalize(productoNuevo.Nombre);
        productoNuevo.Descripcion = capitalize(productoNuevo.Descripcion);
        productoNuevo.Precio = parseFloat(productoNuevo.Precio);
        productoNuevo.Descuento = parseFloat(productoNuevo.Descuento);
        if (files.length) {
            let imagenes = [];
            for (let i = 0; i < files.length; i++) {
                imagenes.push(files[i].filename);
            }
            productoNuevo.Imagen = imagenes;
        } else {
            productoNuevo.Imagen = ["default.png"];
        }
        productoNuevo.Talle = productoNuevo.Talle.split(" ");
        productoNuevo.Color = productoNuevo.Color.split(" ").map(color => capitalize(color));



        this.products.push(productoNuevo);
        fs.writeFileSync(productsFilePath, JSON.stringify(this.products), 'utf-8');
    },
    edit: function (productoEditado, id, files) {
        productoEditado.Id = id;
        productoEditado.Nombre = capitalize(productoEditado.Nombre);
        productoEditado.Descripcion = capitalize(productoEditado.Descripcion);
        productoEditado.Precio = parseFloat(productoEditado.Precio);
        productoEditado.Descuento = parseFloat(productoEditado.Descuento);
        productoEditado.Talle = productoEditado.Talle.split(" ");
        productoEditado.Color = productoEditado.Color.split(" ").map(color => capitalize(color));

        let indiceProducto = this.products.findIndex(producto => producto.Id == id);
        if (files.length) {
            let imagenes = [];
            for (let i = 0; i < files.length; i++) {
                imagenes.push(files[i].filename);
            }
            productoEditado.Imagen = imagenes;
        } else {
            productoEditado.Imagen = this.products[indiceProducto].Imagen;
        }
        this.products[indiceProducto] = productoEditado;

        fs.writeFileSync(productsFilePath, JSON.stringify(this.products), 'utf-8');
    }
}

module.exports = productService;