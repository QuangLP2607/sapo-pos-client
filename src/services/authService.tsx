// authService.ts
import apiClient from "./apiClient";
import type {
  LoginPayload,
  LoginResponse,
  SignupPayload,
  ResetPasswordPayload,
} from "@interfaces/auth";
import type { MessageResponse } from "@interfaces/common";

const authApi = {
  login(payload: LoginPayload) {
    return apiClient.post<LoginResponse | MessageResponse>(
      "/auth/login",
      payload
    );
  },

  signup(payload: SignupPayload) {
    return apiClient.post<MessageResponse>("/auth/signup", payload);
  },

  async logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    try {
      return await apiClient.post("/auth/logout");
    } catch (e) {
      console.warn("Logout API failed (ignored):", e);
      return null;
    }
  },

  resetPassword(payload: ResetPasswordPayload) {
    return apiClient.post<MessageResponse>("/auth/reset-password", payload);
  },
};

export default authApi;
