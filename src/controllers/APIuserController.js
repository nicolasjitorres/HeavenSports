const APIuserService = require('../services/APIuserService');



const controller = {

    usuarios: async (req, res) => {
        try {
            let limit = 10;
            const {
                usuarios,
                length
            } = await APIuserService.getAll(req.query, limit);

            if (!usuarios.length) {
                return res.status(404).json({
                    error: 'Recurso inexistente.'
                });
            }

            let links = {};
            if (req.query.page > 0) {
                links.previous = `${req.protocol}://${req.get('host')}/API/users${req.query.page ? '/?page='+ (req.query.page - 1) : '/?page=1'}`
            }
            if (length > (parseInt(req.query.page) + 1 || 1) * limit) {
                links.next = `${req.protocol}://${req.get('host')}/API/users${req.query.page ? '/?page='+ (1 + parseInt(req.query.page)) : '/?page=1'}`
            }

            return res.status(200).json({
                count: length,
                users: usuarios,
                ...links
            });
        } catch (error) {
            return res.status(500).json({
                error: error.message
            });
        }
    },

    getOneUser: async (req, res) => {
        try {
            let usuario = await APIuserService.getByPk(req.params.id);

            if (!usuario) {
                return res.status(404).json({
                    message: 'El usuario no exite'
                })
            }

            return res.status(200).json({
                usuario: {
                    ...usuario.toJSON(),
                    URLImagenPerfil: `${req.protocol}://${req.get('host')}/images/users/${usuario.imagen.nombre}`
                }
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },

    imagen: async (req, res) => {
        try {
            const usuario = await APIuserService.getByPk(req.params.id);

            if (!usuario)
                return res.status(404).json({
                    message: 'El usuario no exite'
                })

            return res.status(200).json({
                imagenURL: `${req.protocol}://${req.get('host')}/images/users/${usuario.imagen.nombre}`
            });
        } catch (error) {
            console.log(error.message);
        }
    },
}

module.exports = controller