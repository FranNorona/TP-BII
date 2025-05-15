import { Router } from "express";
import { authorizeRole } from "../middlewares/auth-middleware.js";
import { addProductToCart, purchaseCart } from "../controllers/cart-controller.js";

const router = Router();

router.post(
  "/:userId/product/:productId",
  authorizeRole("user"),
  addProductToCart
);
router.post("/:cid/purchase", authorizeRole("user"), purchaseCart);

export default router;
