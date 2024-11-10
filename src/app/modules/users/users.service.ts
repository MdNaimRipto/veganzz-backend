import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import {
  IAuthUser,
  IForgetPasswordValidator,
  ILoginUser,
  IUpdatePassword,
  IUpdatePasswordValidator,
  IUser,
  IUserFilters,
  IUserWithoutPassword,
} from "./users.interface";
import { Users } from "./users.schema";
import {
  decryptForgotPasswordResponse,
  encryptForgotPasswordResponse,
  generateAuthToken,
  generateUID,
} from "./users.utils";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config/config";
import { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { Redis } from "@upstash/redis";
import {
  IGenericPaginationResponse,
  IPaginationOptions,
} from "../../../interface/pagination";
import { calculatePaginationFunction } from "../../../helpers/paginationHelpers";
import { SortOrder } from "mongoose";

//* User Register Custom
const userRegister = async (payload: IUser): Promise<IAuthUser> => {
  const { email } = payload;

  const isExistsUser = await Users.findOne({ email: email });
  if (isExistsUser) {
    throw new ApiError(httpStatus.CONFLICT, "Email Already Exists");
  }

  const uid = generateUID("CUSTOMER");
  const isUIDExists = await Users.findOne({ uid: uid });
  if (isUIDExists) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "Something went wrong! Please try again",
    );
  }
  payload.uid = uid as string;

  const user = await Users.create(payload);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: config.nodemailer_user,
      pass: config.nodemailer_pass,
    },
  });

  await transporter.sendMail({
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
          href="http://localhost:3000/verifyUser?email=${user.email}&uid=${user.uid}"
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

  return generateAuthToken(user as any);
};

const verifyUser = async (email: string, uid: string): Promise<null> => {
  const isUserExists = await Users.findOne({
    $and: [{ email }, { uid }],
  });

  if (!isUserExists) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "User Dose not Exists!");
  }

  if (isUserExists.status === true) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Account Already Verified!");
  }

  await Users.findOneAndUpdate(
    { $and: [{ email }, { uid }] },
    { status: true },
    {
      new: true,
    },
  );

  return null;
};

//* User Login Custom
const userLogin = async (payload: ILoginUser): Promise<IAuthUser> => {
  const { email, password } = payload;

  const isExists = await Users.findOne({ email: email });

  if (!isExists) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid Email Or Password");
  }

  if (isExists.status === false) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Please Check Email And Verify Your Account First!",
    );
  }

  const checkPassword = await bcrypt.compare(password, isExists.password);

  if (!checkPassword) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid Email Or Password");
  }

  return generateAuthToken(isExists as any);
};

//* Update User
const updateUser = async (
  userID: string,
  payload: Partial<IUser>,
  token: string,
): Promise<IAuthUser | null> => {
  jwtHelpers.jwtVerify(token, config.jwt_secret as Secret);

  const isExistsUser = await Users.findById({ _id: userID });
  if (!isExistsUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Not Found");
  }

  const { role, uid, password, address, ...updatePayload } = payload;

  if (role !== undefined || uid !== undefined || password !== undefined) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Permission Denied! Please Try Again.",
    );
  }

  if (payload.email) {
    const isExists = await Users.findOne({ email: payload.email });
    if (isExists) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        "Email Already Exists! Try Another One.",
      );
    }
    updatePayload.email = payload.email;
  }

  if (address && Object.keys(address).length > 0) {
    Object.keys(address).map(key => {
      const addressKey = `address.${key}`;
      (updatePayload as any)[addressKey] = address[key as keyof typeof address];
    });
  }

  const user = await Users.findOneAndUpdate({ _id: userID }, updatePayload, {
    new: true,
  });

  return generateAuthToken(user as any);
};

// * For Updating the password
const updatePassword = async (
  payload: IUpdatePassword,
  token: string,
): Promise<IAuthUser | null> => {
  jwtHelpers.jwtVerify(token, config.jwt_secret as Secret);

  const { userId, currentPassword, newPassword, confirmPassword } = payload;

  const isExistsUser = await Users.findById({ _id: userId });
  if (!isExistsUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Not Found");
  }

  const isPassMatched = await bcrypt.compare(
    currentPassword,
    isExistsUser.password as string,
  );

  if (!isPassMatched) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Incorrect current password. Please try again.",
    );
  }

  const isPreviousPass = await bcrypt.compare(
    newPassword,
    isExistsUser.password as string,
  );

  if (isPreviousPass || currentPassword === newPassword) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "New Password Cannot be The Previous Password",
    );
  }

  if (newPassword !== confirmPassword) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "New Password and Confirm Password must match.",
    );
  }

  const pass = await bcrypt.hash(newPassword, Number(config.salt_round));
  isExistsUser.password = pass;

  const user = await Users.findOneAndUpdate({ _id: userId }, isExistsUser, {
    new: true,
  });

  return generateAuthToken(user as any);
};

//* Forgot Password Part-1 Find user via email
const findUserForForgotPassword = async (
  email: string,
): Promise<IForgetPasswordValidator> => {
  const user = await Users.findOne(
    { email: email },
    {
      _id: 0,
      email: 1,
    },
  ).lean();
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "Invalid User!");
  }

  const redis = new Redis({
    url: config.redis_host,
    token: config.redis_password,
  });

  const otp = crypto.randomInt(100000, 999999).toString();
  const dataToEncrypt = JSON.stringify({ otp: otp, verified: false });
  const encryptData = encryptForgotPasswordResponse(dataToEncrypt);
  await redis.set(email, encryptData, { ex: 180 });

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: config.nodemailer_user,
      pass: config.nodemailer_pass,
    },
  });

  await transporter.sendMail({
    to: email,
    subject: "OTP For Reset Password",
    text: `Your OTP is ${otp}`,
  });

  return user;
};

//* Forgot Password Part-2
const verifyOtpForForgotPassword = async (email: string, otp: string) => {
  const user = await Users.findOne(
    { email: email },
    {
      _id: 0,
      email: 1,
    },
  ).lean();
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "Invalid User!");
  }

  const redis = new Redis({
    url: config.redis_host,
    token: config.redis_password,
  });

  const encryptData = await redis.get(email);
  if (!encryptData) {
    throw new ApiError(httpStatus.BAD_REQUEST, "OTP expired or not found.");
  }

  const decryptedData = decryptForgotPasswordResponse(encryptData as string);
  const { otp: storedOtp, verified } = JSON.parse(decryptedData);

  if (Number(storedOtp) !== Number(otp)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid OTP!");
  }

  if (verified === true) {
    throw new ApiError(httpStatus.BAD_REQUEST, "OTP Already Verified!");
  }

  const updatedData = JSON.stringify({ otp: storedOtp, verified: true });
  const encryptUpdatedData = encryptForgotPasswordResponse(updatedData);
  await redis.set(email, encryptUpdatedData, { ex: 180 });

  return { message: "OTP verified successfully." };
};

//* Forgot Password Part-3
const forgotPassword = async (
  payload: IUpdatePasswordValidator,
): Promise<string | null> => {
  const { email, password } = payload;
  const isExistsUser = await Users.findOne({ email: email });
  if (!isExistsUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "Invalid User!");
  }

  const redis = new Redis({
    url: config.redis_host,
    token: config.redis_password,
  });

  const encryptedRedisResponse = await redis.get(email);
  if (!encryptedRedisResponse) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Failed to Update! Please try again.",
    );
  }

  const decryptedData = decryptForgotPasswordResponse(
    encryptedRedisResponse as string,
  );
  const { verified } = JSON.parse(decryptedData);

  if (verified !== true) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Failed to Update! Please try again.",
    );
  }

  const isPreviousPass = await bcrypt.compare(
    password,
    isExistsUser.password as string,
  );

  if (isPreviousPass) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "New Password Cannot be The Previous Password",
    );
  }
  const newPass = await bcrypt.hash(password, Number(config.salt_round));
  payload.password = newPass;

  await Users.findOneAndUpdate({ email: email }, payload, {
    new: true,
  });

  await redis.del(email);

  return null;
};

// Get All Users
const gatAllUsers = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericPaginationResponse<IUser[]>> => {
  const andConditions = [];
  if (Object.keys(filters).length) {
    andConditions.push({
      $and: Object.entries(filters).map(([field, value]) => {
        return { [field]: value };
      }),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePaginationFunction(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const checkAndCondition =
    andConditions?.length > 0 ? { $and: andConditions } : {};

  const result = await Users.find(checkAndCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .select("-password");

  const total = await Users.countDocuments(checkAndCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const UserService = {
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
