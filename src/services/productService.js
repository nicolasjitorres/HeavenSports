const path = require('path');
const fs = require('fs');
const db = require("../data/models");

// Funcion que recibe una palabra sin importar como está escrita y la retorna capitalizada (ejemplo: hOlA => Hola)
const capitalize = (palabra) => {
    return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
}

const productService = {
    addToCart: async function (data, idProd, idUser) {
        try {
            const productoTalle = await db.ProductoTalle.findOne({
                where: {
                    id_producto: idProd,
                    id_talle: data.id_talle
                }
            });
            if (productoTalle.stock >= data.cantidad_producto) {
                const carrito = await db.Carrito.findOne({
                    where: {
                        id_usuario: idUser
                    }
                });
                const carritoProductoTalle = await db.CarritoProductoTalle.findOne({
                    where: {
                        id_carrito: carrito.id,
                        id_producto_talle: productoTalle.id
                    }
                });
                if (carritoProductoTalle) {
                    console.log(data);
                    let newCantidad = carritoProductoTalle.cantidad_producto + parseInt(data.cantidad_producto);
                    await db.CarritoProductoTalle.update({
                        cantidad_producto: newCantidad
                    }, {
                        where: {
                            id: carritoProductoTalle.id
                        }
                    });
                } else {
                    const newCarritoProductoTalle = new CarritoProductoTalle(carrito.id, productoTalle.id, data.cantidad_producto);
                    await db.CarritoProductoTalle.create(newCarritoProductoTalle);
                }
                let newStock = productoTalle.stock - data.cantidad_producto;
                await db.ProductoTalle.update({
                    stock: newStock
                }, {
                    where: {
                        id: productoTalle.id
                    }
                });
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error.message);
        }
    },
    addCartOne: async function (data) {
        try {
            const PT = await db.ProductoTalle.findOne({
                where: {
                    id: data.idProductoTalle
                }
            });
            if (PT.stock > 0) {
                let newStock = PT.stock - 1;
                await db.ProductoTalle.update({
                    stock: newStock
                }, {
                    where: {
                        id: data.idProductoTalle
                    }
                });
    
                const CPT = await db.CarritoProductoTalle.findOne({
                    where: {
                        id: data.idCarritoProductoTalle
                    }
                });
    
                let newCantidad = CPT.cantidad_producto + 1;
    
                await db.CarritoProductoTalle.update({
                    cantidad_producto: newCantidad
                }, {
                    where: {
                        id: data.idCarritoProductoTalle
                    }
                });
            }
        } catch (error) {
            return null;
        }
    },
    removeCartOne: async function (data) {
        try {
            const PT = await db.ProductoTalle.findOne({
                where: {
                    id: data.idProductoTalle
                }
            });
    
            let newStock = PT.stock + 1;
            await db.ProductoTalle.update({
                stock: newStock
            }, {
                where: {
                    id: data.idProductoTalle
                }
            });
    
            const CPT = await db.CarritoProductoTalle.findOne({
                where: {
                    id: data.idCarritoProductoTalle
                }
            });
    
            if (CPT.cantidad_producto > 1) {
                let newCantidad = CPT.cantidad_producto - 1;
                await db.CarritoProductoTalle.update({
                    cantidad_producto: newCantidad
                }, {
                    where: {
                        id: data.idCarritoProductoTalle
                    }
                });
            }
        } catch (error) {
            return null;
        }
    },
    deleteCartOne: async function (data) {
        try {
            const PT = await db.ProductoTalle.findOne({
                where: {
                    id: data.idProductoTalle
                }
            });
    
            const CPT = await db.CarritoProductoTalle.findOne({
                where: {
                    id: data.idCarritoProductoTalle
                }
            });
    
            let newStock = PT.stock + parseInt(CPT.cantidad_producto);
            await db.ProductoTalle.update({
                stock: newStock
            }, {
                where: {
                    id: data.idProductoTalle
                }
            });

            await db.CarritoProductoTalle.destroy({
                where: {
                    id: data.idCarritoProductoTalle
                }
            });
        } catch (error) {
            return null;
        }
    },
    // Retorna todos los productos
    getAll: async function () {
        try {
            return await db.Producto.findAll({
                include: ['marca', 'categorias', 'imagenes', 'color', 'talles'],
                where: {
                    active: true
                }
            })
        } catch (error) {
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
    // Retorna el producto y todos aquellos talles que no tienen relación alguna con el producto
    getAddSizeView: async function (id) {
        try {
            const producto = await this.getByPk(id);

            // Aqui se obtiene un array con todos los talles que se relacionan con el producto
            const tallesProd = await producto.getTalles();

            // Aqui lo que se hace es transformar el arreglo de objetos en un
            // arreglo de ids de los talles asociados al producto
            const tallesAsociados = tallesProd.map(talle => talle.id);

            // Por ultimo realizamos la busqueda de todos aquellos talles que
            // no tienen relacion alguna con el producto
            const tallesNA = await db.Talle.findAll({
                where: {
                    id: {
                        [db.Sequelize.Op.notIn]: tallesAsociados
                    }
                }
            });

            // Se retorna tanto el producto como los talles
            return {
                producto,
                tallesNA
            };
        } catch (error) {
            console.log(error);
        }
    },
    getEditSizeView: async function (params) {
        try {
            return prodTal = await db.ProductoTalle.findAll({
                include: ['producto', 'talle'],
                where: {
                    id_producto: params.id,
                    id_talle: params.idTalle
                }
            });
        } catch (error) {
            console.log(error);
        }
    },
    updateSize: async function (params, data) {
        try {
            await db.ProductoTalle.update({
                stock: data.stock
            }, {
                where: {
                    id_producto: params.id,
                    id_talle: params.idTalle
                }
            });
        } catch (error) {
            console.log(error);
        }
    },
    getCartView: async function (id) {
        try {
            return await db.Carrito.findOne({
                where: {
                    id_usuario: id
                },
                include: [{
                    model: db.ProductoTalle,
                    as: 'productosTalles',
                    include: [{
                        model: db.Producto,
                        as: 'producto',
                        include: [{
                            model: db.Imagen,
                            as: 'imagenes'
                        }]
                    }, 'talle']
                }]
            });
        } catch (error) {
            console.log(error.message);
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
            this.saveSize(id, data)

            // Carga de imagenes
            this.saveImages(id, files);

            return id;
        } catch (error) {
            return null;
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
    saveSize: async function (id, data) {
        try {
            // Cargamos la relacion producto-talle
            // NOTA: solo podemos cargar un talle a la vez
            const newProductoTalle = new ProductoTalle(id, data.id_talle, data.stock);
            await db.ProductoTalle.create(newProductoTalle);
        } catch (error) {
            console.log(error);
        }
    },
    destroyImage: async function (id, idImagen) {
        try {
            const {
                nombre
            } = await db.Imagen.findByPk(idImagen);
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
    destroySize: async function (id, idTalle) {
        try {
            await db.ProductoTalle.destroy({
                where: {
                    id_producto: id,
                    id_talle: idTalle
                }
            });

            console.log('Relacion entre el producto y talle eliminada correctamente');

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

            let categorias = data.categorias;
            let categoriasViejas = data.categoriasViejas;
            if (!categorias) {
                categorias = [];
            }
            if (!categoriasViejas) {
                categoriasViejas = [];
            }

            for (cat of categorias) {
                if (!categoriasViejas.includes(cat)) {
                    const newProductoCategoria = new ProductoCategoria(id, cat)
                    await db.ProductoCategoria.create(newProductoCategoria);
                }
            }

            for (catVieja of categoriasViejas) {
                if (!categorias.includes(catVieja)) {
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
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.descuento = descuento;
    this.active = true;
    this.id_color = id_color;
    this.id_marca = id_marca;
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

// Constructor de CarritoProductoTalle
function CarritoProductoTalle(id_carrito, id_producto_talle, cantidad_producto) {
    this.id_carrito = id_carrito,
        this.id_producto_talle = id_producto_talle,
        this.cantidad_producto = cantidad_producto
}


module.exports = productService;