import apiClient from "./apiClient";
import type { User } from "@interfaces/user";
import type { MessageResponse } from "@interfaces/common";

const userApi = {
  getProfile() {
    return apiClient.get<User | MessageResponse>("/user");
  },
};

export default userApi;
