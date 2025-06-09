import Product from "../models/product.model.js";
import { Request, Response } from "express";

export const createProduct = async (req: Request, res: Response) => {
  const { title, description, price, discountedPrice, stock } = req.body;
  //@ts-ignore
  const userId = req.userId;
  console.log(userId);

  try {
    const product = await Product.create({
      title,
      description,
      price,
      discountedPrice,
      createdBy: userId,
      stock,
    });

    res.status(201).json({ message: "Product created successfully", product });
  } catch (e: any) {
    res.status(500).json({ message: `Some error occurred: ${e.message}` });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ products });
  } catch (e: any) {
    console.error("Error fetching products:", e);
    res.status(500).json({ message: `An error occurred: ${e.message}` });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { title, description, price, discountedPrice, stock } = req.body;
  const { productId } = req.params;

  try {
    const result = await Product.updateOne(
      { _id: productId },
      { $set: { title, description, price, discountedPrice, stock } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully" });
  } catch (e: any) {
    res.status(500).json({ message: `Some error occurred: ${e.message}` });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;

  try {
    const result = await Product.deleteOne({ _id: productId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (e: any) {
    res.status(500).json({ message: `Some error occurred: ${e.message}` });
  }
};
