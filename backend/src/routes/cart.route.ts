import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItem,
} from "../controllers/cart.controller";
import { userMiddleware } from "../middleware/userMiddleware";
const router = express.Router();
router.post("/cart", userMiddleware, addToCart);
router.get("/cart", userMiddleware, getCart);
router.patch("/cart/:productId",userMiddleware, updateCartItem);
router.delete("/cart/:productId",userMiddleware, removeFromCart);
export default router;
