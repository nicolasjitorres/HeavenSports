const path = require('path');
const fs = require('fs');
const userPath = path.resolve(__dirname, './userDatabase.json');
const bcryptjs = require('bcryptjs');

const userService = {
    users: JSON.parse(fs.readFileSync(userPath,'utf-8')),
    saveUser : function(body, file) {
        if(body.Contrasena == body.ReContrasena){
            let Contrasena = bcryptjs.hashSync(body.Contrasena, 15);
            let user = {
                Id : this.users[this.users.length - 1].Id + 1,
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
            fs.writeFileSync(userPath, JSON.stringify(this.users), 'utf-8');
        }
    }
}

module.exports = userService;
