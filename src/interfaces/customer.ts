// Customer cũ

// export interface Customer {
//   id: string;
//   name: string;
//   phoneNum: string;
//   address: string;
//   gender: "Nam" | "Nữ" | "Khác";
//   birthday: string;
// }

// Mới
export interface Customer {
  id: number;
  name: string;
  phoneNum: string;
  note: string;
  gender: "MALE" | "FEMALE" | "OTHER"; // match Java enum values
  createdAt: string; // ISO datetime
  lastPurchaseDate: string | null; // may be null
  totalPurchaseAmount: number;
  purchases: Purchase[];
}

// Mới
export interface Purchase {
  id: number;
  amount: number;
  date: string;
}

// Mới
export interface CustomerPayload {
  name: string;
  phoneNum: string;
  gender: string;
  note: string;
}

// Mới
export interface CustomerQueryParams {
  keyword?: string;
  page?: number;
  size?: number;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  sortDir?: string;
  gender?: string;
}

// Mới
export interface CustomerPageResponse {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  customers: Customer[];
}
