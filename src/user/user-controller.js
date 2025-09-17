import userService from "./user-service.js";
import asyncHandler from "express-async-handler";

export const updateUser = asyncHandler(async (req, res) => {
  const updatedUser = await userService.updateUser(req.params.id, req.body);
  res.status(200).json(updatedUser);
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await userService.getAllUsers();
  res.status(200).json(users);
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.status(200).json(user);
});

export const deleteUser = asyncHandler(async (req, res) => {
  await userService.deleteUser(req.params.id);
  res.status(202).send({ message: "Usuario eliminado corretamente" });
});

export const softDelete = asyncHandler(async (req, res) => {
  await userService.softDelete(req.params.id);
  res.status(202).send({ message: "Usuario desactivado corretamente" });
});

export default { updateUser, getAllUsers, getUserById, deleteUser, softDelete };
