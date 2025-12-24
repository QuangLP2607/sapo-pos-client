import apiClient from "@/services/apiClient";
import {
  type ProductResponse,
  type ProductPaginatedResponse,
} from "./product.responses";
import type {
  ProductCreateRequest,
  ProductUpdateRequest,
} from "./product.request";

export interface SearchParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: string;
  search?: string;
}

const productApi = {
  createProduct(productCreateRequest: ProductCreateRequest, images: File[]) {
    const formData = new FormData();
    formData.append("product", JSON.stringify(productCreateRequest));
    images.forEach((image) => formData.append("images", image));
    return apiClient.post<ProductResponse>("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 60000,
    });
  },

  getOrSearchProducts(
    searchParams: SearchParams = {
      page: 0,
      limit: 20,
      sortBy: "updatedAt",
      order: "asc",
    }
  ) {
    return apiClient.get<ProductPaginatedResponse>("/products", {
      params: searchParams,
    });
  },

  updateById(productId: number, productUpdateRequest: ProductUpdateRequest) {
    return apiClient.put<ProductResponse>(
      `/products/${productId}`,
      productUpdateRequest
    );
  },

  deleteById(productId: number) {
    return apiClient.delete<void>(`/products/${productId}`);
  },
};

export default productApi;
