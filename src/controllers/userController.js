const userService = require('../data/userService');
const { validationResult } = require('express-validator');

const controller = {
    login: (req, res) => {
        res.render('users/login', {});
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
            return res.render ('users/register', {
                // AQUI VAN LOS ERRORES QUE SE PASAN A LA VISTA (49:25)
            });
                
            };

        userService.saveUser(req.body, req.file);
		res.redirect('/');
    },
    profile: (req, res) => {
        res.render('users/profile', ({
			usuario: req.session.userLogged
		}));
    },
    destroyUser: (req, res) => {
		userService.deleteUser(req);
		res.redirect('/users')
	}
}

module.exports = controller