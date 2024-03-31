const path = require('path');
const fs = require('fs');
const db = require("../data/models");

// Funcion que recibe una palabra sin importar como está escrita y la retorna capitalizada (ejemplo: hOlA => Hola)
const capitalize = (palabra) => {
    return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
}



const productService = {
    
    // Retorna todos los productos
    getAll: async function (req) {
        try {

            //console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}/${req.params.id}`);
            /*
            return await db.Producto.findAll({
                include: ['marca', 'categorias', 'imagenes', 'color', 'talles'],
/*
                attributes: [             
                    //[db.sequelize.fn('concat', 'http://localhost:3000/API/products/', db.sequelize.col('id')),' url']             
                    [db.sequelize.fn('concat', `${req.protocol}://${req.get('host')}${req.originalUrl}/${req.params.id}`, db.sequelize.col('id')),' url']             
                ], 
*//*
                where: {
                    active: true
                },
*/

            let productos = await db.Producto.findAll({
                
                attributes: [
                    'id', 'nombre', 'descripcion', 'precio', 'descuento',
                    // La siguiente linea deberia ser el enlace al detalle de cada producto, pero no conseguí que funcionara
                    //[db.sequelize.fn('CONCAT', `${req.protocol}://${req.get('host')}${req.originalUrl}/`, db.sequelize.col('id')),' url']
                  ],
                //include: ['marca', 'categorias', 'imagenes', 'color', 'talles'],
                include: ['talles'],
                where: {
                    active: true
                },              
            });
            let categoria = await db.Categoria.findAll({
                attributes: [
                  'nombre',
                  [db.sequelize.fn('COUNT', db.sequelize.col('productos.id')), 'totalProductos']
                ],
                include: [{
                  model: db.Producto,
                  as: 'productos',
                  through: { attributes: [] },
                  attributes: []
                }],
                group: ['Categoria.id']
            })



            return {
                productos,
                categoria
            }



        } catch (error) {
            console.log(error);
            return [];
        }
    },
    
    // Retorna un producto en base a su id
    getByPk: async function (req, id) {
        try {
            let producto = await db.Producto.findByPk(id, {
                
                attributes: [             
                    'id', 'nombre', 'descripcion', 'precio', 'descuento',
                    //[db.sequelize.fn('CONCAT', `${req.protocol}://${req.get('host')}/images/products/${producto.imagenes[0].nombre}`),' urlImagen']
                ],
                include: ['marca', 'categorias', 'imagenes', 'color', 'talles'],
                
            });

            let urlImagen = `${req.protocol}://${req.get('host')}/images/products/${producto.imagenes[0].nombre}`

            return {
                producto,
                urlImagen
            }

        } catch (error) {
            console.log(error);
            return {};
        }
    },

    /*
    getByPkForImag: async function (req, id) {
        try {
            
            let imagen = await db.ProductoImagen.findAll({
                where: 
                    { id_producto: id },
                    
                attributes: [             
                    'id','id_imagen', 
                    //[db.sequelize.fn('CONCAT', `${req.protocol}://${req.get('host')}/images/products/${imagen[0].imagen.nombre}`),'url']

                ],
                include: ['imagen'],
                
                

                /*
                let imagen = await db.Imagen.findAll({
                    attributes: [
                        'Imagen.nombre', 'Producto.id'
                    ],
                    include: [{
                        model: db.Producto,
                        as: 'productos',
                        //through: { attributes: [] },
                        //attributes: []
                    }],
                    
                    where: 
                    { 'productos.id' : id },
                 


                
            });

            return imagen

        } catch (error) {
            console.log(error);
            return {};
        }
    },*/


    /////////////////////////////////

    /*
    getCategories: async function () {
        try {
/*
            let categorias = {}
            let Deportivo = await db.ProductoCategoria.count({
                distinct: true,
                col: 'id_producto',
                where: {
                    id_categoria: '1'
                }
            });
            let Casual = await db.ProductoCategoria.count({
                distinct: true,
                col: 'id_producto',
                where: {
                    id_categoria: '2'
                }
            });
            let Running = await db.ProductoCategoria.count({
                distinct: true,
                col: 'id_producto',
                where: {
                    id_categoria: '3'
                }
            });
            let Baloncesto = await db.ProductoCategoria.count({
                distinct: true,
                col: 'id_producto',
                where: {
                    id_categoria: '4'
                }
            });
            let Ninos = await db.ProductoCategoria.count({
                distinct: true,
                col: 'id_producto',
                where: {
                    id_categoria: '5'
                }
            });
            return categorias = {
                Deportivo,
                Casual,
                Running,
                Baloncesto,
                Ninos
            }
            
        } catch (error) {
            console.log(error);
            return [];
        }
    },
*/
/*    
    getAllCategories: async function () {
        try {
            return await db.Categoria.findAll({
                attributes: [             
                    'nombre',        
                ], 

/*
                include: ['marca', 'categorias', 'imagenes', 'color', 'talles'],
                where: {
                    active: true
                },

                attributes: [             
                    'id',
                    [sequelize.fn('concat', 'http://localhost:3200/api/users/', sequelize.col('id')),' url']             
                ],        
*/
/*
            });
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    getAllCategories: async function () {
        try {
            return await db.ProductoCategoria.findAll({
                //include: ['categoria'],
                attributes: [             
                    ['id_categoria','cantidad por id_categoria'],   
                    
                    //[sequelize.fn('COUNT', sequelize.col('id_producto')), 'cantidad_productos']      
                ], 
               group: ['id_categoria']
                
/*
                
                where: {
                    active: true
                },

                attributes: [             
                    'id',
                    [sequelize.fn('concat', 'http://localhost:3200/api/users/', sequelize.col('id')),' url']             
                ],        

            });
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    getCategories: async function () {
        try {

            /*
            
             let cantCat = await db.Categoria.count()
            console.log(cantCat);

            let obj = {}
            let unaCat
            let unaCatNomb
            let todasCat = []
            let todasCat2 = {}
            let todosNombre = []
            let todosNombre2 = {}
            for (i = 1; i <= cantCat; i++ ) {
                
                 unaCat = await db.ProductoCategoria.count({
                    where: {
                        id_categoria: i
                    }
                  });

                  unaCatNomb = await db.Categoria.findByPk(i, {
                    attributes: [             
                        'nombre'
                    ],
                    where: {
                        id: i
                    }
                  });
                  

                  Object.defineProperty(obj, unaCatNomb.dataValues.nombre, {
                    value: unaCat
                })

                  console.log(unaCat);
                  console.log(unaCatNomb.dataValues.nombre);

                  todasCat.push(unaCat)
                  todosNombre.push(unaCatNomb.dataValues.nombre)
                  
                  todasCat2 = {...todasCat}
                  todosNombre2 = {...todosNombre}

                  

            };
            

            console.log(todasCat);
            console.log(todosNombre);
            console.log(todasCat2);
            console.log(todosNombre2);

            console.log(todosNombre[2]);
            */
            /*
            function Todo (...todosNombre) {
                for (i = 1; i <= cantCat; i++ ) {
                this.todosNombre[i] = todasCat[i]
                }
            }
            const Algo = new Todo(...todosNombre) 
            console.log(Algo);
*/
            /*
            const nuevo = todasCat2.map(item => {
                const obj = {};
                
            })
           */
/*
            let obj = {}
            for (i = 0; i < cantCat; i++ ) {
                Object.defineProperty(obj, todosNombre[i], {
                    value: todasCat[i]
                })

                }
                //console.log(obj);
*/




            //return todasCat2
            

                            
   
/*
            let categorias = {}
            let Deportivo = await db.ProductoCategoria.count({
                distinct: true,
                col: 'id_producto',
                where: {
                    id_categoria: '1'
                }
            });
            let Casual = await db.ProductoCategoria.count({
                distinct: true,
                col: 'id_producto',
                where: {
                    id_categoria: '2'
                }
            });
            let Running = await db.ProductoCategoria.count({
                distinct: true,
                col: 'id_producto',
                where: {
                    id_categoria: '3'
                }
            });
            let Baloncesto = await db.ProductoCategoria.count({
                distinct: true,
                col: 'id_producto',
                where: {
                    id_categoria: '4'
                }
            });
            let Ninos = await db.ProductoCategoria.count({
                distinct: true,
                col: 'id_producto',
                where: {
                    id_categoria: '5'
                }
            });
            return categorias = {
                Deportivo,
                Casual,
                Running,
                Baloncesto,
                Ninos
            }
            
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    */
}


module.exports = productService;