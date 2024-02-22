const path = require('path');
const fs = require('fs');
const db = require("../data/models");

// Funcion que recibe una palabra sin importar como está escrita y la retorna capitalizada (ejemplo: hOlA => Hola)
const capitalize = (palabra) => {
    return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
}

const productService = {
    // Retorna todos los productos
    getAll: async function () {
        try {
            return await db.Producto.findAll({
                include: ['marca', 'categorias', 'imagenes', 'color', 'talles'],
                where: {
                    active: true
                }
            });
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    // Retorna un producto en base a su id
    getByPk: async function (id) {
        try {
            return await db.Producto.findByPk(id, {
                include: ['marca', 'categorias', 'imagenes', 'color', 'talles']
            });
        } catch (error) {
            console.log(error);
            return {};
        }


    },
    getAddSizeView: async function () {
        try {
            return await db.Talle.findAll();
        } catch (error) {
            console.log(error);
        }
    },
    // Retorna los registros de los modelos que se relacionan con Producto para mostrarlos en la vista
    getCreateView: async function () {
        try {
            const categorias = await db.Categoria.findAll();
            const colores = await db.Color.findAll();
            const marcas = await db.Marca.findAll();
            const talles = await db.Talle.findAll();
            return {
                categorias,
                colores,
                marcas,
                talles
            }
        } catch (error) {
            console.log(error);
            return {};
        }

    },
    // Guarda en la base de datos el nuevo producto
    saveProduct: async function (data, files) {
        try {
            const newProducto = new Producto(data);
            // Cargando el nuevo producto en la BD, y obtenemos su id
            const {
                id
            } = await db.Producto.create(newProducto);

            // Cargamos las relaciones producto-categoria
            for (const id_categoria of data.categorias) {
                const newProductoCategoria = new ProductoCategoria(id, id_categoria);
                await db.ProductoCategoria.create(newProductoCategoria);
            }

            // Cargamos la relacion producto-talle
            // NOTA: solo podemos cargar un talle a la vez
            const newProductoTalle = new ProductoTalle(id, data.id_talle, data.stock);
            await db.ProductoTalle.create(newProductoTalle);

            // Carga de imagenes
            this.saveImages(id, files);

            return id;
        } catch (error) {
            console.log(error);
        }

    },
    saveImages: async function (id, files) {
        // Carga de imagenes
        try {
            if (files) {
                for (const file of files) {
                    const newImagen = new Imagen(file.filename);
                    const imagen = await db.Imagen.create(newImagen);
                    const newProductoImagen = new ProductoImagen(id, imagen.id);
                    await db.ProductoImagen.create(newProductoImagen);
                }
            }
        } catch (error) {
            console.log(error);
        }
    },
    destroyImage: async function (id, idImagen) {
        try {
            const {nombre} = await db.Imagen.findByPk(idImagen);
            const rutaDirectorio = '../../public/images/products';
            const rutaImagen = path.join(__dirname, rutaDirectorio, nombre)

            if (fs.existsSync(rutaImagen)) {
                fs.unlinkSync(rutaImagen);
                console.log(`Imagen ${nombre} eliminada correctamente`);
            } else {
                console.log(`La imagen ${nombre} no existe en el directorio`);
            }

            await db.ProductoImagen.destroy({
                where: {
                    id_producto: id,
                    id_imagen: idImagen
                }
            });

            await db.Imagen.destroy({
                where: {
                    id: idImagen
                }
            });

            console.log('Eliminado correctamente de la BD');

        } catch (error) {
            console.log(error);
        }
    },
    // Retorna los registros de los modelos que se relacionan con Producto para mostrarlos en la vista
    getEditView: async function (id) {
        try {
            const producto = await this.getByPk(id);
            const categorias = await db.Categoria.findAll();
            const colores = await db.Color.findAll();
            const marcas = await db.Marca.findAll();
            return {
                producto,
                categorias,
                colores,
                marcas
            }
        } catch (error) {
            console.log(error);
            return {};
        }

    },
    edit: async function (data, id) {
        try {
            const newProduct = new Producto(data);
            await db.Producto.update(newProduct, {
                where: {
                    id: id
                }
            });

            for (cat of data.categorias) {
                if (!data.categoriasViejas.includes(cat)) {
                    const newProductoCategoria = new ProductoCategoria(id, cat)
                    await db.ProductoCategoria.create(newProductoCategoria);
                }
            }

            for (catVieja of data.categoriasViejas) {
                if (!data.categorias.includes(catVieja)) {
                    await db.ProductoCategoria.destroy({
                        where: {
                            id_producto: id,
                            id_categoria: catVieja
                        }
                    })
                }
            }
        } catch (error) {
            console.log(error);
        }
    },
    softDelete: async function (id) {
        try {
            await db.Producto.update({
                active: false
            }, {
                where: {
                    id: id
                }
            });
            console.log("producto eliminado con exito");
        } catch (error) {
            console.log(error);
        }
    }
}


// Constructor de Producto
function Producto({
    nombre,
    descripcion,
    precio,
    descuento,
    id_color,
    id_marca
}) {
    this.nombre = nombre,
        this.descripcion = descripcion,
        this.precio = precio,
        this.descuento = descuento,
        this.id_color = id_color,
        this.id_marca = id_marca
}

// Constructor de ProductoCategoria
function ProductoCategoria(id_producto, id_categoria) {
    this.id_producto = id_producto,
        this.id_categoria = id_categoria
}

// Constructor de ProductoTalle
function ProductoTalle(id_producto, id_talle, stock) {
    this.id_producto = id_producto,
        this.id_talle = id_talle,
        this.stock = stock
}

// Constructor de Imagen
function Imagen(filename) {
    this.nombre = filename
}

// Constructor de ProductoImagen
function ProductoImagen(id_producto, id_imagen) {
    this.id_producto = id_producto,
        this.id_imagen = id_imagen
}


module.exports = productService;