import userService from '../services/userService.js';



const controller = {
    login: (req, res) => {
        res.render('users/login');
    },
    signIn: async (req, res) => {
        try {
            const id = await userService.signIn(req.body);
            if (id) {
                const user = await userService.getByPk(id);
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
                        maxAge: 1000 * 60 * 15 /* 15 minutos */,
                        httpOnly: true,
                        secure: true
                    });
                }
                res.redirect(`/users/profile`);
            } else {
                res.render('users/login', {
                    error: "Credenciales invalidas"
                });
            }
        } catch (error) {
            console.log(error.message);
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
                console.log('Usuario registrado correctamente');
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
            await userService.softDelete(req.params.id);
            res.clearCookie('emailUserRemember');
            req.session.destroy();
            res.redirect('/');
        } catch (error) {
            console.log(error.message);
        }
    },
    usuarios: async (req, res) => {
        try {
            const usuarios = await userService.getAll();
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
    getAdminEditView: async (req, res) => {
        try {
            const usuario = await userService.getByPk(req.params.id);
            res.render('users/userEditAdmin', {
                usuario: usuario
            });
        } catch (error) {
            console.log(error.message);
        }
    },
    changeCategory: async (req, res) => {
        try {
            await userService.change(req.params.id);
            res.redirect(`/users/userEdit/${req.params.id}`);
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
        res.render('users/changePass', { idUsuario: req.session.userLogged.id });
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

export default controller