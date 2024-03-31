const APIproductService = require('../services/APIproductService');

const controller = {
    // Mostrar todos los productos
    index: async (req, res) => {
        try {
            const productos = await APIproductService.getAll(req);
            //const categorias1 = await APIproductService.getAllCategories();
            //const categorias2 = await APIproductService.getCategories();
            //let [...catName] = categorias1
            /*
            let indCat = []
            categorias1.forEach(ele => indCat.push(ele.nombre))

            for (let i = 1; i < pelisQueue.length; i++) {
                pelisQueueObj[i] = pelisQueue[i];
            }*/

            return res.status(200).json({
                count: productos.productos.length,
                countByCategory: productos.categoria,
                //categorias: categorias1,
                products: productos.productos,
                //Borrar lo de abajo
                url: `${req.protocol}://${req.get('host')}${req.originalUrl}/${req.params.id}`
            });
        } catch (error) {
            console.log(error);
        }
    },
    // Mostrar detalle de un producto mediante su id
    detail: async (req, res) => {
        try {
            const producto = await APIproductService.getByPk(req.params.id);

            if(!producto) 
                return res.status(404).json({message: 'El producto no exite'})

            //const talles = producto.talles.filter(talle => talle.ProductoTalle.stock > 0);
            return res.status(200).json({
                producto: producto,
                imagenURL: `${req.protocol}://${req.get('host')}/images/products/${producto.imagenes[0].nombre}`
                /*
                marca: producto.marca,
                categorias: producto.categorias,
                imagenes: producto.imagenes, 
                color: producto.color, 
                talles: producto.talles, 
                */
            });

            

        } catch (error) {
            console.log(error);
        }
    },

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
                */
            });

            

        } catch (error) {
            console.log(error);
        }
    },




}

module.exports = controller