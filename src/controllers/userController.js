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
    },
    destroyUser: (req, res) => {
		userService.deleteUser(req);
		res.redirect('/users')
	}: 
}

module.exports = controller