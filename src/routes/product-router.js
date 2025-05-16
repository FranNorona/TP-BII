import { Router } from "express";
import {
  authenticateJWT,
  authorizeRole,
  authorizeMultipleRoles,
} from "../middlewares/auth-middleware.js";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  purchaseProduct,
} from "../controllers/product-controller.js";

const router = Router();

router.post("/", authenticateJWT, authorizeRole("admin"), createProduct);
router.post("/sell", authenticateJWT, authorizeRole("premium"), createProduct);
router.post(
  "/:id/purchase",
  authenticateJWT,
  authorizeMultipleRoles(["user", "premium"]),
  purchaseProduct
);

router.get("/", getAllProducts);
router.get("/:id", getProductById);

router.put("/:id", authenticateJWT, authorizeRole("admin"), updateProduct);
router.delete("/:id", authenticateJWT, authorizeRole("admin"), deleteProduct);

export default router;
