// src/services/customerService.ts
import apiClient from "./apiClient";
import type { MessageResponse } from "@interfaces/common";

export interface Purchase {
  id: number;
  customerId: number;
  amount: number;
  purchaseDate: string;
  note: string | null;
}

export interface Customer {
  id: number;
  name: string;
  phoneNum: string;
  gender: string;
  note: string | null;
  createdAt?: string;
  lastPurchaseDate?: string;
  totalPurchaseAmount?: number;
  purchases?: Purchase[];
}

export interface GetCustomersParams {
  keyword?: string;
  page?: number;
  size?: number;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  sortDir?: string;
  gender?: string;
}

export interface CustomerListResponse {
  customers: Customer[];
  totalItems: number;
  totalPages: number;
}

const customerApi = {
  // Lấy danh sách khách hàng
  getAll(params: GetCustomersParams) {
    return apiClient.get<CustomerListResponse>("/customers", { params });
  },

  // Thêm khách hàng mới
  add(payload: {
    name: string;
    phoneNum: string;
    gender: string;
    note?: string;
  }) {
    const formData = new FormData();
    formData.append("name", payload.name);
    formData.append("phoneNum", payload.phoneNum);
    formData.append("gender", payload.gender);
    if (payload.note) formData.append("note", payload.note);

    return apiClient.post<Customer | MessageResponse>("/customers", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // Cập nhật khách hàng
  update(
    id: number,
    payload: { name: string; phoneNum: string; gender: string; note?: string }
  ) {
    const formData = new FormData();
    formData.append("name", payload.name);
    formData.append("phoneNum", payload.phoneNum);
    formData.append("gender", payload.gender);
    if (payload.note) formData.append("note", payload.note);

    return apiClient.put<Customer | MessageResponse>(
      `/customers/${id}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  },

  // Lấy thông tin khách hàng theo ID
  getById(id: number) {
    return apiClient.get<Customer>(`/customers/${id}`);
  },

  // Xoá khách hàng
  delete(id: number) {
    return apiClient.delete<MessageResponse>(`/customers/${id}`);
  },
};

export default customerApi;
