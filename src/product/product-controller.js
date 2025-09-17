import productService from "./product-service.js";
import asyncHandler from "express-async-handler";

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await productService.getAllProducts();
  res.status(200).json(products);
});

export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await productService.getProductById(id);
  res.status(200).json(product);
});

export const createProduct = asyncHandler(async (req, res) => {
  const product = await productService.createProduct(req.body);
  res.status(201).json(product);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await productService.updateProduct(id, req.body);
  res.status(200).json(product);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await productService.deleteProduct(id);
  res.status(202).send({ message: "Producto eliminado corretamente" });
});

export const softDeleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await productService.softDeleteProduct(id);
  res.status(202).send({ message: "Producto desactivado corretamente" });
});

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  softDeleteProduct,
};
