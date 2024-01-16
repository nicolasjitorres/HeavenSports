const userService = require('../data/userService');

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