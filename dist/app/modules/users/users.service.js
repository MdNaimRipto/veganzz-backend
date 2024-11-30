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
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const users_schema_1 = require("./users.schema");
const users_utils_1 = require("./users.utils");
const config_1 = __importDefault(require("../../../config/config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const redis_1 = require("@upstash/redis");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
//* User Register Custom
const userRegister = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = payload;
    const isExistsUser = yield users_schema_1.Users.findOne({ email: email });
    if (isExistsUser) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, "Email Already Exists");
    }
    const uid = (0, users_utils_1.generateUID)("CUSTOMER");
    const isUIDExists = yield users_schema_1.Users.findOne({ uid: uid });
    if (isUIDExists) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, "Something went wrong! Please try again");
    }
    payload.uid = uid;
    const user = yield users_schema_1.Users.create(payload);
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: config_1.default.nodemailer_user,
            pass: config_1.default.nodemailer_pass,
        },
    });
    yield transporter.sendMail({
        to: email,
        subject: "Welcome to Veganzz! Please Verify Your Email",
        html: `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
      <h2 style="color: #27ae60; text-align: center;">Welcome to Veganzz!</h2>
      <p>Hello ${user.name},</p>
      <p>Thank you for registering with Veganzz. We're excited to have you join our community!</p>

      <p>Please verify your email address by clicking the link below:</p>

      <div style="text-align: center; margin: 20px 0;">
        <a
          href="http://localhost:3000/auth/verify?email=${user.email}&uid=${user.uid}"
          style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #27ae60; text-decoration: none; border-radius: 4px; font-size: 16px;">
          Verify Email
        </a>
      </div>

      <p>If you didn’t create an account with Veganzz, please ignore this email.</p>

      <p>Best Regards,<br>Veganzz Team</p>

      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
      <p style="font-size: 12px; color: #777;">This is an automated message, please do not reply to this email.</p>
    </div>
  `,
    });
    return (0, users_utils_1.generateAuthToken)(user);
});
const verifyUser = (email, uid) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield users_schema_1.Users.findOne({
        $and: [{ email }, { uid }],
    });
    if (!isUserExists) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User Dose not Exists!");
    }
    if (isUserExists.status === true) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Account Already Verified!");
    }
    yield users_schema_1.Users.findOneAndUpdate({ $and: [{ email }, { uid }] }, { status: true }, {
        new: true,
    });
    return null;
});
//* User Login Custom
const userLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isExists = yield users_schema_1.Users.findOne({ email: email });
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid Email Or Password");
    }
    if (isExists.status === false) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Please Check Email And Verify Your Account First!");
    }
    const checkPassword = yield bcrypt_1.default.compare(password, isExists.password);
    if (!checkPassword) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid Email Or Password");
    }
    return (0, users_utils_1.generateAuthToken)(isExists);
});
//* Update User
const updateUser = (userID, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistsUser = yield users_schema_1.Users.findById({ _id: userID });
    if (!isExistsUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User Not Found");
    }
    const { role, uid, password, address } = payload, updatePayload = __rest(payload, ["role", "uid", "password", "address"]);
    if (role !== undefined || uid !== undefined || password !== undefined) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Permission Denied! Please Try Again.");
    }
    if (payload.email) {
        const isExists = yield users_schema_1.Users.findOne({ email: payload.email });
        if (isExists) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Email Already Exists! Try Another One.");
        }
        updatePayload.email = payload.email;
    }
    if (address && Object.keys(address).length > 0) {
        Object.keys(address).map(key => {
            const addressKey = `address.${key}`;
            updatePayload[addressKey] = address[key];
        });
    }
    const user = yield users_schema_1.Users.findOneAndUpdate({ _id: userID }, updatePayload, {
        new: true,
    });
    return (0, users_utils_1.generateAuthToken)(user);
});
// * For Updating the password
const updatePassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, currentPassword, newPassword, confirmPassword } = payload;
    const isExistsUser = yield users_schema_1.Users.findById({ _id: userId });
    if (!isExistsUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User Not Found");
    }
    const isPassMatched = yield bcrypt_1.default.compare(currentPassword, isExistsUser.password);
    if (!isPassMatched) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Incorrect current password. Please try again.");
    }
    const isPreviousPass = yield bcrypt_1.default.compare(newPassword, isExistsUser.password);
    if (isPreviousPass || currentPassword === newPassword) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "New Password Cannot be The Previous Password");
    }
    if (newPassword !== confirmPassword) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "New Password and Confirm Password must match.");
    }
    const pass = yield bcrypt_1.default.hash(newPassword, Number(config_1.default.salt_round));
    isExistsUser.password = pass;
    const user = yield users_schema_1.Users.findOneAndUpdate({ _id: userId }, isExistsUser, {
        new: true,
    });
    return (0, users_utils_1.generateAuthToken)(user);
});
//* Forgot Password Part-1 Find user via email
const findUserForForgotPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_schema_1.Users.findOne({ email: email }, {
        _id: 0,
        email: 1,
    }).lean();
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Invalid User!");
    }
    const redis = new redis_1.Redis({
        url: config_1.default.redis_host,
        token: config_1.default.redis_password,
    });
    const otp = crypto_1.default.randomInt(100000, 999999).toString();
    const dataToEncrypt = JSON.stringify({ otp: otp, verified: false });
    const encryptData = (0, users_utils_1.encryptForgotPasswordResponse)(dataToEncrypt);
    yield redis.set(email, encryptData, { ex: 180 });
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: config_1.default.nodemailer_user,
            pass: config_1.default.nodemailer_pass,
        },
    });
    yield transporter.sendMail({
        to: email,
        subject: "OTP For Reset Password",
        text: `Your OTP is ${otp}`,
    });
    return user;
});
//* Forgot Password Part-2
const verifyOtpForForgotPassword = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_schema_1.Users.findOne({ email: email }, {
        _id: 0,
        email: 1,
    }).lean();
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Invalid User!");
    }
    const redis = new redis_1.Redis({
        url: config_1.default.redis_host,
        token: config_1.default.redis_password,
    });
    const encryptData = yield redis.get(email);
    if (!encryptData) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "OTP expired or not found.");
    }
    const decryptedData = (0, users_utils_1.decryptForgotPasswordResponse)(encryptData);
    const { otp: storedOtp, verified } = JSON.parse(decryptedData);
    if (Number(storedOtp) !== Number(otp)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Invalid OTP!");
    }
    if (verified === true) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "OTP Already Verified!");
    }
    const updatedData = JSON.stringify({ otp: storedOtp, verified: true });
    const encryptUpdatedData = (0, users_utils_1.encryptForgotPasswordResponse)(updatedData);
    yield redis.set(email, encryptUpdatedData, { ex: 180 });
    return { message: "OTP verified successfully." };
});
//* Forgot Password Part-3
const forgotPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isExistsUser = yield users_schema_1.Users.findOne({ email: email });
    if (!isExistsUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Invalid User!");
    }
    const redis = new redis_1.Redis({
        url: config_1.default.redis_host,
        token: config_1.default.redis_password,
    });
    const encryptedRedisResponse = yield redis.get(email);
    if (!encryptedRedisResponse) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to Update! Please try again.");
    }
    const decryptedData = (0, users_utils_1.decryptForgotPasswordResponse)(encryptedRedisResponse);
    const { verified } = JSON.parse(decryptedData);
    if (verified !== true) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to Update! Please try again.");
    }
    const isPreviousPass = yield bcrypt_1.default.compare(password, isExistsUser.password);
    if (isPreviousPass) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "New Password Cannot be The Previous Password");
    }
    const newPass = yield bcrypt_1.default.hash(password, Number(config_1.default.salt_round));
    payload.password = newPass;
    yield users_schema_1.Users.findOneAndUpdate({ email: email }, payload, {
        new: true,
    });
    yield redis.del(email);
    return null;
});
// Get All Users
const gatAllUsers = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield users_schema_1.Users.find(checkAndCondition)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .select("-password");
    const total = yield users_schema_1.Users.countDocuments(checkAndCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
exports.UserService = {
    userRegister,
    verifyUser,
    userLogin,
    updateUser,
    updatePassword,
    findUserForForgotPassword,
    verifyOtpForForgotPassword,
    forgotPassword,
    gatAllUsers,
};
