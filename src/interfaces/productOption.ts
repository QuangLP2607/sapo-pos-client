import type { Product } from "@/interfaces/product";
import type { ProductOptionValue } from "@/interfaces/productOptionValue";

export interface ProductOption {
  id: number;
  product?: Product;
  name: string;
  position: number;
  values?: ProductOptionValue[];
  createdAt?: string;
  updatedAt?: string;
}
