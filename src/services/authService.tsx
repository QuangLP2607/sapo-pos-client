import apiClient from "./apiClient";
import type {
  LoginPayload,
  LoginResponse,
  SignupPayload,
  ResetPasswordPayload,
} from "@interfaces/auth";
import type { MessageResponse } from "@interfaces/common";

const authApi = {
  // ===== Login =====
  login(payload: LoginPayload) {
    return apiClient.post<LoginResponse | MessageResponse>(
      "/auth/login",
      payload
    );
  },

  // ===== Signup (OWNER) =====
  signup(payload: SignupPayload) {
    return apiClient.post<MessageResponse>("/auth/signup", payload);
  },

  // ===== Logout =====
  logout() {
    return apiClient.post<MessageResponse>("/auth/logout");
  },

  // ===== Reset password (OWNER) =====
  resetPassword(payload: ResetPasswordPayload) {
    return apiClient.post<MessageResponse>("/auth/reset-password", payload);
  },
};

export default authApi;
