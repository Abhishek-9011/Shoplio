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
      cart = new Cart({ user: userId, products: [] });
    }

    for (const item of products) {
      const { product: productId, quantity, price } = item;

      // Validate product exists
      const productExists = await Product.exists({ _id: productId });
      if (!productExists) {
        return res
          .status(404)
          .json({ message: `Product ${productId} not found` });
      }

      const existingProductIndex = cart.products.findIndex(
        (p: any) => p.product.toString() === productId
      );

      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity, price });
      }
    }

    cart.cartTotal = cart.products.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );

    const savedCart = await cart.save();

    // Populate after save
    const populatedCart = await Cart.findById(savedCart._id).populate({
      path: "products.product",
      select: "title description image price discountedPrice stock rating",
    });

    return res.status(200).json({
      message: "Cart updated",
      cart: populatedCart,
    });
  } catch (err: any) {
    console.error("Cart error:", err);
    return res.status(500).json({
      message: "Error adding to cart",
      error: err.message,
    });
  }
};

export const getCart = async (req: any, res: any) => {
  //@ts-ignore
  const userId = req.userId; // Assuming you have userId from authentication middleware

  try {
    // Find the cart and populate product details
    const cart = await Cart.findOne({ user: userId })
      .populate({
        path: "products.product",
        select: "title description image price discountedPrice stock rating",
      })
      .lean(); // Convert to plain JavaScript object

    if (!cart) {
      return res.status(200).json({
        message: "Cart is empty",
        cart: {
          products: [],
          cartTotal: 0,
          user: userId,
        },
      });
    }

    // Transform the populated data for better frontend consumption
    const transformedCart = {
      ...cart,
      products: cart.products.map((item) => ({
        ...item,
        product: {
          //@ts-ignore
          ...item.product,
          // Add any additional transformations here
          //@ts-ignore
        zfinalPrice: item.product.discountedPrice ?? item.product.price
        },
      })),
    };

    return res.status(200).json({
      message: "Cart retrieved successfully",
      cart: transformedCart,
    });
  } catch (err) {
    console.error("Error fetching cart:", err);
    return res.status(500).json({
      message: "Error retrieving cart",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

export const updateCartItem = async (req: any, res: any) => {
  const userId = req.userId;
  const { productId } = req.params;
  const { quantity } = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  if (typeof quantity !== "number" || quantity < 1) {
    return res.status(400).json({ message: "Quantity must be at least 1" });
  }

  try {
    // Verify product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check stock availability
    if (quantity > product.stock) {
      return res.status(400).json({
        message: `Only ${product.stock} items available in stock`,
      });
    }

    // Find and update cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Update quantity
    cart.products[itemIndex].quantity = quantity;

    // Recalculate total
    cart.cartTotal = cart.products.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const updatedCart = await cart.save();

    // Return populated cart
    const populatedCart = await Cart.findById(updatedCart._id).populate({
      path: "products.product",
      select: "title description image price discountedPrice stock rating",
    });

    return res.status(200).json({
      message: "Cart item updated",
      cart: populatedCart,
    });
  } catch (err) {
    console.error("Update cart error:", err);
    return res.status(500).json({
      message: "Error updating cart item",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

export const removeFromCart = async (req: any, res: any) => {
  const userId = req.userId;
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Check if product exists in cart
    const initialLength = cart.products.length;
    //@ts-ignore
    cart.products = cart.products.filter(
      (item) => item.product.toString() !== productId
    );

    if (cart.products.length === initialLength) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Recalculate total
    cart.cartTotal = cart.products.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const updatedCart = await cart.save();

    // Return populated cart if items remain, else return empty cart
    if (updatedCart.products.length > 0) {
      const populatedCart = await Cart.findById(updatedCart._id).populate({
        path: "products.product",
        select: "title description  image price discountedPrice stock rating",
      });

      return res.status(200).json({
        message: "Item removed from cart",
        cart: populatedCart,
      });
    }

    return res.status(200).json({
      message: "Item removed from cart",
      cart: {
        products: [],
        cartTotal: 0,
        user: userId,
        _id: updatedCart._id,
      },
    });
  } catch (err) {
    console.error("Remove from cart error:", err);
    return res.status(500).json({
      message: "Error removing item from cart",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};
