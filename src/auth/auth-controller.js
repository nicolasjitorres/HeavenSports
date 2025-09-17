import authService from "./auth-service.js";
import asyncHandler from "express-async-handler";

export const register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);
  res.status(201).json(user);
});

export const login = asyncHandler(async (req, res) => {
  const { user, token } = await authService.login(req.body);
  res.status(200).json({ user, token });
});

export const loginWithGoogle = asyncHandler(async (req, res) => {
  const { user, token } = await authService.loginWithGoogle(req.body);
  res.status(200).json({ user, token });
});

export default { register, login, loginWithGoogle };
