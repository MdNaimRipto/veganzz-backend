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
exports.Users = exports.usersSchema = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config/config"));
const user_constant_1 = require("./user.constant");
exports.usersSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profileImage: {
        type: String,
        required: true,
        default: "https://i.ibb.co/dcHVrp8/User-Profile-PNG-Image.png",
    },
    password: { type: String, required: true, unique: true },
    role: {
        type: String,
        required: true,
        enum: user_constant_1.UserRoleEnums,
        default: "CUSTOMER",
    },
    behavior: {
        type: String,
        enum: user_constant_1.UserBehaviorEnums,
        required: true,
        default: "FRIENDLY",
    },
    status: { type: Boolean, required: true, default: false },
    uid: { type: String, required: true, unique: true },
    address: {
        street: { type: String, required: true, default: "Not Updated Yet!" },
        city: { type: String, required: true, default: "Not Updated Yet!" },
        state: { type: String, required: true, default: "Not Updated Yet!" },
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.usersSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.salt_round));
        next();
    });
});
exports.Users = (0, mongoose_1.model)("Users", exports.usersSchema);