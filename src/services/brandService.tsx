import apiClient from "./apiClient";
import type { Brand } from "@/interfaces/brand";
import type { ListParams, PaginatedResponse } from "@/interfaces/common";

// ===== Types ================================================================
export type BrandListItem = Brand;

export type UpdateBrandPayload = Pick<Brand, "name">;

// ===== API ==================================================================
const brandApi = {
  async getBrands(
    params: ListParams
  ): Promise<PaginatedResponse<"brands", BrandListItem>> {
    const res = await apiClient.get<PaginatedResponse<"brands", BrandListItem>>(
      "brands",
      { params }
    );
    return res.data!;
  },

  async getBrandById(id: number): Promise<BrandListItem> {
    const res = await apiClient.get<BrandListItem>(`brands/${id}`);
    return res.data!;
  },

  async createBrand(payload: UpdateBrandPayload): Promise<BrandListItem> {
    const res = await apiClient.post<BrandListItem>("brands", null, {
      params: payload,
    });
    return res.data!;
  },

  async updateBrand(
    id: number,
    payload: UpdateBrandPayload
  ): Promise<BrandListItem> {
    const res = await apiClient.put<BrandListItem>(`brands/${id}`, null, {
      params: payload,
    });
    return res.data!;
  },
};

export default brandApi;
