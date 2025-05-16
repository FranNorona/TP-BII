import { userRepository } from "../repository/user-repository.js";
import { createPassword, comparePassword } from "../utils/user-utils.js";
import "dotenv/config";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

export const createUserService = async (userData) => {
  try {
    const existingUser = await userRepository.getUserByEmail(userData.email);
    if (existingUser) {
      throw new Error("El email ya esta registrado");
    }

    userData.password = createPassword(userData.password);
    return await userRepository.createUser(userData);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
};

export const getUserByIdService = async (userId) => {
  try {
    return await userRepository.getUserById(userId);
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error);
    throw error;
  }
};

export const loginUserService = async (email, password) => {
  try {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const passwordMatch = comparePassword(password, user.password);
    if (!passwordMatch) {
      throw new Error("Contraseña incorrecta");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    return token;
  } catch (error) {
    console.error("Error al realizar login:", error);
    throw error;
  }
};
