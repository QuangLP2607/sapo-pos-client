import type { Product } from "@/interfaces/product";
import type { ProductImage } from "@/interfaces/productImage";

export interface ProductVariant {
  id: number;
  product?: Product;
  image?: ProductImage;
  barcode?: string;
  sku?: string;
  price?: number;
  basePrice?: number;
  compareAtPrice?: number;
  option1?: string;
  option2?: string;
  option3?: string;
  taxable?: boolean;
  inventoryQuantity?: number;
  unit?: string;
  position: number;
  title?: string;
  createdAt: string;
  updatedAt?: string;
}
