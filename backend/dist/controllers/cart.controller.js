"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCart = void 0;
const cart_model_1 = __importDefault(require("../models/cart.model"));
const addToCart = async (req, res) => {
    const userId = req.userId;
    const { products } = req.body;
    if (!products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: "No products provided" });
    }
    try {
        let cart = await cart_model_1.default.findOne({ user: userId });
        if (!cart) {
            // If cart doesn't exist, create a new one
            cart = new cart_model_1.default({ user: userId, products: [] });
        }
        for (const item of products) {
            const { product: productId, quantity, price } = item;
            const existingProductIndex = cart.products.findIndex((p) => p.product.toString() === productId);
            if (existingProductIndex !== -1) {
                // Update quantity if product already in cart
                cart.products[existingProductIndex].quantity += quantity;
            }
            else {
                // Add new product to cart
                cart.products.push({ product: productId, quantity, price });
            }
        }
        // Recalculate cartTotal
        cart.cartTotal = cart.products.reduce((sum, item) => sum + item.price * item.quantity, 0);
        await cart.save();
        // Fetch the updated cart with populated product details
        const populatedCart = await cart_model_1.default.findById(cart._id).populate("products.product");
        res.status(200).json({ message: "Cart updated", cart: populatedCart });
    }
    catch (err) {
        res.status(500).json({ message: "Error adding to cart", error: err.message });
    }
};
exports.addToCart = addToCart;
