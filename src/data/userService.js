const path = require('path');
const fs = require('fs');
const userPath = path.resolve(__dirname, './userDatabase.json');
const bcryptjs = require('bcryptjs');



const userService = {
    users: JSON.parse(fs.readFileSync(userPath, 'utf-8')),
    getOne: function (Id) {
        let usuario = {};
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].Id == Id) {
                usuario = this.users[i];
            }
        }
        return usuario;
    },
    getAll: function () {
        return this.users;
    },

    generateId: function () {
        if (this.users == '') {
            return parseInt(1, 10);
        } else {
            return this.users[this.users.length - 1].Id + 1;
        }
    },
    signIn: function (body) {
        let usuario = this.users.find(user => user.Email == body.Email);
        console.log(usuario);
        if (usuario) {
            if (bcryptjs.compareSync(body.Contrasena, usuario.Contrasena)) {
                console.log("Usuario logueado");
            } else {
                console.log("credenciales invalidas.");
                throw new Error('Credenciales invalidas')
            }
        } else {
            console.log("credenciales invalidas.");
            throw new Error('Credenciales invalidas')
        }
    },
    saveUser: function (body, file) {
        if (!this.users.find(user => user.Email == body.Email)) {

            if (body.Contrasena == body.ReContrasena) {
                let Contrasena = bcryptjs.hashSync(body.Contrasena, 15);
                let user = {
                    Id: this.generateId(),
                    Nombre: body.Nombre,
                    Telefono: parseInt(body.Telefono),
                    Email: body.Email,
                    Contrasena: Contrasena,
                    Categoria: "Comprador",
                    FotoPerfil: "default.jpeg"
                }
                if (file) {
                    user.FotoPerfil = file.filename;
                }

                this.users.push(user);
                fs.writeFileSync(userPath, JSON.stringify(this.users, null, ' '), 'utf-8');
                return true;
            } else {
                console.log("las contraseñas no coinciden");
            }
        } else {
            console.log("Este email ya está registrado");
            return false;
        }
    },
    findByPk: function (id) {
        let allUsers = this.getAll();
        let userFound = allUsers.find(singleUser => singleUser.Id == id);
        return userFound;
    },

    findByField: function (field, need) {
        let allUsers = this.getAll();
        let userFound = allUsers.find(singleUser => singleUser[field] == need);
        return userFound;
    },
    edit: function (body, id, file) {

    },
    deleteUser: function (id) {
        let idAEliminar = this.users.findIndex(user => user.Id == id);
        this.users.splice(idAEliminar, 1);
        fs.writeFileSync(userPath, JSON.stringify(this.users), 'utf-8');

    }
}

module.exports = userService;