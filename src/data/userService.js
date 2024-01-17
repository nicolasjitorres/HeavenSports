const path = require('path');
const fs = require('fs');
const userPath = path.resolve(__dirname, './userDatabase.json');
const bcryptjs = require('bcryptjs');



const userService = {
    users: JSON.parse(fs.readFileSync(userPath,'utf-8')),
    getAll: function () {
        return this.users;
    },
    getOne: function (Id) {
        let usuario = {};
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].Id == Id) {
                usuario = this.users[i];
            }
        }
        return usuario;
    },
    
    getData: function () {
        return userService.users;
    },

    getAll: function () {
        return userService.getData();
    },

    generateId: function () {
        if (this.users == '') {
            return parseInt(1,10);
        }
        else {
            return this.users[this.users.length - 1].Id + 1;
        }
    },
    signIn: function(body) {
        let usuario = this.users.find(user => user.Email == body.Email);
        // Borrar esta linea
        console.log(usuario);
        if(usuario){
            if(bcryptjs.compareSync(body.Contrasena, usuario.Contrasena)){
                // Borrar esta linea
                console.log("Usuario logueado");
            }else{
                console.log("credenciales invalidas.");
            }
        }else{
            console.log("credenciales invalidas.");
        }
    },
    saveUser : function(body, file) {      
        if (!this.users.find(user => user.Email == body.Email)) {
    
        if(body.Contrasena == body.ReContrasena){
                let Contrasena = bcryptjs.hashSync(body.Contrasena, 15);
                let user = {
                    Id : this.generateId(),
                    Nombre : body.Nombre,
                    Telefono : parseInt(body.Telefono),
                    Email : body.Email,
                    Contrasena : Contrasena,
                    Categoria : "Comprador",
                    FotoPerfil : "default.jpeg"
                }
                if(file){
                    user.FotoPerfil = file.filename;
                }
    
                this.users.push(user);
                fs.writeFileSync(userPath, JSON.stringify(this.users, null, ' '), 'utf-8');

            
            }else{
                console.log("las contraseñas no coinciden");
            }
        }else{
            console.log("Este email ya está registrado");
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
    deleteUser: function (id) {
		let allUsers = this.getAll();
		let newAlllUsers = allUsers.filter(oneUser => oneUser.Id !== id);
		fs.writeFileSync(userPath, JSON.stringify(newAlllUsers, null, ' '), 'utf-8');
		
	},
    userProfile: function(id){
        let usuario = this.users.find(user => user.Id == id);
        return usuario;
    }
}

module.exports = userService;

