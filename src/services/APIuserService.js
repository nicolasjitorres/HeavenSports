const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const db = require("../data/models");

const userService = {
    getAll: async function () {
        try {
            return await db.Usuario.findAll({
                //include: ['rol', 'imagen', 'carrito'],
                attributes: [             
                    'id', 'nombre', 'apellido', 'email',
                    [db.sequelize.fn('concat', 'http://localhost:3000/API/users/', db.sequelize.col('id')),' url']             
                ],   
            });
        } catch (error) {
            console.log(error);
        }
    },
    getByPk: async function (id) {
        try {
            return await db.Usuario.findByPk(id, {
                include: ['rol'],
                attributes: [             
                    'id', 'nombre', 'apellido', 'telefono', 'email', 'rol.nombre'
                ],
            });
        } catch (error) {
            console.log(error);
            return {};
        }
    },
}


module.exports = userService;