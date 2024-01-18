const userService = require('../data/userService');



const controller = {
    login: (req, res) => {
        res.render('users/login');
    },
    signIn: (req, res) => {
        userService.signIn(req.body);
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
        console.log(req.params.id)
        userService.deleteUser(req.params.id);
        res.redirect('/users')
    },
    usuarios: (req, res) => {
        res.render('users/usuarios', {
            usuarios: userService.getAll()
        });
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
        userService.edit(req.body, req.params.id, req.file);
        res.redirect('/users/' + req.params.id + "/detail");
    },
}

module.exports = controller