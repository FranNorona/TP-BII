import express from "express";
import userRouter from "./user-router.js";
import sessionRouter from "./sessions-router.js";

const router = express.Router()

router.use("/", userRouter);
router.use("/api/sessions", sessionRouter);

export default router;