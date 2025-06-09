import Order from "../models/order.model";

export const placeOrder = async (req: any, res: any) => {
  const { products, shippingAddress } = req.body;
  const userId = (req as any).userId;
  try {
    await Order.create({
      products: products,
      shippingAddress: shippingAddress,
      orderBy: userId,
    });
    res.json({
      message: "order place successfully",
    });
  } catch (e: any) {
    console.log("Some error occured" + e.message);
  }
};

export const getAllOrders = async (req: any, res: any) => {
  const userId = (req as any).userId;
  try {
    const orders = await Order.find({ orderBy: userId });
    res.json({ orders: orders });
  } catch (e: any) {
    res.json({ message: "some error occured" } + e);
  }
};

export const delteOrder = (req: any, res: any) => {};
