export type userRoleEnums = "ADMIN" | "EDITOR" | "CUSTOMER";

export interface IUser {
  name: string;
  email: string;
  profileImage: string;
  password: string;
  address: {
    street: string;
    city: string;
    state: string;
  };
  status: boolean;
  role: userRoleEnums;
  uid: string;
}

export interface IUserWithoutPassword {
  _id: string;
  name: string;
  email: string;
  profileImage: string;
  address: {
    street: string;
    city: string;
    state: string;
  };
  status: boolean;
  role: userRoleEnums;
  uid: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuthUser {
  token: string;
  userData: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IUpdatePassword {
  userId: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IForgetPasswordValidator {
  email: string;
}

export interface IUpdatePasswordValidator {
  email: string;
  password: string;
}
