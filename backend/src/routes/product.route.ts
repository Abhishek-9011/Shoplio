import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} from "../controllers/product.controller";
import { adminMiddleware } from "../middleware/adminMiddleware";

const router = express.Router();

router.get("/products", adminMiddleware, getProduct);
router.post("/products", adminMiddleware, createProduct);
// @ts-ignore
router.put("/products/:productId", adminMiddleware, updateProduct);
// @ts-ignore
router.delete("/products/:productId", adminMiddleware, deleteProduct);

export default router;
