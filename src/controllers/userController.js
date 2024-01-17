const userService = require('../data/userService');

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
        userService.saveUser(req.body, req.file);
		res.redirect('/');
    }
}

module.exports = controller