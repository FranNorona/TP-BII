import { Router } from "express";
import {
  authenticateJWT,
  authorizeRole,
} from "../middlewares/auth-middleware.js";
import { getTickets } from "../controllers/ticket-controller.js";

const router = Router();

router.get("/", authenticateJWT, authorizeRole("user"), getTickets);

export default router;
