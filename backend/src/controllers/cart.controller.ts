import Cart from "../models/cart.model";
import Product from "../models/product.model";
import mongoose from "mongoose";

export const addToCart = async (req: any, res: any) => {
  const userId = req.userId;
  const { products } = req.body;

  if (!products || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: "No products provided" });
  }

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // If cart doesn't exist, create a new one
      cart = new Cart({ user: userId, products: [] });
    }

    for (const item of products) {
      const { product: productId, quantity, price } = item;

      const existingProductIndex = cart.products.findIndex(
        (p: any) => p.product.toString() === productId
      );

      if (existingProductIndex !== -1) {
        // Update quantity if product already in cart
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        // Add new product to cart
        cart.products.push({ product: productId, quantity, price });
      }
    }

    // Recalculate cartTotal
    cart.cartTotal = cart.products.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );

    await cart.save();

    // Fetch the updated cart with populated product details
    const populatedCart = await Cart.findById(cart._id).populate("products.product");

    res.status(200).json({ message: "Cart updated", cart: populatedCart });
  } catch (err: any) {
    res.status(500).json({ message: "Error adding to cart", error: err.message });
  }
};
