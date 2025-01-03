"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const order_schema_1 = require("./order.schema");
const getAllOrders = (orderStatus) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_schema_1.Orders.find({ orderStatus }).populate([
        {
            path: "userId",
            select: "_id name email",
        },
        {
            path: "productId",
            select: "_id name",
        },
    ]);
    return orders;
});
const getUserOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_schema_1.Orders.find({ userId }).populate({
        path: "productId",
        select: "_id name image",
    });
    return orders;
});
exports.OrdersService = {
    getAllOrders,
    getUserOrders,
};
