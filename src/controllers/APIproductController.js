const APIproductService = require('../services/APIproductService');

const controller = {
    // Mostrar todos los productos
    index: async (req, res) => {
        try {
            let limit = 1;
            const {
                productos,
                categoria,
                length
            } = await APIproductService.getAll(req.query, limit);

            if (!productos.length) {
                return res.status(404).json({
                    error: 'Recurso inexistente'
                });
            }

            let count = {};
            for (cat of categoria) {
                count[cat.nombre] = cat.toJSON().totalProductos;
            }

            let links = {};
            if (req.query.page && req.query.page > 0) {
                links.previous = `${req.protocol}://${req.get('host')}/API/products${req.query.page ? '/?page='+ (req.query.page - 1) : '/?page=1'}`;
            }
            if (length > (parseInt(req.query.page) + 1 || 1) * limit) {
                links.next = `${req.protocol}://${req.get('host')}/API/products${req.query.page ? '/?page='+ (1 + parseInt(req.query.page)) : '/?page=1'}`
            }

            return res.status(200).json({
                count: length,
                countByCategory: count,
                products: productos,
                ...links
            });
        } catch (error) {
            console.log(error);
        }
    },

    // Mostrar detalle de un producto mediante su id
    detail: async (req, res) => {
        try {
            let producto = await APIproductService.getByPk(req.params.id);

            if (!producto) {
                return res.status(404).json({
                    message: 'El producto no exite'
                })
            }
            producto = producto.toJSON()
            for (let imagen of producto.imagenes) {
                imagen.url = `${req.protocol}://${req.get('host')}/images/products/${imagen.nombre}`
            }

            return res.status(200).json({
                producto: producto
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Ha ocurrido un error de conexion'
            })
        }
    },

    imagen: async (req, res) => {
        try {
            const producto = await APIproductService.getByPk(req, req.params.id);

            if (!producto)
                return res.status(404).json({
                    message: 'El producto no exite'
                })

            return res.status(200).json({
                urlImagen: producto.urlImagen
            });
        } catch (error) {
            console.log(error.message);
        }
    },

    /*
    imagen: async (req, res) => {
        try {
            const imagen = await APIproductService.getByPkForImag(req, req.params.id);

            if(!imagen) 
                return res.status(404).json({message: 'El producto no exite'})

            //cantImag = producto.imagenes.length
            //console.log(cantImag);
            return res.status(200).json({
                imagen: imagen,
                url: imagen[0].imagen.nombre
                //imagenURL: `${req.protocol}://${req.get('host')}/images/products/${producto.imagenes[0].nombre}`
                /*
                marca: producto.marca,
                categorias: producto.categorias,
                imagenes: producto.imagenes, 
                color: producto.color, 
                talles: producto.talles, 
                
            });

            

        } catch (error) {
            console.log(error);
        }
    },
*/



}

module.exports = controller