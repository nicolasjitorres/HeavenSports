import productService from "../services/productService.js";
import asyncHandler from "express-async-handler";

export default {
  index: asyncHandler(async (req, res) => {
    const products = await productService.getAll();
    res.status(200).render("products/products", {
      productos: products,
    });
  }),
  about: (req, res) => {
    res.render("info/about.ejs", {});
  },
};