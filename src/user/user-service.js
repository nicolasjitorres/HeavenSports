import createError from "http-errors";
import userRepository from "./user-repository.js";

export const updateUser = async (id, userData) => {
  const updatedUser = await userRepository.update(id, userData);
  if (!updatedUser) throw createError(404, "Usuario no encontrado");
  return updatedUser;
};

export const getAllUsers = async () => {
  const users = await userRepository.findAll();
  if (!users || users.length === 0)
    throw createError(404, "No se encontraron usuarios");
  return users;
};

export const getUserById = async (id) => {
  const user = await userRepository.findByClause({ id });
  if (!user) throw createError(404, "Usuario no encontrado");
  return user;
};

export const deleteUser = async (id) => {
  const deletedUser = await userRepository.remove(id);
  if (!deletedUser) throw createError(404, "Usuario no encontrado");
  return deletedUser;
};

export const softDelete = async (id) => {
  const softDeletedUser = await userRepository.update(id, { active: false });
  if (!softDeletedUser) throw createError(404, "Usuario no encontrado");
  return softDeletedUser;
};

export default { updateUser, getAllUsers, getUserById, deleteUser, softDelete };
