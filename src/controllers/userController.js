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
    }
}

module.exports = controller