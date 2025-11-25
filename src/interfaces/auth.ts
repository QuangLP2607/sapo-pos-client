import type { Role } from "./common";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  username: string;
  role: Role;
  token: string;
  expiresIn: number;
}

export interface SignupPayload {
  username: string;
  phoneNum: string;
  password: string;
  role: Role;
}

export interface ResetPasswordPayload {
  phoneNum: string;
  newPassword: string;
}
