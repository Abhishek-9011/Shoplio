"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const adminMiddleware_1 = require("../middleware/adminMiddleware");
const router = express_1.default.Router();
router.get("/products", product_controller_1.getProduct);
router.get("/createdProducts", adminMiddleware_1.adminMiddleware, product_controller_1.getCreatedProduct);
router.post("/products", adminMiddleware_1.adminMiddleware, product_controller_1.createProduct);
// @ts-ignore
router.put("/products/:productId", adminMiddleware_1.adminMiddleware, product_controller_1.updateProduct);
// @ts-ignore
router.delete("/products/:productId", adminMiddleware_1.adminMiddleware, product_controller_1.deleteProduct);
exports.default = router;
