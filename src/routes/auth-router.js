import { Router } from "express";
import { sendResetEmail } from "../services/email-services.js";
import { userRepository } from "../repository/user-repository.js";
import { createPassword } from "../utils/user-utils.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const router = Router();

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    await sendResetEmail(email);
    res.status(200).json({ message: "Correo de recuperacion enviado" });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});

router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await userRepository.getUserByEmail(decoded.email);

    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    const newHashedPassword = createPassword(newPassword);
    if (newHashedPassword === user.password) {
      return res
        .status(400)
        .json({ error: "No puedes usar la contraseña anterior" });
    }

    await userRepository.updateUser(user._id, { password: newHashedPassword });

    res.status(200).json({ message: "Contraseña restablecida correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Token invalido o expirado" });
  }
});

export default router;
