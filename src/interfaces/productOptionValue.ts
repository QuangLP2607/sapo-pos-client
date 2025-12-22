import type { ProductOption } from "@/interfaces/productOption";

export interface ProductOptionValue {
  id: number;
  option?: ProductOption;
  value: string;
}
