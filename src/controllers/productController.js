import productService from "../services/productService.js";
import asyncHandler from "express-async-handler";

export default {
  index: asyncHandler(async (req, res) => {
    const productos = await productService.getAll();
    res.status(200).render("products/products", {
      productos: productos,
    });
  }),
  detail: asyncHandler(async (req, res) => {
    const producto = await productService.getByPk(req.params.id);
    const talles = producto.talles.filter(
      (talle) => talle.ProductoTalle.stock > 0
    );
    res.status(200).render("products/detail", {
      producto: producto,
      tal: talles,
    });
  }),
  addCart: asyncHandler(async (req, res) => {
    if (!req.session.userLogged) {
      req.session.productCart = {
        id: req.params.id,
        data: req.body,
      };
      return res.render("users/login");
    }
    const data = await productService.addToCart(
      req.body,
      req.params.id,
      req.session.userLogged.id
    );
    if (data) {
      res.redirect("/products/cart");
    } else {
      res.redirect(`/products/detail/${req.params.id}`);
    }
  }),
  cart: asyncHandler(async (req, res) => {
    const carrito = await productService.getCartView(req.session.userLogged.id);

    res.render("products/cart", { carrito: carrito });
  }),
  create: asyncHandler(async (req, res) => {
    const { categorias, colores, marcas, talles } =
      await productService.getCreateView();
    res.status(200).render("products/create", {
      cat: categorias,
      col: colores,
      mar: marcas,
      tal: talles,
    });
  }),
  save: asyncHandler(async (req, res) => {
    const idProducto = await productService.saveProduct(req.body, req.files);
    res.redirect(`/products/detail/${idProducto}`);
  }),
  edit: asyncHandler(async (req, res) => {
    const { producto, categorias, colores, marcas } =
      await productService.getEditView(req.params.id);
    res.status(200).render("products/productEdit", {
      producto: producto,
      cat: categorias,
      col: colores,
      mar: marcas,
    });
  }),
  update: asyncHandler(async (req, res) => {
    await productService.edit(req.body, req.params.id);
    res.redirect(`/products/detail/${req.params.id}`);
  }),
  logicDelete: asyncHandler(async (req, res) => {
    await productService.softDelete(req.params.id);
    res.redirect("/products");
  }),
  relations: asyncHandler(async (req, res) => {
    const producto = await productService.getByPk(req.params.id);
    res.render("products/relations/relations.ejs", {
      producto: producto,
    });
  }),
  getAddImage: asyncHandler(async (req, res) => {
    const producto = await productService.getByPk(req.params.id);
    res.render("products/relations/addImage.ejs", {
      producto: producto,
    });
  }),
  addImage: asyncHandler(async (req, res) => {
    await productService.saveImages(req.params.id, req.files);
    res.redirect(`/products/edit/${req.params.id}/relations`);
  }),
  deleteImage: asyncHandler(async (req, res) => {
    await productService.destroyImage(req.params.id, req.params.idImagen);
    res.redirect(`/products/edit/${req.params.id}/relations`);
  }),
  getAddSize: asyncHandler(async (req, res) => {
    const { producto, tallesNA } = await productService.getAddSizeView(
      req.params.id
    );
    res.render("products/relations/addSize.ejs", {
      producto: producto,
      tal: tallesNA,
    });
  }),
  addSize: asyncHandler(async (req, res) => {
    await productService.saveSize(req.params.id, req.body);
    res.redirect(`/products/edit/${req.params.id}/relations`);
  }),
  getEditSize: asyncHandler(async (req, res) => {
    const [prodTal] = await productService.getEditSizeView(req.params);
    res.render("products/relations/editSize.ejs", {
      prodTal: prodTal,
    });
  }),
  editSize: asyncHandler(async (req, res) => {
    await productService.updateSize(req.params, req.body);
    res.redirect(`/products/edit/${req.params.id}/relations`);
  }),
  deleteSize: asyncHandler(async (req, res) => {
    await productService.destroySize(req.params.id, req.params.idTalle);
    res.redirect(`/products/edit/${req.params.id}/relations`);
  }),
};