"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bookings = void 0;
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Types.ObjectId, required: true, ref: "Users" },
    productId: { type: mongoose_1.Types.ObjectId, required: true, ref: "EBook" },
    transactionId: { type: String, required: true, unique: true },
    cost: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    orderId: { type: String, required: true },
    orderYear: {
        type: String,
        required: true,
        default: () => new Date().getFullYear().toString(),
    },
    paymentType: { type: String, required: true },
});
exports.Bookings = (0, mongoose_1.model)("Bookings", bookingSchema);
