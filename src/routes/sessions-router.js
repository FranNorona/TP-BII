import { Router } from "express";
import passport from "../config/passport/passport.js";

const router = Router();

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userData = {
      id: req.user._id,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      role: req.user.role,
    };
    res.status(200).json({ user: userData });
  }
);

export default router;
