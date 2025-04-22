import { userDao } from "../dao/user-dao.js";
import { createPassword, comparePassword } from "../utils/user-utils.js";
import "dotenv/config";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

export const createUserService = async (userData) => {
  try {
    const existingUser = await userDao.getBy({ email: userData.email });
    if (existingUser) {
      throw new Error("El email ya esta registrado");
    }

    userData.password = createPassword(userData.password);

    const newUser = await userDao.create(userData);
    return newUser;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
};

export const getUserByIdService = async (userId) => {
  try {
    const user = await userDao.getById({ _id: userId });
    return user;
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error);
    throw error;
  }
};

export const loginUserService = async (email, password) => {
  try {
    const user = await userDao.getBy({ email });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const passwordMatch = comparePassword(password, user.password);
    if (!passwordMatch) {
      throw new Error("Contraseña incorrecta");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return token;
  } catch (error) {
    console.error("Error al realizar login:", error);
    throw error;
  }
};
