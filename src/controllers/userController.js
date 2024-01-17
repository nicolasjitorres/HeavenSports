const userService = require('../data/userService');
const {
    validationResult
} = require('express-validator');

const controller = {
    login: (req, res) => {
        res.render('users/login');
    },
    signIn: (req,res) => {
        userService.signIn(req.body);
        res.redirect('/');
    },
    register: (req, res) => {
        res.render('users/register');
    },
    save: (req, res) => {

        // Verificacion si el mail ya existe en la BD
        let registeredUser = userService.findByField('Email', req.body.Email);

        if (registeredUser) {
            // Borrar siguiente linea de console.log
            console.log('Mail viejo');
            return res.render('users/register', {
                // AQUI VAN LOS ERRORES QUE SE PASAN A LA VISTA (49:25)
            });

        }else{
            userService.saveUser(req.body, req.file);
            res.redirect('/');
        }

    },
    profile: (req, res) => {
        let user = userService.userProfile(req.params.userId);
        if (user) {
            res.render('users/profile', ({
                usuario: user
            }));
        } else {
            res.render('info/error')
        }

    },
    destroyUser: (req, res) => {
        userService.deleteUser(req);
        res.redirect('/users')
    },
    usuarios: (req, res) => {
        res.render('users/usuarios', {usuarios: userService.getAll()});
    },
    detail: (req, res) => {
		res.render('users/detail', ({
			usuario: userService.getOne(req.params.id)
		}));
	},
    edit: (req, res) => {
        res.render('users/edit', ({
			usuario: userService.getOne(req.params.id)
		}));
    },
    update: (req, res) => {
        userService.edit(req.body, req.params.id, req.files);
        res.redirect('/users/'+ req.params.id + "/detail");
    },
}

module.exports = controller