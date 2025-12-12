import apiClient from "./apiClient";
import type {
  Customer,
  CustomerPayload,
  CustomerQueryParams,
  CustomerPageResponse,
} from "@interfaces/customer";
import type { MessageResponse } from "@interfaces/common";

// const fakeCustomers: Customer[] = [
//   {
//     id: "1",
//     name: "Nguyễn Văn A",
//     phoneNum: "0901234567",
//     address: "Hà Nội",
//     gender: "Nam",
//     birthday: "1998-05-12",
//   },
//   {
//     id: "2",
//     name: "Trần Thị B",
//     phoneNum: "0912345678",
//     address: "TP Hồ Chí Minh",
//     gender: "Nữ",
//     birthday: "2000-08-20",
//   },
//   {
//     id: "3",
//     name: "Lê Minh C",
//     phoneNum: "0923456789",
//     address: "Đà Nẵng",
//     gender: "Nam",
//     birthday: "1995-02-10",
//   },
//   {
//     id: "4",
//     name: "Phạm Thị D",
//     phoneNum: "0934567890",
//     address: "Cần Thơ",
//     gender: "Nữ",
//     birthday: "1999-11-05",
//   },
// ];

// const customerApi = {
//   getCustomers(query?: string): Promise<{ data: Customer[] }> {
//     const q = query?.trim().toLowerCase() ?? "";

//     const filtered = q
//       ? fakeCustomers.filter(
//           (c) =>
//             c.name.toLowerCase().includes(q) ||
//             c.phoneNum.toLowerCase().includes(q)
//         )
//       : fakeCustomers;

//     return Promise.resolve({ data: filtered });
//   },
// };

const customerApi = {
  // ===== Get all customers (with filters + pagination) =====
  getAll(params: CustomerQueryParams) {
    return apiClient.get<CustomerPageResponse>("/customers", { params });
  },

  // ===== Add customer =====
  add(payload: CustomerPayload) {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) =>
      formData.append(key, value as string)
    );

    return apiClient.post<MessageResponse>("/customers", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // ===== Update customer =====
  update(id: number, payload: CustomerPayload) {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) =>
      formData.append(key, value as string)
    );

    return apiClient.put<MessageResponse>(`/customers/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  getById(id: number) {
    return apiClient.get<Customer>(`/customers/${id}`);
  },
};

export default customerApi;
