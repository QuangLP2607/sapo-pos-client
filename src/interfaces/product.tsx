import type { Type } from "@/interfaces/type";
import type { Brand } from "@/interfaces/brand";
import type { ProductImage } from "@/interfaces/productImage";
import type { ProductVariant } from "@/interfaces/productVariant";
import type { ProductOption } from "@/interfaces/productOption";

export interface Product {
  id: number;
  name: string;
  summary?: string;
  content?: string;
  status?: "ACTIVE" | "INACTIVE" | "DISCONTINUED";
  createdByUserId?: number;
  createdAt?: string;
  updatedAt?: string;

  brand?: Brand;
  types?: Type[];
  images?: ProductImage[];
  variants?: ProductVariant[];
  options?: ProductOption[];
}
