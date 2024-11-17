"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const usersZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "User Name is Required",
        }),
        email: zod_1.z.string({
            required_error: "Email is Required",
        }),
        password: zod_1.z.string({
            required_error: "Password is Required",
        }),
    }),
});
const loginUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "Email is Required",
        }),
        password: zod_1.z.string({
            required_error: "Password is Required",
        }),
    }),
});
const updatePasswordZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        currentPassword: zod_1.z.string({
            required_error: "Current Password is Required",
        }),
        newPassword: zod_1.z.string({
            required_error: "New Password is Required",
        }),
        confirmPassword: zod_1.z.string({
            required_error: "Confirm Password is Required",
        }),
        userId: zod_1.z.string({
            required_error: "UID is Required",
        }),
    }),
});
exports.UserValidation = {
    usersZodSchema,
    loginUserZodSchema,
    updatePasswordZodSchema,
};
