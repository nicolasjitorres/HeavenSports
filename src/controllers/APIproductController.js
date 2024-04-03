const APIproductService = require('../services/APIproductService');

const controller = {
    // Mostrar todos los productos
    index: async (req, res) => {
        try {
            const {
                productos,
                categoria
            } = await APIproductService.getAll();
            let count = {};
            for (cat of categoria) {
                count[cat.nombre] = cat.toJSON().totalProductos;
            }
            return res.status(200).json({
                count: productos.length,
                countByCategory: count,
                products: productos,
            });
        } catch (error) {
            console.log(error);
        }
    },

    // Mostrar detalle de un producto mediante su id
    detail: async (req, res) => {
        try {
            const {
                producto,
                urlImagen
            } = await APIproductService.getByPk(req, req.params.id);

            if (!producto)
                return res.status(404).json({
                    message: 'El producto no exite'
                })

            return res.status(200).json({
                producto: {
                    ...producto.toJSON(),
                    urlImagen
                }
            });
        } catch (error) {
            console.log(error);
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