import type { Product } from "@/interfaces/product";

export interface Type {
  id: number;
  name: string;
  createdAt?: string;
  products?: Product[];
}
