import { Router } from "express";
import {
  authenticateJWT,
  authorizeRole,
} from "../middlewares/auth-middleware.js";
import {
  addProductToCart,
  purchaseCart,
} from "../controllers/cart-controller.js";

const router = Router();

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
