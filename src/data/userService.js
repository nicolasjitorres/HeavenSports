const path = require('path');
const fs = require('fs');
const userPath = path.resolve(__dirname, './userDatabase.json');
//const bcryptjs = require('bcryptjs');

const userService = {
    users: JSON.parse(fs.readFileSync(userPath,'utf-8')),
    
    getData: function () {
        return userService.users;
    },

    getAll: function () {
        return userService.getData();
    },

    saveUser : function(body, file) {
        if(body.Contrasena == body.ReContrasena){
            //let Contrasena = bcryptjs.hashSync(body.Contrasena, 15);
            let user = {
                Id : this.users[this.users.length - 1].Id + 1,
                Nombre : body.Nombre,
                //Telefono : parseInt(body.Telefono),
                Email : body.Email,
                //Contrasena : Contrasena,
                //Categoria : "Comprador",
                //FotoPerfil : "default.jpeg"
            }
            if(file){
                user.FotoPerfil = file.filename;
            }

            this.users.push(user);
            fs.writeFileSync(userPath, JSON.stringify(this.users, null, ' '), 'utf-8');

            return true
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
    
}

module.exports = userService;

console.log(userService.saveUser({Nombre: 'Ana', Email: 'ana@prueba.com'}));