import { Router } from "express";
import { loginUserController, registerUserController } from "../controllers/user-controller.js"

const router = Router();

router.post("/login", loginUserController);
router.post("/register", registerUserController);

export default router;