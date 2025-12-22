import type { Purchase } from "@/interfaces/purchase";
import type { ProductVariant } from "@/interfaces/productVariant";

export interface PurchaseItem {
  id: number;
  productVariant: ProductVariant;
  purchase?: Purchase;
  quantity: number;
  totalPrice: number;
}
