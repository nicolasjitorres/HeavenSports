const APIuserService = require('../services/APIuserService');



const controller = {
    
    usuarios: async (req, res) => {
        try {
            const usuarios = await APIuserService.getAll();
            res.status(200).json({
                count: usuarios.length,
                users: usuarios
            });
        } catch (error) {
            console.log(error);
        }
    },
    
    getOneUser: async (req, res) => {
        try {
            const usuario = await APIuserService.getByPk(req.params.id);

            if(!usuario) 
                return res.status(404).json({message: 'El usuario no exite'})

            return res.status(200).json({
                usuario: usuario,
                imagenURL: `${req.protocol}://${req.get('host')}/images/users/${usuario.imagen.nombre}`
            });
        } catch (error) {
            console.log(error.message);
        }
    },

    imagen: async (req, res) => {
        try {
            const usuario = await APIuserService.getByPk(req.params.id);

            if(!usuario) 
                return res.status(404).json({message: 'El usuario no exite'})

            return res.status(200).json({
                imagenURL: `${req.protocol}://${req.get('host')}/images/users/${usuario.imagen.nombre}`
            });
        } catch (error) {
            console.log(error.message);
        }
    },
}

module.exports = controller