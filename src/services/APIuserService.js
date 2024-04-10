const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const db = require("../data/models");

const userService = {
    getAll: async function (params, limit) {
        try {
            const usuarios = await db.Usuario.findAll({
                attributes: [
                    'id', 'nombre', 'apellido', 'email',
                    // Lo siguiente deberia mostrar el enlace al detalle de cada usuario, pero no consegui que funcionara
                    [db.sequelize.literal(`CONCAT('http://localhost:3000/API/users/', id)`), 'detail']
                ],
                limit: limit,
                offset: (params.page || 0) * limit
            });

            const totalUsers = await db.Usuario.findAll();

            return {
                usuarios,
                length: totalUsers.length
            }
        } catch (error) {
            return {
                usuarios: [],
                length: 0
            };
        }
    },
    getByPk: async function (id) {
        try {
            return await db.Usuario.findByPk(id, {
                include: ['rol', 'imagen'],
                attributes: [
                    'id', 'nombre', 'apellido', 'telefono', 'email', 'rol.nombre',
                ],
            });
        } catch (error) {
            console.log(error);
            return {};
        }
    },
}


module.exports = userService;