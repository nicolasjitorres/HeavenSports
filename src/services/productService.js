const fs = require('fs');
const db = require("../data/models");

const capitalize = (palabra) => {
    return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
}

const productService = {
    products: "",

    getAll: function () {
        return db.Productos.findAll()

        /*
        return this.products;
        */
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
    saveProduct: function (productoEntrante, files) {
        const productoNuevo = new Producto(productoEntrante, files)

        productoNuevo.Nombre = capitalize(productoNuevo.Nombre);
        productoNuevo.Marca = capitalize(productoNuevo.Marca);
        productoNuevo.Descripcion = capitalize(productoNuevo.Descripcion);
        productoNuevo.Precio = capitalize(productoNuevo.Precio);
        productoNuevo.Descuento = capitalize(productoNuevo.Descuento);
        productoNuevo.Color = productoNuevo.Color.split(" ").map(color => capitalize(color));
        productoNuevo.Talle = productoNuevo.Talle.split(" ");
        productoNuevo.Stock = capitalize(productoNuevo.Stock);
        productoNuevo.Categoria = capitalize(productoNuevo.Categoria);
        if (files.length) {
            let imagenes = [];
            for (let i = 0; i < files.length; i++) {
                imagenes.push(files[i].filename);
            }
            productoNuevo.Imagen = imagenes;
        } else {
            productoNuevo.Imagen = ["default.png"];
        }

        db.Productos.create(productoNuevo);

        /*
        let idNuevo = this.products[this.products.length - 1].Id + 1;
        productoNuevo.Id = idNuevo;
        productoNuevo.Nombre = capitalize(productoNuevo.Nombre);
        productoNuevo.Marca = capitalize(productoNuevo.Marca);
        productoNuevo.Descripcion = capitalize(productoNuevo.Descripcion);
        productoNuevo.Precio = parseFloat(productoNuevo.Precio);
        productoNuevo.Descuento = parseFloat(productoNuevo.Descuento);
        productoNuevo.Stock = parseFloat(productoNuevo.Stock);
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
        */
    },
    edit: function (productoEditado, id, files) {
        productoEditado.Id = id;
        productoEditado.Nombre = capitalize(productoEditado.Nombre);
        productoNuevo.Marca = capitalize(productoNuevo.Marca);
        productoEditado.Descripcion = capitalize(productoEditado.Descripcion);
        productoEditado.Precio = parseFloat(productoEditado.Precio);
        productoEditado.Descuento = parseFloat(productoEditado.Descuento);
        productoEditado.Talle = productoEditado.Talle.split(" ");
        productoEditado.Color = productoEditado.Color.split(" ").map(color => capitalize(color));
        productoEditado.Stock = parseFloat(productoEditado.Stock);

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
    },
    delete: function (req) {
        let idAEliminar = this.products.findIndex(producto => producto.id == req.params.id);
        this.products.splice(idAEliminar, 1);
        fs.writeFileSync(productsFilePath, JSON.stringify(this.products), 'utf-8');
    }
}

function Producto({
    Nombre,
    Descripcion,
    Precio,
    Descuento,
    Color,
    Talle,
    Stock,
    Categoria,
    Imagen
}) {
    this.Nombre = Nombre;
    this.Descripcion = Descripcion;
    this.Precio = Precio;
    this.Descuento = Descuento;
    this.Color = Color;
    this.Talle = Talle;
    this.Stock = Stock;
    this.Categoria = Categoria;
    this.Imagen = Imagen;

}

module.exports = productService;