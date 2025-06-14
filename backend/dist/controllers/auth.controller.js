"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const user_model_js_1 = __importDefault(require("../models/user.model.js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const signup = async (req, res) => {
    const { username, email, password, address, isAdmin } = req.body;
    try {
        await user_model_js_1.default.create({
            username,
            email,
            address,
            password,
            isAdmin
        });
        res.json({ message: "user signed up succesfully" });
    }
    catch (error) {
        res.json({ message: "some error occured" + error.message });
    }
};
exports.signup = signup;
const signin = async (req, res) => {
    const { email, password, isAdmin } = req.body;
    try {
        const existingUser = await user_model_js_1.default.findOne({ email, password, isAdmin });
        if (existingUser) {
            const token = jsonwebtoken_1.default.sign({
                id: existingUser._id,
                isAdmin: isAdmin
            }, 
            // @ts-ignore
            process.env.JWT_PASSWORD);
            res.json({ message: "user signed in successfully", token: token });
        }
    }
    catch (error) {
        res.json({ message: "some error occured" + error.message });
    }
};
exports.signin = signin;
