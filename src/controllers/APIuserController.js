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
            return res.status(200).json({
                usuario: usuario
            });
        } catch (error) {
            console.log(error.message);
        }
    },
}

module.exports = controller