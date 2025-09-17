import db from "../data/models/index.js";

export const findAll = async () => {
  return await db.User.findAll();
};

export const findByClause = async (clause) => {
  return await db.User.findOne({ where: clause });
}

export const create = async (data) => {
  return await db.User.create(data);
};

export const update = async (id, data) => {
  const user = await db.User.findByPk(id);
  if (!user) return null;
  return await user.update(data);
};

export const remove = async (id) => {
  const user = await db.User.findByPk(id);
  if (!user) return null;
  await user.destroy();
  return user;
};

export default { findAll, findByClause, create, update, remove };
