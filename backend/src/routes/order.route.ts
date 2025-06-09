import express from "express";
import { getAllOrders, placeOrder } from "../controllers/order.controller";
import { userMiddleware } from "../middleware/userMiddleware";
const router = express.Router();

router.post("/order",userMiddleware, placeOrder);
router.get("/order",userMiddleware, getAllOrders);
export default router;
