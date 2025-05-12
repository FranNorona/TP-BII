import express from "express";
import userRouter from "./user-router.js";
import sessionRouter from "./sessions-router.js";
import authRouter from "./auth-router.js";
import productRouter from "./product-router.js";
import cartRouter from "./cart-router.js";

const router = express.Router();

router.use("/", userRouter);
router.use("/api/sessions", sessionRouter);
router.use("/", authRouter);
router.use("/api/products", productRouter);
router.use("/api/cart", cartRouter);

export default router;
