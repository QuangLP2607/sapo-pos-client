import type { ListParams, PaginatedResponse } from "@/interfaces/common";
import type { Type } from "@/interfaces/type";
import apiClient from "./apiClient";

export type TypeListItem = Type;
export type UpdateTypePayload = Pick<Type, "name">;

const typeApi = {
  async getTypes(
    params: ListParams
  ): Promise<PaginatedResponse<"types", TypeListItem>> {
    const res = await apiClient.get<PaginatedResponse<"types", TypeListItem>>(
      "types",
      { params }
    );
    return res.data!;
  },

  async getTypeById(id: number): Promise<TypeListItem> {
    const res = await apiClient.get<TypeListItem>(`types/${id}`);
    return res.data!;
  },

  async createType(payload: UpdateTypePayload): Promise<TypeListItem> {
    const res = await apiClient.post<TypeListItem>("types", null, {
      params: payload,
    });
    return res.data!;
  },

  async updateType(
    id: number,
    payload: UpdateTypePayload
  ): Promise<TypeListItem> {
    const res = await apiClient.put<TypeListItem>(`types/${id}`, null, {
      params: payload,
    });
    return res.data!;
  },
};

export default typeApi;
