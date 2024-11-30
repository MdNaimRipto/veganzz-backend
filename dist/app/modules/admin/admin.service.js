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
exports.AdminService = void 0;
const order_schema_1 = require("../order/order.schema");
const reviews_schema_1 = require("../reviews/reviews.schema");
const users_schema_1 = require("../users/users.schema");
const userCounts = () => __awaiter(void 0, void 0, void 0, function* () {
    const abusiveAccounts = yield users_schema_1.Users.countDocuments({ behavior: "ABUSIVE" });
    const fakeAccounts = yield users_schema_1.Users.countDocuments({ behavior: "FAKE" });
    const spammingAccounts = yield users_schema_1.Users.countDocuments({
        behavior: "SPAMMING",
    });
    const friendlyAccounts = yield users_schema_1.Users.countDocuments({
        behavior: "FRIENDLY",
    });
    return {
        abusiveAccounts,
        fakeAccounts,
        spammingAccounts,
        friendlyAccounts,
    };
});
const reviewCounts = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalReviews = yield reviews_schema_1.Reviews.countDocuments();
    const pendingReviews = yield reviews_schema_1.Reviews.countDocuments({
        reviewStatus: "PENDING",
    });
    const publishedReviews = yield reviews_schema_1.Reviews.countDocuments({
        reviewStatus: "APPROVED",
    });
    const rejectedReviews = yield reviews_schema_1.Reviews.countDocuments({
        reviewStatus: "BLOCKED",
    });
    return {
        totalReviews,
        pendingReviews,
        publishedReviews,
        rejectedReviews,
    };
});
const orderCounts = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalSales = yield order_schema_1.Orders.aggregate([
        {
            $group: {
                _id: null,
                totalSales: { $sum: { $multiply: ["$price", "$quantity"] } },
            },
        },
    ]);
    const totalOrders = yield order_schema_1.Orders.countDocuments();
    const pendingOrders = yield order_schema_1.Orders.countDocuments({ orderStatus: "PENDING" });
    const preparingOrders = yield order_schema_1.Orders.countDocuments({
        orderStatus: "PREPARING",
    });
    const onTheWayOrders = yield order_schema_1.Orders.countDocuments({
        orderStatus: "ON_THE_WAY",
    });
    const deliveredOrders = yield order_schema_1.Orders.countDocuments({
        orderStatus: "DELIVERED",
    });
    const cancelOrders = yield order_schema_1.Orders.countDocuments({
        orderStatus: "CANCELED",
    });
    return {
        totalSales: totalSales.length > 0 ? totalSales[0].totalSales : 0,
        totalOrders,
        pendingOrders,
        preparingOrders,
        onTheWayOrders,
        deliveredOrders,
        cancelOrders,
    };
});
exports.AdminService = {
    userCounts,
    reviewCounts,
    orderCounts,
};
