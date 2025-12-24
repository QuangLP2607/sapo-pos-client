export const ProductStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  DRAFT: "DRAFT",
} as const;

export type ProductStatus = (typeof ProductStatus)[keyof typeof ProductStatus];

export interface ProductOptionValueRequest {
  value: string;
}

export interface ProductOptionRequest {
  name?: string;
  position?: number;
  values: ProductOptionValueRequest[];
}

export interface ProductVariantRequest {
  sku?: string;
  barcode?: string;
  price?: number;
  basePrice?: number;
  compareAtPrice?: number;
  title?: string;
  option1?: string;
  option2?: string;
  option3?: string;
  taxable?: boolean;
  inventoryQuantity?: number;
  unit?: string;
  imageId?: number;
  position?: number;
}

export interface ProductImageRequest {
  position: number;
  src: string;
  alt?: string;
  filename: string;
  size?: number;
  width?: number;
  height?: number;
}

export interface ProductUpdateRequest {
  name?: string;
  summary?: string;
  content?: string;
  status?: ProductStatus;
  brandId?: number;
  typeIds?: Set<number> | number[];
  variants?: ProductVariantRequest[];
  options?: ProductOptionRequest[];
}

export interface ProductCreateRequest {
  name: string;
  summary?: string;
  content?: string;
  status?: ProductStatus;
  createdByUserId: number;
  brandId?: number;
  typeIds?: number[];
  variants?: ProductVariantRequest[];
  options?: ProductOptionRequest[];
}
