"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.createProduct = void 0;
const product_model_js_1 = __importDefault(require("../models/product.model.js"));
const createProduct = async (req, res) => {
    const { title, description, price, discountedPrice, stock } = req.body;
    //@ts-ignore
    const userId = req.userId;
    console.log(userId);
    try {
        const product = await product_model_js_1.default.create({
            title,
            description,
            price,
            discountedPrice,
            createdBy: userId,
            stock,
        });
        res.status(201).json({ message: "Product created successfully", product });
    }
    catch (e) {
        res.status(500).json({ message: `Some error occurred: ${e.message}` });
    }
};
exports.createProduct = createProduct;
const getProduct = async (req, res) => {
    try {
        const products = await product_model_js_1.default.find({});
        res.status(200).json({ products });
    }
    catch (e) {
        console.error("Error fetching products:", e);
        res.status(500).json({ message: `An error occurred: ${e.message}` });
    }
};
exports.getProduct = getProduct;
const updateProduct = async (req, res) => {
    const { title, description, price, discountedPrice, stock } = req.body;
    const { productId } = req.params;
    try {
        const result = await product_model_js_1.default.updateOne({ _id: productId }, { $set: { title, description, price, discountedPrice, stock } });
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product updated successfully" });
    }
    catch (e) {
        res.status(500).json({ message: `Some error occurred: ${e.message}` });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    const { productId } = req.params;
    try {
        const result = await product_model_js_1.default.deleteOne({ _id: productId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product deleted successfully" });
    }
    catch (e) {
        res.status(500).json({ message: `Some error occurred: ${e.message}` });
    }
};
exports.deleteProduct = deleteProduct;
