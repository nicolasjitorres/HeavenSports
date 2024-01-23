const path = require('path');
const fs = require('fs');
const userPath = path.resolve(__dirname, './userDatabase.json');
const bcryptjs = require('bcryptjs');



const userService = {
    users: JSON.parse(fs.readFileSync(userPath, 'utf-8')),
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
        if (usuario) {
            if (bcryptjs.compareSync(body.Contrasena, usuario.Contrasena)) {
                console.log("Usuario logueado correctamente!");
                return usuario;
            } else {
                throw new Error('Credenciales invalidas')
            }
        } else {
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
                    Categoria: "Usuario",
                    FotoPerfil: "default.png"
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
        let userFound = allUsers.find(user => user.Id == id);
        return userFound;
    },

    findByField: function (field, need) {
        let allUsers = this.getAll();
        let userFound = allUsers.find(user => user[field] == need);
        return userFound;
    },
    edit: function (body, id, file) {
        let userOld = this.findByPk(id);
        let filename;
        if (file) {
            filename = file.filename;
        } else {
            filename = userOld.FotoPerfil;
        }
        let userEdited = new Usuario(body, userOld.Contrasena, id, filename);
        let idUser = this.users.findIndex(user => user.Id == id);
        this.users[idUser] = userEdited;
        fs.writeFileSync(userPath, JSON.stringify(this.users), 'utf-8');
    },
    deleteUser: function (id) {
        let idAEliminar = this.users.findIndex(user => user.Id == id);
        this.users.splice(idAEliminar, 1);
        fs.writeFileSync(userPath, JSON.stringify(this.users), 'utf-8');

    },
    updatePass: function (id, body) {
        let user = this.findByPk(id);
        if (body.Contrasena == body.ReContrasena) {
            if (bcryptjs.compareSync(body.ContrasenaActual, user.Contrasena)) {
                user.Contrasena = bcryptjs.hashSync(body.Contrasena, 15);
                let idUser = this.users.findIndex(user => user.Id == id);
                this.users[idUser] = user;
                fs.writeFileSync(userPath, JSON.stringify(this.users), 'utf-8');
            } else {
                throw new Error("Contraseña actual incorrecta.")
            }
        } else {
            throw new Error("Las contraseñas nuevas no coinciden.")
        }
    },
    change: function (id) {
        let user = this.findByPk(id);
        if (user.Categoria == "Usuario") {
            user.Categoria = "Administrador";
        } else {
            user.Categoria = "Usuario";
        }
        let idUser = this.users.findIndex(user => user.Id == id);
        this.users[idUser] = user;
        fs.writeFileSync(userPath, JSON.stringify(this.users), 'utf-8');
    }
}

function Usuario({
    Nombre,
    Telefono,
    Email,
    Categoria
}, contrasena, id, FotoPerfil) {
    this.Id = id;
    this.Nombre = Nombre;
    this.Telefono = Telefono;
    this.Email = Email;
    this.Contrasena = contrasena;
    this.Categoria = Categoria;
    this.FotoPerfil = FotoPerfil;
}

module.exports = userService;