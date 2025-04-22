import {
  loginUserService,
  createUserService,
} from "../services/user-services.js";

export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email y contrasela son requeridos" });
    }

    const token = await loginUserService(email, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const registerUserController = async (req, res) => {
  try {
    const userData = req.body;
    if (!userData.email || !userData.password) {
      return res
        .status(400)
        .json({
          error:
            "Todos los campos son requeridos (email, password, first_name, last_name)",
        });
    }

    const newUser = await createUserService(userData);

    res.status(201).json({ message: "Usuario registrado", user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
