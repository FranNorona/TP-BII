import { Router } from "express";
import {
  authenticateJWT,
  authorizeRole,
} from "../middlewares/auth-middleware.js";
import {
  addProductToCart,
  purchaseCart,
  getCartByUserId,
} from "../controllers/cart-controller.js";

const router = Router();
router.get("/:userId", authenticateJWT, authorizeRole("user"), getCartByUserId);
router.post(
  "/:userId/product/:productId",
  authenticateJWT,
  authorizeRole("user"),
  addProductToCart
);
router.post(
  "/:cid/purchase",
  authenticateJWT,
  authorizeRole("user"),
  purchaseCart
);

export default router;
