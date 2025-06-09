"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbConnect_js_1 = require("./config/dbConnect.js");
const user_route_js_1 = __importDefault(require("./routes/user.route.js"));
const product_route_js_1 = __importDefault(require("./routes/product.route.js"));
const order_route_js_1 = __importDefault(require("./routes/order.route.js"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, dbConnect_js_1.connectDb)();
app.use("/api/v1", user_route_js_1.default);
app.use("/api/v1", product_route_js_1.default);
app.use("/api/v1", order_route_js_1.default);
app.listen(3000, () => {
    console.log(`Server running on port 3000`);
});
