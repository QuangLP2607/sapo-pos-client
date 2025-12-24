import type { Customer } from "@/interfaces/customer";
import type { User } from "@/interfaces/user";
import type { PurchaseItem } from "@/interfaces/purchaseItem";

export interface Purchase {
  id: number;
  customer: Customer;
  user: User;
  totalAmount: number;
  discountAmount: number;
  note: string | null;
  createdAt: string;
  purchaseItems: PurchaseItem[];
}
