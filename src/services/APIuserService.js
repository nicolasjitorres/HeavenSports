const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const db = require("../data/models");

const userService = {
    getAll: async function () {
        try {
            return await db.Usuario.findAll({
                //include: ['rol', 'imagen', 'carrito'],
                attributes: [             
                    'id', 'nombre', 'apellido', 'email',
                    [db.sequelize.fn('concat', 'http://localhost:3000/API/users/', db.sequelize.col('id')),' url']             
                ],   
            });
        } catch (error) {
            console.log(error);
        }
    },
    getByPk: async function (id) {
        try {
            return await db.Usuario.findByPk(id, {
                include: ['rol'],
                attributes: [             
                    'id', 'nombre', 'apellido', 'telefono', 'email', 'rol.nombre'
                ],
            });
        } catch (error) {
            console.log(error);
            return {};
        }
    },
    findByField: async function (field, value) {
        try {
            let whereClause = {};
            whereClause[field] = value;
            return await db.Usuario.findOne({
                where: whereClause,
                include: ['rol', 'imagen', 'carrito']
            })
        } catch (error) {
            return null;
        }
    },
    saveUser: async function (data, file) {
        try {
            const user = await this.findByField('email', data.email);
            if (!user) {
                if (data.contrasena == data.reContrasena) {
                    let idFile = 1;
                    if (file) {
                        const newImagen = new Imagen(file.filename);
                        const {
                            id
                        } = await db.Imagen.create(newImagen);
                        idFile = id;
                    }
                    const newUsuario = new Usuario(data, idFile);
                    const { id } = await db.Usuario.create(newUsuario);
                    await db.Carrito.create({
                        id_usuario : id
                    })
                    return {
                        userSaved: true
                    };
                } else {
                    throw new Error('Las contraseñas no coinciden');
                }
            } else {
                throw new Error('Este email ya se encuentra registrado');
            }
        } catch (error) {
            console.log(error.message);
            const {
                contrasena,
                reContrasena,
                ...newData
            } = data;
            return {
                newData,
                userSaved: false
            };
        }
    },
    generateRandomNumber: function () {
        let randomNumber = '';
        for (let i = 0; i < 10; i++) {
            randomNumber += Math.floor(Math.random() * 10);
        }
        return bcryptjs.hashSync(randomNumber, 15);
    },
    signIn: async function (data) {

        try {
            let user = await this.findByField('email', data.email);
            if (user && user.active) {
                let pass = bcryptjs.compareSync(data.contrasena, user.contrasena);
                if (pass) {
                    console.log('Usuario logueado correctamente');
                    const sesion = this.generateRandomNumber();
                    await db.Usuario.update({
                        sesion: sesion
                    }, {
                        where: {
                            id: user.id
                        }
                    });
                    return user.id;
                } else {
                    throw new Error('Credenciales invalidas');
                }
            } else {
                throw new Error('Usuario inexistente');
            }
        } catch (error) {
            console.log(error.message);
            return false;
        }
    },
    logoutUser: async function(sesion){
        try {
            await db.Usuario.update({
                sesion: null
            }, {
                where: {
                    sesion: sesion 
                }
            });
        } catch (error) {
            console.log(error.message);
        }
    },
    deleteImagen: async function(usuario){
        if (usuario.imagen.nombre != 'default.png') {
            const rutaDirectorio = '../../public/images/users';
            const rutaImagen = path.join(__dirname, rutaDirectorio, usuario.imagen.nombre)

            if (fs.existsSync(rutaImagen)) {
                fs.unlinkSync(rutaImagen);
                console.log(`Imagen ${usuario.imagen.nombre} eliminada correctamente`);
            } else {
                console.log(`La imagen ${usuario.imagen.nombre} no existe en el directorio`);
            }
            await db.Imagen.destroy({
                where: {
                    id: usuario.imagen.id
                }
            });
        }
    },
    edit: async function (data, idUser, file) {
        try {
            const user = await this.findByField('email', data.email);
            const usuario = await this.getByPk(idUser);
            if (JSON.stringify(user) == JSON.stringify(usuario) || user == null) {
                let {
                    id_imagen
                } = usuario;
                if (file) {
                    const newImagen = new Imagen(file.filename);
                    const {
                        id
                    } = await db.Imagen.create(newImagen);
                    await this.deleteImagen(usuario);
                    id_imagen = id;
                }
                await db.Usuario.update({
                    nombre: data.nombre,
                    apellido: data.apellido,
                    telefono: data.telefono,
                    email: data.email,
                    id_imagen: id_imagen
                }, {
                    where: {
                        id: idUser
                    }
                });
            } else {
                throw new Error('El email ingresado ya existe')
            }
        } catch (error) {
            console.log(error.message);
            return {
                data
            }
        }

    },
    deleteUser: async function (id) {
        try {
            const usuario = await this.getByPk(id);
            await db.Carrito.destroy({
                where: {
                    id_usuario: id
                }
            });
            await db.Usuario.destroy({
                where: {
                    id: id
                }
            });
            await this.deleteImagen(usuario);
            console.log('usuario eliminado');
        } catch (error) {
            console.log(error.message);
        }
    },
    softDelete: async function (id) {
        try {
            await db.Usuario.update({
                active: false
            }, {
                where: {
                    id: id
                }
            })
        } catch (error) {
            console.log(error.message);
        }
    },
    updatePass: async function (id, data) {
        try {
            const user = await this.getByPk(id);
            if (data.contrasena == data.reContrasena) {
                if (bcryptjs.compareSync(data.contrasenaActual, user.contrasena)) {
                    const newContrasena = bcryptjs.hashSync(data.contrasena, 15);
                    await db.Usuario.update({
                        contrasena: newContrasena
                    }, {
                        where: {
                            id: id
                        }
                    });
                } else {
                    throw new Error("Contraseña actual incorrecta")
                }
            } else {
                throw new Error("Las contraseñas nuevas no coinciden")
            }
        } catch (error) {
            console.log(error.message);
        }
    },
    change: async function (id) {
        try {
            const usuario = await this.getByPk(id);
            let rol;
            console.log(usuario);
            if (usuario.id_rol == 1) {
                rol = 2;
            } else {
                rol = 1;
            }
            await db.Usuario.update({
                id_rol: rol
            }, {
                where: {
                    id: id
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}

// Constructor de usuario
function Usuario({
    nombre,
    apellido,
    telefono,
    email,
    contrasena
}, id_imagen) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
    this.email = email;
    this.contrasena = bcryptjs.hashSync(contrasena, 15);
    this.active = true;
    this.id_imagen = id_imagen;
    this.id_rol = 1;
}

// Constructor de Imagen
function Imagen(filename) {
    this.nombre = filename
}

module.exports = userService;