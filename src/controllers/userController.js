const userService = require('../services/userService');



const controller = {
    login: (req, res) => {
        res.render('users/login');
    },
    signIn: (req, res) => {
        try {
            let usuario = userService.signIn(req.body);

            req.session.userLogged = {
                ...usuario
            };
            delete req.session.userLogged.Contrasena;

            if(req.body.Recordar){
                res.cookie('emailUserRemember', req.body.Email, {httpOnly: true, secure: true});
            }

            res.redirect(`/users/profile`);
        } catch (error) {
            console.log(error.message);
            res.render('users/login', {
                error: "Credenciales invalidas"
            });
        }
    },
    logout: (req, res) => {
        res.clearCookie('emailUserRemember');
        req.session.destroy();
        res.redirect('/');
    },
    register: (req, res) => {
        res.render('users/register');
    },
    save: (req, res) => {
        // Devuelve true si el usuario pudo ser registrado, caso contrario devuelve false
        let saveUser = userService.saveUser(req.body, req.file);
        if (saveUser) {
            res.redirect('/');
        } else {
            // Este es el caso en el que ya se encuentra el mail en uso
            res.render('users/register', {})
        }

    },
    destroyUser: (req, res) => {
        userService.deleteUser(req.params.id);
        res.clearCookie('emailUserRemember');
        req.session.destroy();
        res.redirect('/');
    },
    usuarios: (req, res) => {
        res.render('users/usuarios', {
            usuarios: userService.getAll(), admin: req.session.userLogged.Categoria
        });
    },
    profile: (req, res) => {
        res.render('users/profile', ({
            usuario: userService.findByPk(req.session.userLogged.Id)
        }));
    },
    userEditAdmin: (req, res) => {
        res.render('users/userEditAdmin', ({
            usuario: userService.findByPk(req.params.id)
        }));
    },
    changeCategory: (req, res) => {
        userService.change(req.params.id);
        res.render('users/userEditAdmin', {
            usuario: userService.findByPk(req.params.id)
        });
    },
    edit: (req, res) => {
        res.render('users/userEdit', ({
            usuario: userService.findByPk(req.session.userLogged.Id)
        }));
    },
    update: (req, res) => {
        userService.edit(req.body, req.session.userLogged.Id, req.file);
        res.render('users/profile', ({
            usuario: userService.findByPk(req.session.userLogged.Id)
        }));
    },
    changePass: (req, res) => {
        res.render('users/changePass');
    },
    updatePass: (req, res) => {
        try {
            userService.updatePass(req.session.userLogged.Id, req.body);
            res.render('users/profile', ({
                usuario: userService.findByPk(req.session.userLogged.Id)
            }));
        } catch (error) {
            res.render('users/changePass', { error: error.message});
        }

    }
}

module.exports = controller