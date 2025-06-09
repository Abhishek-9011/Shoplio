import Cart from "../models/cart.model";
import Product from "../models/product.model"; // if you need to fetch product price
import mongoose from "mongoose";

export const addToCart = async (req: any, res: any) => {
  const userId = req.userId;
  const { products } = req.body;

  if (!products || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: "No products provided" });
  }

  const { product: productId, quantity, price } = products[0];

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        products: [{ product: productId, quantity, price }],
      });
    } else {
      const existingProduct = cart.products.find((p: any) =>
        p.product.toString() === productId
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity, price });
      }
    }

    cart.cartTotal = cart.products.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );

    await cart.save();
    res.status(200).json({ message: "Product added to cart", cart });
  } catch (err: any) {
    res.status(500).json({ message: "Error adding to cart", error: err.message });
  }
};
