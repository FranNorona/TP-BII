import nodemailer from "nodemailer";
import { generateResetToken } from "../utils/token-utils.js";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendResetEmail = async (email) => {
  const token = generateResetToken(email);
  const resetLink = `http://localhost:8080/reset-password?token=${token}`;

  const mailOptions = {
    from: '"Soporte" <noreply@tuapp.com>',
    to: email,
    subject: "Recuperacion de Contraseña",
    html: `<p>Haz clic en el siguiente botón para restablecer tu contraseña:</p>
    <a href="${resetLink}" style="background-color:blue;color:white;padding:10px;border-radius:5px;text-decoration:none;">Restablecer Contraseña</a>
    <p>Este enlace expira en 1 hora. Para prueba en postman es necesario enviar en el body un json con "token" y "newPassword".<br> Aca esta tu token: ${token}</p>`,
  };

  await transporter.sendMail(mailOptions);
};
