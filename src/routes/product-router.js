import { Router } from "express";
import { authorizeRole, authorizeMultipleRoles } from "../middlewares/auth-middleware.js";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  purchaseProduct,
} from "../controllers/product-controller.js";

const router = Router();

router.post("/", authorizeRole("admin"), createProduct);
router.post("/sell", authorizeRole("premium"), createProduct);
router.post("/:id/purchase", authorizeMultipleRoles(["user", "premium"]), purchaseProduct);

router.get("/", getAllProducts);
router.get("/:id", getProductById);

router.put("/:id", authorizeRole("admin"), updateProduct);
router.delete("/:id", authorizeRole("admin"), deleteProduct);

export default router;
