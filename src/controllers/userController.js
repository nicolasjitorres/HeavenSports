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
        userService.saveUser(req.body, req.file);
		res.redirect('/');
    },
    profile: (req, res) => {
        res.render('users/profile', ({
			usuario: req.session.userLogged
		}));
    }
}

module.exports = controller