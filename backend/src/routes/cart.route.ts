import express from "express"
import { addToCart } from "../controllers/cart.controller";
import { userMiddleware } from "../middleware/userMiddleware";
const router = express.Router();
router.post("/cart",userMiddleware, addToCart);
export default router