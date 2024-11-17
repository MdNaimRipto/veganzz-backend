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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const booking_schema_1 = require("./booking.schema");
const users_schema_1 = require("../users/users.schema");
const eBook_schema_1 = require("../eBook/eBook.schema");
const booking_utils_1 = require("./booking.utils");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const bookProducts = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId } = payload;
    const isUserExists = yield users_schema_1.Users.findOne({ _id: userId }, { _id: 1 });
    if (!isUserExists) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User Does not Exists!");
    }
    const isProductExists = yield eBook_schema_1.EBook.findOne({ _id: productId }, { _id: 1 });
    if (!isProductExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Product Does not Exists!");
    }
    const isProductAlreadyBooked = yield booking_schema_1.Bookings.findOne({
        $and: [{ userId }, productId],
    });
    if (isProductAlreadyBooked) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Product Already Booked!");
    }
    const orderId = (0, booking_utils_1.generateOrderId)();
    payload.orderId = String(orderId);
    const result = yield booking_schema_1.Bookings.create(payload);
    return result;
});
const getAllBookedProducts = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const andConditions = [];
    if (Object.keys(filters).length) {
        andConditions.push({
            $and: Object.entries(filters).map(([field, value]) => {
                return { [field]: value };
            }),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelpers_1.calculatePaginationFunction)(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const checkAndCondition = (andConditions === null || andConditions === void 0 ? void 0 : andConditions.length) > 0 ? { $and: andConditions } : {};
    const result = yield booking_schema_1.Bookings.find(checkAndCondition)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield booking_schema_1.Bookings.countDocuments(checkAndCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getUsersAllBookedProducts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_schema_1.Bookings.find({ userId });
    return result;
});
exports.BookingsService = {
    bookProducts,
    getAllBookedProducts,
    getUsersAllBookedProducts,
};
