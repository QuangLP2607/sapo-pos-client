import apiClient from "./apiClient";
import type { User } from "@interfaces/user";
import type { MessageResponse } from "@interfaces/common";

const mockUser: User = {
  username: "mockuser",
  phoneNum: "0123456789",
  role: "OWNER",
};

// {
//     "id": 1,
//     "username": "Owner",
//     "name": null,
//     "phoneNum": "0123",
//     "role": "OWNER",
//     "active": false
// }

const userApi = {
  getProfile() {
    // return { data: mockUser };
    return apiClient.get<User>("users/me");
  },
};

export default userApi;
