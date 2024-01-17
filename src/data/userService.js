const path = require('path');
const fs = require('fs');
const userPath = path.resolve(__dirname, './userDatabase.json');
const bcryptjs = require('bcryptjs');

const userService = {
    users: JSON.parse(fs.readFileSync(userPath,'utf-8')),
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
                    Id : this.users[this.users.length - 1].Id + 1,
                    Nombre : body.Nombre,
                    Telefono : parseInt(body.Telefono),
                    Email : body.Email,
                    Contrasena : Contrasena,
                    Categoria : "Comprador",
                    FotoPerfil : "default.png"
                }
                if(file){
                    user.FotoPerfil = file.filename;
                }
    
                this.users.push(user);
                fs.writeFileSync(userPath, JSON.stringify(this.users), 'utf-8');
            }else{
                console.log("las contraseñas no coinciden");
            }
        }else{
            console.log("Este email ya está registrado");
        }
    }
}

module.exports = userService;
