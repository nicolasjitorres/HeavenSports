const APIproductService = require('../services/APIproductService');

const controller = {
    // Mostrar todos los productos
    index: async (req, res) => {
        try {
            const productos = await APIproductService.getAll();
            const categorias1 = await APIproductService.getAllCategories();
            const categorias2 = await APIproductService.getCategories();
            //let [...catName] = categorias1
            /*
            let indCat = []
            categorias1.forEach(ele => indCat.push(ele.nombre))

            for (let i = 1; i < pelisQueue.length; i++) {
                pelisQueueObj[i] = pelisQueue[i];
            }*/

            return res.status(200).json({
                count: productos.length,
                countByCategory: categorias2,
                categorias: categorias1,
                products: productos,
            });
        } catch (error) {
            console.log(error);
        }
    },
    // Mostrar detalle de un producto mediante su id
    detail: async (req, res) => {
        try {
            const producto = await APIproductService.getByPk(req.params.id);
            const talles = producto.talles.filter(talle => talle.ProductoTalle.stock > 0);
            return res.status(200).json({
                producto: producto,
            });
        } catch (error) {
            console.log(error);
        }
    },




}

module.exports = controller