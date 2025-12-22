import apiClient from "./apiClient";
import type { User } from "@/interfaces/user";
import type { ListParams, PaginatedResponse } from "@/interfaces/common";

// ===== Types ================================================================
export type UserListItem = User;

export type UpdateUserPayload = Pick<
  User,
  "username" | "name" | "phoneNum" | "role" | "isActive"
>;

// ===== API ==================================================================
const userApi = {
  async getProfile(): Promise<User> {
    const res = await apiClient.get<User>("users/me");
    return res.data!;
  },

  async getUsers(
    params: ListParams
  ): Promise<PaginatedResponse<"users", User>> {
    const res = await apiClient.get<PaginatedResponse<"users", User>>("users", {
      params,
    });

    return res.data!;
  },

  async getUserById(id: number): Promise<UserListItem> {
    const res = await apiClient.get<UserListItem>(`users/${id}`);
    return res.data!;
  },

  async updateUser(
    id: number,
    payload: UpdateUserPayload
  ): Promise<UserListItem> {
    const res = await apiClient.put<UserListItem>(`users/${id}`, null, {
      params: payload,
    });
    return res.data!;
  },
};

export default userApi;
