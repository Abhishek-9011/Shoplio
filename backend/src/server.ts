import express from "express";
import cors from "cors"
import { connectDb } from "./config/dbConnect.js";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import orderRouter from "./routes/order.route.js";
import cartRouter from "./routes/cart.route.js"
const app = express();
app.use(express.json());
app.use(cors());
connectDb();
app.use("/api/v1", userRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", cartRouter);

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
``