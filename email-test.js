import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: '"Soporte" <noreply@tuapp.com>',
  to: "destinatario@example.com",
  subject: "Prueba de Nodemailer",
  text: "Este es un correo de prueba para verificar que Nodemailer funciona correctamente.",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Error al enviar el correo:", error);
  } else {
    console.log("Correo enviado:", info.response);
  }
});
