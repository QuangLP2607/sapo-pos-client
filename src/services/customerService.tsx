import apiClient from "./apiClient";
import type { Customer, Gender } from "@/interfaces/customer";
import type { ListParams, PaginatedResponse } from "@/interfaces/common";

// ===== Types ================================================================
export type CustomerListItem = Customer;

export type UpdateCustomerPayload = Pick<
  Customer,
  "name" | "phoneNum" | "gender" | "note"
>;

export interface CustomerListParams extends ListParams {
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
  gender?: Gender;
}

// ===== API ==================================================================
const customerApi = {
  async getCustomers(
    params: CustomerListParams
  ): Promise<PaginatedResponse<"customers", CustomerListItem>> {
    const res = await apiClient.get<
      PaginatedResponse<"customers", CustomerListItem>
    >("customers", { params });
    return res.data!;
  },

  async getCustomerById(id: number): Promise<CustomerListItem> {
    const res = await apiClient.get<CustomerListItem>(`customers/${id}`);
    return res.data!;
  },

  async createCustomer(
    payload: UpdateCustomerPayload
  ): Promise<CustomerListItem> {
    const res = await apiClient.post<CustomerListItem>("customers", null, {
      params: payload,
    });
    return res.data!;
  },

  async updateCustomer(
    id: number,
    payload: UpdateCustomerPayload
  ): Promise<CustomerListItem> {
    const res = await apiClient.put<CustomerListItem>(`customers/${id}`, null, {
      params: payload,
    });
    return res.data!;
  },
};

export default customerApi;
