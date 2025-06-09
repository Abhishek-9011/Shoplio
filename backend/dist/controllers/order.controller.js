"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delteOrder = exports.getAllOrders = exports.placeOrder = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
const placeOrder = async (req, res) => {
    const { products, shippingAddress } = req.body;
    const userId = req.userId;
    try {
        await order_model_1.default.create({
            products: products,
            shippingAddress: shippingAddress,
            orderBy: userId,
        });
        res.json({
            message: "order place successfully",
        });
    }
    catch (e) {
        console.log("Some error occured" + e.message);
    }
};
exports.placeOrder = placeOrder;
const getAllOrders = async (req, res) => {
    const userId = req.userId;
    try {
        const orders = await order_model_1.default.find({ orderBy: userId });
        res.json({ orders: orders });
    }
    catch (e) {
        res.json({ message: "some error occured" } + e);
    }
};
exports.getAllOrders = getAllOrders;
const delteOrder = (req, res) => { };
exports.delteOrder = delteOrder;
