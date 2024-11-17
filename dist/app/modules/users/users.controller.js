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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const users_service_1 = require("./users.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const shared_1 = __importDefault(require("../../../shared/shared"));
const user_constant_1 = require("./user.constant");
const pagination_constant_1 = require("../../../constants/pagination.constant");
// User Register
const userRegister = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = __rest(req.body, []);
    const result = yield users_service_1.UserService.userRegister(userInfo);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Registration Successful",
        data: result,
    });
}));
// Verify User
const verifyUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, uid } = req.body;
    const result = yield users_service_1.UserService.verifyUser(email, uid);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Account Verified. Please Login Now!",
        data: result,
    });
}));
// User Login
const userLogin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authCredentials = __rest(req.body, []);
    const result = yield users_service_1.UserService.userLogin(authCredentials);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Login Successful",
        data: result,
    });
}));
// Update User
const updatedUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = __rest(req.body, []);
    const result = yield users_service_1.UserService.updateUser(id, payload);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User Updated Successfully",
        data: result,
    });
}));
// Update User
const updatePassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = __rest(req.body, []);
    const result = yield users_service_1.UserService.updatePassword(payload);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User Updated Successfully",
        data: result,
    });
}));
// Find User For Forgot Password
const findUserForForgotPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const result = yield users_service_1.UserService.findUserForForgotPassword(email);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "OTP has been sent to your email",
        data: result,
    });
}));
// Find User For Forgot Password
const verifyOtpForForgotPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    const result = yield users_service_1.UserService.verifyOtpForForgotPassword(email, otp);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "OTP Successfully Verified!",
        data: result,
    });
}));
// Forgot Password
const forgotPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = __rest(req.body, []);
    const result = yield users_service_1.UserService.forgotPassword(payload);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Password Updated Successfully",
        data: result,
    });
}));
// Get All Users
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, shared_1.default)(req.query, user_constant_1.UserFilterableFields);
    const options = (0, shared_1.default)(req.query, pagination_constant_1.paginationFields);
    const result = yield users_service_1.UserService.gatAllUsers(filters, options);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User's Retrieved Successfully",
        data: result,
    });
}));
exports.UserController = {
    userRegister,
    userLogin,
    verifyUser,
    updatedUser,
    updatePassword,
    findUserForForgotPassword,
    verifyOtpForForgotPassword,
    forgotPassword,
    getAllUsers,
};
