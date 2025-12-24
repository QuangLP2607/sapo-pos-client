export type Role = "OWNER" | "SALES" | "CS" | "WAREHOUSE";

// ===== Pagination ================================================================
export interface ListParams {
  keyword?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: "asc" | "desc";
}

export type PaginatedResponse<K extends string, T> = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
} & Record<K, T[]>;
