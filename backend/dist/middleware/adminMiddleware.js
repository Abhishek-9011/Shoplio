"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const adminMiddleware = (req, res, next) => {
    const token = req.headers["authorization"];
    // @ts-ignore
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_PASSWORD);
    // @ts-ignore
    if (decoded && decoded.isAdmin) {
        //@ts-ignore
        req.userId = decoded.id;
        next();
    }
    else {
        res.status(403).json({
            message: "You are not logged in",
        });
    }
};
exports.adminMiddleware = adminMiddleware;
