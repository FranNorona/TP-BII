import { userDao } from "../dao/user-dao";
import { createPassword } from "../utils/user-utils";

export const createUserService = async (userData) => {
  try {
    const existingUser = await userDao.getById({ email: userData.email });
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
