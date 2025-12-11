import apiClient from "./apiClient";
import type { User } from "@interfaces/user";
import type { MessageResponse } from "@interfaces/common";

const mockUser: User = {
  username: "mockuser",
  phoneNum: "0123456789",
  role: "OWNER",
};

const userApi = {
  getProfile() {
    return { data: mockUser };
    // return apiClient.get<User | MessageResponse>("/user");
  },
};

export default userApi;
