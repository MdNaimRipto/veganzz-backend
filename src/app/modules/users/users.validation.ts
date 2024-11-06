import { z } from "zod";

const usersZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "User Name is Required",
    }),
    email: z.string({
      required_error: "Email is Required",
    }),
    password: z.string({
      required_error: "Password is Required",
    }),
  }),
});

const loginUserZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is Required",
    }),
    password: z.string({
      required_error: "Password is Required",
    }),
  }),
});

const updatePasswordZodSchema = z.object({
  body: z.object({
    currentPassword: z.string({
      required_error: "Current Password is Required",
    }),
    newPassword: z.string({
      required_error: "New Password is Required",
    }),
    confirmPassword: z.string({
      required_error: "Confirm Password is Required",
    }),
    userId: z.string({
      required_error: "UID is Required",
    }),
  }),
});

export const UserValidation = {
  usersZodSchema,
  loginUserZodSchema,
  updatePasswordZodSchema,
};
