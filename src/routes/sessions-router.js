import { Router } from "express";
import { UserDTO } from "../dto/user-dto.js";
import passport from "../config/passport/passport.js";

const router = Router();

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userDTO = new UserDTO(req.user);
    res.status(200).json({ user: userDTO });
  }
);

export default router;
