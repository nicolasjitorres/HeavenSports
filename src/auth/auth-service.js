import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userRepository from "../user/user-repository.js";
import createError from "http-errors";

const generateToken = (user) => jwt.sign(
  { id: user.id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

export const register = async (data) => {
  const email = data.email.toLowerCase();
  const { password } = data;
  const existingUser = await userRepository.findByClause({ email });
  if (existingUser) throw createError(400, "El email ya está en uso");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userRepository.create({
    email,
    password: hashedPassword,
    active: true,
  });

  return user;
};

export const login = async (data) => {
  const email = data.email.toLowerCase();
  const { password } = data;
  const user = await userRepository.findByClause({ email });
  if (!user) throw createError(404, "Usuario no encontrado");
  if (!user.active) throw createError(403, "Usuario inactivo");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw createError(401, "Contraseña incorrecta");

  const token = generateToken(user);

  return { user, token };
};

export const loginWithGoogle = async (data) => {
  const email = data.email.toLowerCase();
  const { name, sub } = data;
  let user = await userRepository.findByClause({
    provider: "Google",
    provider_id: sub,
  });

  if (!user) {
    user = await userRepository.create({
      name,
      email,
      password: null,
      provider: "Google",
      provider_id: sub,
      active: true,
    });
  }
  if (!user.active) throw createError(403, "Usuario inactivo");

  const token = generateToken(user);

  return { user, token };
};

export default { register, login, loginWithGoogle };
