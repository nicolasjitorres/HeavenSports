import productRepository from "./product-repository.js";
import createError from "http-errors";

export const getAllProducts = async () => {
  const products = await productRepository.findAll();
  if (!products || products.length === 0) throw createError(404, "No se encontraron productos");
  return products;
}

export const getProductById = async (id) => {
  const product = await productRepository.findById(id);
  if (!product) throw createError(404, "Producto no encontrado");
  return product;
}

export const createProduct = async (data) => {
  const newProduct = await productRepository.create(data);
  return newProduct;
}

export const updateProduct = async (id, data) => {
  const updatedProduct = await productRepository.update(id, data);
  if (!updatedProduct) throw createError(404, "Producto no encontrado");
  return updatedProduct;
}

export const deleteProduct = async (id) => {
  const deletedProduct = await productRepository.remove(id);
  if (!deletedProduct) throw createError(404, "Producto no encontrado");
  return deletedProduct;
}

export const softDeleteProduct = async (id) => {
  const softDeletedProduct = await productRepository.update(id, { active: false });
  if (!softDeletedProduct) throw createError(404, "Producto no encontrado");
  return softDeletedProduct;
}

export default { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, softDeleteProduct };