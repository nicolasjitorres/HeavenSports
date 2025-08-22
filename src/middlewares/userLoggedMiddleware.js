import userService from '../services/userService.js';

const userLoggedMiddleware = async (req, res, next) => {

    try {
        let sesion = req.cookies.sesionUserRemember;
        let user = await userService.findByField('sesion', sesion);
        if (user) {
            req.session.userLogged = {
                id: user.id,
                nombre: user.nombre,
                apellido: user.apellido,
                telefono: user.telefono,
                email: user.email,
                id_rol: user.id_rol,
                imagen: user.imagen.nombre
            };
        }
        if (req.session.userLogged) {
            res.locals.userLogged = true;
            if (req.session.userLogged.id_rol == 2) {
                res.locals.admin = true
            }
        } else {
            res.locals.userLogged = false;
        }
    } catch (error) {
        console.log(error.message);
    }

    next();
}

export default userLoggedMiddleware;