import type { Purchase } from "@/interfaces/purchase";

export type Gender = "MALE" | "FEMALE" | "NaN";

export interface Customer {
  id: number;
  name: string;
  phoneNum: string;
  gender: Gender;
  createdAt?: string;
  note?: string;
  purchases?: Purchase[];
  lastPurchaseDate?: string;
  totalPurchaseAmount: number;
}
