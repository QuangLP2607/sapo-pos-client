import type { Product } from "@/interfaces/product";
import type { ProductVariant } from "@/interfaces/productVariant";

export interface ProductImage {
  id: number;
  product?: Product;
  productVariants?: ProductVariant[];
  position: number;
  src: string;
  alt?: string;
  filename: string;
  assetId: string;
  size: number;
  width?: number;
  height?: number;
  createdAt?: string;
  updatedAt?: string;
}
