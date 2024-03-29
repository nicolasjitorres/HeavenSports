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

                attributes: [             
                    [db.sequelize.fn('concat', 'http://localhost:3000/API/products/', db.sequelize.col('id')),' url']             
                ], 

                where: {
                    active: true
                },

                       

            });
        } catch (error) {
            console.log(error);
            return [];
        }
    },
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
    },*/
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
*/
            });
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    getCategories: async function () {
        try {

            
            // let cantCat = await this.getAllCategories.length
            //let cantCat = await db.Categoria.findAll().length
/*
            let unaCat
            let todasCat = []
            for (i = 1; i <= 5; i++ ) {
                
                 unaCat = await db.ProductoCategoria.count({
                    where: {
                        id_categoria: i
                    }
                  });
                  console.log(unaCat);
                  todasCat.push(unaCat)
                  todasCat2 = [...unaCat]
                  
            };
            console.log(todasCat);
            console.log(todasCat2);
            
            return todasCat2
            
*/
                            
   

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
    
}


module.exports = productService;