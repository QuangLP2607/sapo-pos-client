import apiClient from "./apiClient";
import type { Brand } from "@/interfaces/brand";
import type { ProductImage } from "@/interfaces/productImage";
import type { ProductVariant } from "@/interfaces/productVariant";
import type { ProductOption } from "@/interfaces/productOption";
import type { Type } from "@/interfaces/type";
import type { ListParams, PaginatedResponse } from "@/interfaces/common";

// ===== Types ================================================================
export interface Product {
  id: number;
  name: string;
  summary?: string;
  content?: string;
  status?: "ACTIVE" | "INACTIVE";
  createdAt?: string;
  updatedAt?: string;
  brand: Brand;
  images: ProductImage[];
  variants: ProductVariant[];
  options: ProductOption[];
  types: Type[];
}

export type ProductListItem = Product;

export interface UpdateProductPayload {
  name: string;
  summary?: string;
  content?: string;
  brandId: number;
  variants: Partial<ProductVariant>[];
  options: Array<{
    name: string;
    position: number;
    values: Array<{ value: string; position: number }>;
  }>;
}

// ===== API ==================================================================
const productApi = {
  async getProducts(
    params: ListParams
  ): Promise<PaginatedResponse<"data", ProductListItem>> {
    const res = await apiClient.get<PaginatedResponse<"data", ProductListItem>>(
      "products",
      { params }
    );
    return res.data!;
  },

  async getProductById(id: number): Promise<ProductListItem> {
    const res = await apiClient.get<ProductListItem>(`products/${id}`);
    return res.data!;
  },

  async updateProduct(
    id: number,
    payload: UpdateProductPayload
  ): Promise<ProductListItem> {
    const res = await apiClient.put<ProductListItem>(`products/${id}`, payload);
    return res.data!;
  },

  async deleteProduct(id: number): Promise<void> {
    await apiClient.delete(`products/${id}`);
  },
};

export default productApi;
