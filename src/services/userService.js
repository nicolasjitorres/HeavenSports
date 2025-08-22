import fs from "fs";
import path from "path";
import bcryptjs from "bcryptjs";
import db from "../data/models/index.js";

const userService = {
  getAll: async function () {
    return await db.Usuario.findAll({
      include: ["rol", "imagen", "carrito"],
    });
  },
  getByPk: async function (id) {
    return await db.Usuario.findByPk(id, {
      include: ["rol", "imagen", "carrito"],
    });
  },
  findByField: async function (field, value) {
    let whereClause = {};
    whereClause[field] = value;
    return await db.Usuario.findOne({
      where: whereClause,
      include: ["rol", "imagen", "carrito"],
    });
  },
  saveUser: async function (data, file) {
    const user = await this.findByField("email", data.email);
    if (!user) {
      if (data.contrasena == data.reContrasena) {
        let idFile = 1;
        if (file) {
          const newImagen = new Imagen(file.filename);
          const { id } = await db.Imagen.create(newImagen);
          idFile = id;
        }
        const newUsuario = new Usuario(data, idFile);
        const { id } = await db.Usuario.create(newUsuario);
        await db.Carrito.create({
          id_usuario: id,
        });
        return {
          userSaved: true,
        };
      } else {
        throw new Error("Las contraseñas no coinciden");
      }
    } else {
      throw new Error("Este email ya se encuentra registrado");
    }
  },
  generateRandomNumber: function () {
    let randomNumber = "";
    for (let i = 0; i < 10; i++) {
      randomNumber += Math.floor(Math.random() * 10);
    }
    return bcryptjs.hashSync(randomNumber, 15);
  },
  signIn: async function (data) {
    let user = await this.findByField("email", data.email);
    if (user && user.active) {
      let pass = bcryptjs.compareSync(data.contrasena, user.contrasena);
      if (pass) {
        console.log("Usuario logueado correctamente");
        const sesion = this.generateRandomNumber();
        await db.Usuario.update(
          {
            sesion: sesion,
          },
          {
            where: {
              id: user.id,
            },
          }
        );
        return user.id;
      } else {
        throw new Error("Credenciales invalidas");
      }
    } else {
      throw new Error("Usuario inexistente");
    }
  },
  logoutUser: async function (sesion) {
    await db.Usuario.update(
      {
        sesion: null,
      },
      {
        where: {
          sesion: sesion,
        },
      }
    );
  },
  deleteImagen: async function (usuario) {
    if (usuario.imagen.nombre != "default.png") {
      const rutaDirectorio = "../../public/images/users";
      const rutaImagen = path.join(
        __dirname,
        rutaDirectorio,
        usuario.imagen.nombre
      );

      if (fs.existsSync(rutaImagen)) {
        fs.unlinkSync(rutaImagen);
        console.log(`Imagen ${usuario.imagen.nombre} eliminada correctamente`);
      } else {
        console.log(
          `La imagen ${usuario.imagen.nombre} no existe en el directorio`
        );
      }
      await db.Imagen.destroy({
        where: {
          id: usuario.imagen.id,
        },
      });
    }
  },
  edit: async function (data, idUser, file) {
    const user = await this.findByField("email", data.email);
    const usuario = await this.getByPk(idUser);
    if (JSON.stringify(user) == JSON.stringify(usuario) || user == null) {
      let { id_imagen } = usuario;
      if (file) {
        const newImagen = new Imagen(file.filename);
        const { id } = await db.Imagen.create(newImagen);
        await this.deleteImagen(usuario);
        id_imagen = id;
      }
      await db.Usuario.update(
        {
          nombre: data.nombre,
          apellido: data.apellido,
          telefono: data.telefono,
          email: data.email,
          id_imagen: id_imagen,
        },
        {
          where: {
            id: idUser,
          },
        }
      );
    } else {
      throw new Error("El email ingresado ya existe");
    }
  },
  deleteUser: async function (id) {
    const usuario = await this.getByPk(id);
    await db.Carrito.destroy({
      where: {
        id_usuario: id,
      },
    });
    await db.Usuario.destroy({
      where: {
        id: id,
      },
    });
    await this.deleteImagen(usuario);
    console.log("usuario eliminado");
  },
  softDelete: async function (id) {
    await db.Usuario.update(
      {
        active: false,
      },
      {
        where: {
          id: id,
        },
      }
    );
  },
  updatePass: async function (id, data) {
    const user = await this.getByPk(id);
    if (data.contrasena == data.reContrasena) {
      if (bcryptjs.compareSync(data.contrasenaActual, user.contrasena)) {
        const newContrasena = bcryptjs.hashSync(data.contrasena, 15);
        await db.Usuario.update(
          {
            contrasena: newContrasena,
          },
          {
            where: {
              id: id,
            },
          }
        );
      } else {
        throw new Error("Contraseña actual incorrecta");
      }
    } else {
      throw new Error("Las contraseñas nuevas no coinciden");
    }
  },
  change: async function (id) {
    const usuario = await this.getByPk(id);
    let rol;
    console.log(usuario);
    if (usuario.id_rol == 1) {
      rol = 2;
    } else {
      rol = 1;
    }
    await db.Usuario.update(
      {
        id_rol: rol,
      },
      {
        where: {
          id: id,
        },
      }
    );
  },
};

// Constructor de usuario
function Usuario({ nombre, apellido, telefono, email, contrasena }, id_imagen) {
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
  this.nombre = filename;
}

export default userService;
