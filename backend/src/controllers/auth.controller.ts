import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const signup = async (req: any, res: any) => {
  const { username, email, password,address, isAdmin } = req.body;
  try {
    await User.create({
      username,
      email,
      address,
      password,
      isAdmin
    });
    res.json({ message: "user signed up succesfully" });
  } catch (error: any) {
    res.json({ message: "some error occured" + error.message });
  }
};

export const signin = async (req: any, res: any) => {
  const { email, password, isAdmin } = req.body;
  try {
    const existingUser = await User.findOne({ email, password, isAdmin });
    if (existingUser) {
      const token = jwt.sign(
        {
          id: existingUser._id,
          isAdmin: isAdmin
        },
        // @ts-ignore
        process.env.JWT_PASSWORD
      );
      res.json({ message: "user signed in successfully", token: token });
    }
  } catch (error: any) {
    res.json({ message: "some error occured" + error.message });
  }
};