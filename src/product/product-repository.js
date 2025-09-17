import db from "../data/models/index.js";

export const findAll = async () => {
  return await db.Product.findAll();
};

export const findById = async (id) => {
  return await db.Product.findByPk(id);
};

export const create = async (data) => {
  return await db.Product.create(data);
};

export const update = async (id, data) => {
  const product = await db.Product.findByPk(id);
  if (!product) return null;
  return await product.update(data);
};

export const remove = async (id) => {
  const product = await db.Product.findByPk(id);
  if (!product) return null;
  await product.destroy();
  return product;
};

export default { findAll, findById, create, update, remove };
