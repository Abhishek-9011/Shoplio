"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const connectDb = async () => {
    try {
        //@ts-ignore
        await mongoose_1.default.connect(process.env.MONGO_DB_URL);
        console.log("Connected to DB");
    }
    catch (e) {
        console.log(`some error occured during connection ${e}`);
    }
};
exports.connectDb = connectDb;
