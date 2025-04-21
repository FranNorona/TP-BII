import express from "express";
import routes from "./routes/index.js";
import { config } from "dotenv";

config({ path: "./config.env" });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.listen(process.env.PORT, () =>
  console.log(`Server activo en puerto ${process.env.PORT}`)
);
