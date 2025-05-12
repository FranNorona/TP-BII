import { Router } from "express";
import { authorizeRole } from "../middlewares/auth-middleware.js";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product-controller.js";

const router = Router();

router.post("/", authorizeRole("admin"), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", authorizeRole("admin"), updateProduct);
router.delete("/:id", authorizeRole("admin"), deleteProduct);

export default router;
