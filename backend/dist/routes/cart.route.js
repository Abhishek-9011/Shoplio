"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("../controllers/cart.controller");
const userMiddleware_1 = require("../middleware/userMiddleware");
const router = express_1.default.Router();
router.post("/cart", userMiddleware_1.userMiddleware, cart_controller_1.addToCart);
router.get("/cart", userMiddleware_1.userMiddleware, cart_controller_1.getCart);
router.patch("/cart/:productId", userMiddleware_1.userMiddleware, cart_controller_1.updateCartItem);
router.delete("/cart/:productId", userMiddleware_1.userMiddleware, cart_controller_1.removeFromCart);
exports.default = router;
