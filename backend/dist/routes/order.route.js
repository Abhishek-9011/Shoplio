"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("../controllers/order.controller");
const userMiddleware_1 = require("../middleware/userMiddleware");
const router = express_1.default.Router();
router.post("/order", userMiddleware_1.userMiddleware, order_controller_1.placeOrder);
router.get("/order", userMiddleware_1.userMiddleware, order_controller_1.getAllOrders);
exports.default = router;
