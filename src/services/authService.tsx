import apiClient from "./apiClient";
import type { User } from "@/interfaces/user";

// ===== Types ================================================================
export interface LoginPayload {
  username: string;
  password: string;
}

export interface SignupPayload
  extends Pick<User, "username" | "name" | "phoneNum" | "role" | "isActive"> {
  password: string;
}

export interface ResetPasswordPayload {
  phoneNum: string;
  newPassword: string;
}

export interface LoginResponse {
  user: Omit<User, "password">;
  token: string;
  expiresIn: number;
}

// ===== API ==================================================================
const authApi = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const res = await apiClient.post<LoginResponse>("/auth/login", payload);
    return res.data!;
  },

  async signup(payload: SignupPayload): Promise<LoginResponse> {
    const res = await apiClient.post<LoginResponse>("/auth/signup", payload);
    return res.data!;
  },

  async logout(): Promise<void> {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    void apiClient.post("/auth/logout");
  },

  async resetPassword(payload: ResetPasswordPayload) {
    const res = await apiClient.post("/auth/reset-password", payload);
    return res.data!;
  },
};

export default authApi;
