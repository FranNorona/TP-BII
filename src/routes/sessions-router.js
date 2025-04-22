import { Router } from "express";
import { getCurrentUserController } from "../controllers/session-controller.js";
import passport from "../config/passport/passport.js";

const router = Router();

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  getCurrentUserController
);

export default router;
