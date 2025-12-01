import type { Customer } from "./customer";
import type { Product } from "./product";

export interface Order {
  id: string;
  products: (Product & { qty: number })[];
  customer?: Customer;
  note?: string;

  totalAmount?: number;
  vat?: number;
  discount?: number;
  payable?: number;
  paidAt?: Date;
}
