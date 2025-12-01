import apiClient from "./apiClient";
import type { User } from "@interfaces/user";
import type { MessageResponse } from "@interfaces/common";

const mockUser: User = {
  username: "mockuser",
  phoneNum: "0123456789",
  role: "SALES",
};

const userApi = {
  getProfile() {
    //  return apiClient.get<User | MessageResponse>("/user");
    return { data: mockUser };
  },
};

export default userApi;
