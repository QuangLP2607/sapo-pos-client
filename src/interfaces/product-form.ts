// @interfaces/product-form.ts
export interface ProductFormData {
  name: string;
  description?: string;
  summary?: string;
  price: number;

  applyTax: boolean;

  brand?: string;
  types: string[];

  images: File[];

  options: EditedOption[];
  variants: Variant[];
}

export interface EditedOption {
  name: string;
  values: string[];
}

export interface Variant {
  sku?: string;
  barcode?: string;
  unit?: string;
  title?: string;
  option1?: string;
  option2?: string;
  option3?: string;
  price?: string;
  comparePrice?: number;
  costPrice?: number;
  taxable?: boolean;
  inventoryQuantity?: number;
}
