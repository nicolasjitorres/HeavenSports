const userService = require('../services/userService');



const controller = {
    login: (req, res) => {
        res.render('users/login');
    },
    signIn: async (req, res) => {
        try {
            const user = await userService.signIn(req.body);
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
                if (req.body.recordar) {
                    res.cookie('sesionUserRemember', user.sesion, {
                        maxAge: 1000 * 60 * 15 /* 15 minutos */ 
                    });
                }
                res.status(200).redirect(`/users/profile`);
            } else {
                throw new Error('Ocurrio un error de conexion con la base de datos...');
            }
        } catch (error) {
            res.status(500).render('info/error');
        }
    },
    logout: async (req, res) => {
        try {
            await userService.logoutUser(req.cookies.sesionUserRemember)
            res.clearCookie('sesionUserRemember');
            req.session.destroy();
            res.redirect('/');
        } catch (error) {
            console.log(error.message);
        }
    },
    register: (req, res) => {
        res.render('users/register');
    },
    save: async (req, res) => {
        // Devuelve true si el usuario pudo ser registrado, caso contrario devuelve false
        try {
            const user = await userService.saveUser(req.body, req.file);
            if (user.userSaved) {
                res.redirect('/users/login');
            } else {
                res.render('users/register.ejs', {
                    usuario: user.newData
                })
            }
        } catch (error) {
            console.log(error.message);
        }
    },
    destroyUser: async (req, res) => {
        try {
            await userService.deleteUser(req.params.id);
            res.redirect('/users');
        } catch (error) {
            console.log(error.message);
        }
    },
    softDelete: async (req, res) => {
        try {
            await userService.softDelete(req.params);
            if (req.session.userLogged && req.session.userLogged.id_rol == 1) {
                res.clearCookie('emailUserRemember');
                req.session.destroy();
                res.redirect('/');
            } else {
                res.redirect('/users');
            }
        } catch (error) {
            console.log(error.message);
        }
    },
    usuarios: async (req, res) => {
        try {
            let usuarios = await userService.getAll();
            if (req.session.userLogged) {
                usuarios = usuarios.filter(usuario => usuario.id != req.session.userLogged.id)
            }
            res.render('users/usuarios', {
                usuarios: usuarios
            });
        } catch (error) {
            console.log(error);
        }
    },
    profile: async (req, res) => {
        try {
            const usuario = await userService.getByPk(req.session.userLogged.id)
            res.render('users/profile', {
                usuario: usuario
            });
        } catch (error) {
            console.log(error.message);
            res.redirect('/404');
        }
    },
    changeCategory: async (req, res) => {
        try {
            await userService.change(req.params.id);
            res.redirect(`/users`);
        } catch (error) {
            console.log(error);
        }
    },
    edit: async (req, res) => {
        try {
            const usuario = await userService.getByPk(req.session.userLogged.id);
            res.render('users/userEdit', {
                usuario: usuario
            });
        } catch (error) {
            console.log(error.message);
            res.redirect('/users/login')
        }
    },
    update: async (req, res) => {
        try {
            await userService.edit(req.body, req.session.userLogged.id, req.file);
            res.redirect('/users/profile');
        } catch (error) {
            console.log(error.message);
        }
    },
    changePass: (req, res) => {
        res.render('users/changePass', {
            idUsuario: req.session.userLogged.id
        });
    },
    updatePass: async (req, res) => {
        try {
            await userService.updatePass(req.session.userLogged.id, req.body);
            const usuario = await userService.getByPk(req.session.userLogged.id);
            res.render('users/profile', ({
                usuario: usuario,
                message: 'Contraseña actualizada'
            }));
        } catch (error) {
            res.render('users/changePass', {
                error: error.message
            });
        }

    }
}

module.exports = controller