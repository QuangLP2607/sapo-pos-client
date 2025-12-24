// Product Option Value
export interface ProductOptionValueResponse {
  id: number;
  value: string;
}

// Product Option
export interface ProductOptionResponse {
  id: number;
  name: string;
  position: number;
  values: ProductOptionValueResponse[];
}

// Product Image
export interface ProductImageResponse {
  id: number;
  src: string;
  alt?: string;
  position: number;
  filename: string;
  size: number;
  width?: number;
  height?: number;
}

// Product Variant
export interface ProductVariantResponse {
  id: number;
  sku: string;
  barcode: string;
  price: number;
  compare_at_price: number;
  title: string;
  option1: string;
  option2: string;
  option3: string;
  taxable: boolean;
  inventory_quantity: number;
  unit: string;
  image: ProductImageResponse;
  position: number;
}

// Brand
export interface BrandResponse {
  id: number;
  name: string;
}

// Product Type
export interface ProductTypeResponse {
  id: number;
  name: string;
}

// Product
export interface ProductResponse {
  id: number;
  name: string;
  summary: string;
  content: string;
  status: string;
  created_at: string;
  updated_at: string;
  brand: BrandResponse;
  images: ProductImageResponse[];
  variants: ProductVariantResponse[];
  options: ProductOptionResponse[];
  types: ProductTypeResponse[];
}

// Paginated Response
export interface PaginatedResponse<T> {
  data?: T[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// API Response Type
export type ProductPaginatedResponse = PaginatedResponse<ProductResponse>;
