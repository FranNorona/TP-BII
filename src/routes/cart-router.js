import { Router } from "express";
import { authorizeRole } from "../middlewares/auth-middleware.js";
import { addProductToCart } from "../controllers/cart-controller.js";

const router = Router();

router.post(
  "/:userId/product/:productId",
  authorizeRole("user"),
  addProductToCart
);

export default router;
