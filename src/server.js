import express from "express";
import routes from "./routes/index.js";
import { initMongoDB } from "./dao/connection.js";
import { config } from "dotenv";

config({ path: "./config.env" });

const app = express();

initMongoDB()
  .then(() => {
    console.log("Conexión a MongoDB con exito");

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/", routes);

    app.listen(process.env.PORT, () =>
      console.log(`Server activo en puerto ${process.env.PORT}`)
    );
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB:", error);
  });
