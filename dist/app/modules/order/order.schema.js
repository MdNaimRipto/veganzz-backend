"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
const mongoose_1 = require("mongoose");
const order_constant_1 = require("./order.constant");
const ordersSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Types.ObjectId, required: true, ref: "Users" },
    productId: { type: mongoose_1.Types.ObjectId, required: true, ref: "EBook" },
    orderDate: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    transactionId: { type: String, required: true },
    location: { type: String, required: true, default: "No Location Found" },
    orderType: { type: String, required: true },
    orderStatus: { type: String, required: true, enum: order_constant_1.OrderStatusEnums },
    pdf: { type: String, required: true, default: null },
});
exports.Orders = (0, mongoose_1.model)("Orders", ordersSchema);
