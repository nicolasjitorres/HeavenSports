import userService from "../services/userService.js";
import asyncHandler from "express-async-handler";

const controller = {
  login: (req, res) => {
    res.render("users/login");
  },
  signIn: asyncHandler(async (req, res) => {
    const id = await userService.signIn(req.body);
    if (id) {
      const user = await userService.getByPk(id);
      req.session.userLogged = {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        telefono: user.telefono,
        email: user.email,
        id_rol: user.id_rol,
        imagen: user.imagen.nombre,
      };

      if (req.body.recordar) {
        res.cookie("sesionUserRemember", user.sesion, {
          maxAge: 1000 * 60 * 15 /* 15 minutos */,
          httpOnly: true,
          secure: true,
        });
      }
      res.redirect(`/users/profile`);
    } else {
      res.render("users/login", {
        error: "Credenciales invalidas",
      });
    }
  }),
  logout: asyncHandler(async (req, res) => {
    await userService.logoutUser(req.cookies.sesionUserRemember);
    res.clearCookie("sesionUserRemember");
    req.session.destroy();
    res.redirect("/");
  }),
  register: (req, res) => {
    res.render("users/register");
  },
  save: asyncHandler(async (req, res) => {
    // Devuelve true si el usuario pudo ser registrado, caso contrario devuelve false

    const user = await userService.saveUser(req.body, req.file);
    if (user.userSaved) {
      console.log("Usuario registrado correctamente");
      res.redirect("/users/login");
    } else {
      res.render("users/register.ejs", {
        usuario: user.newData,
      });
    }
  }),
  destroyUser: asyncHandler(async (req, res) => {
    await userService.deleteUser(req.params.id);
    res.redirect("/users");
  }),
  softDelete: asyncHandler(async (req, res) => {
    await userService.softDelete(req.params.id);
    res.clearCookie("emailUserRemember");
    req.session.destroy();
    res.redirect("/");
  }),
  usuarios: asyncHandler(async (req, res) => {
    const usuarios = await userService.getAll();
    res.render("users/usuarios", {
      usuarios: usuarios,
    });
  }),
  profile: asyncHandler(async (req, res) => {
    const usuario = await userService.getByPk(req.session.userLogged.id);
    res.render("users/profile", {
      usuario: usuario,
    });
  }),
  getAdminEditView: asyncHandler(async (req, res) => {
    const usuario = await userService.getByPk(req.params.id);
    res.render("users/userEditAdmin", {
      usuario: usuario,
    });
  }),
  changeCategory: asyncHandler(async (req, res) => {
    await userService.change(req.params.id);
    res.redirect(`/users/userEdit/${req.params.id}`);
  }),
  edit: asyncHandler(async (req, res) => {
    const usuario = await userService.getByPk(req.session.userLogged.id);
    res.render("users/userEdit", {
      usuario: usuario,
    });
  }),
  update: asyncHandler(async (req, res) => {
    await userService.edit(req.body, req.session.userLogged.id, req.file);
    res.redirect("/users/profile");
  }),
  changePass: (req, res) => {
    res.render("users/changePass", { idUsuario: req.session.userLogged.id });
  },
  updatePass: asyncHandler(async (req, res) => {
    await userService.updatePass(req.session.userLogged.id, req.body);
    const usuario = await userService.getByPk(req.session.userLogged.id);
    res.render("users/profile", {
      usuario: usuario,
      message: "Contraseña actualizada",
    });
  }),
};

export default controller;
