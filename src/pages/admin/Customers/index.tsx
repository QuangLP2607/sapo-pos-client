// src/pages/Customers/Customers.tsx
import { useState, useEffect, useCallback } from "react";
import classNames from "classnames/bind";
import styles from "./Customers.module.scss";
import { CustomerFilters, type Filters } from "./components/CustomerFilters";
import customerApi, { type Customer } from "@/services/customerService1";
import { PaginationControls } from "@/components/PaginationControls";

const cx = classNames.bind(styles);

export default function Customers() {
  // ===== Filters =====
  const [filters, setFilters] = useState<Filters>({
    search: "",
    dateFrom: "",
    dateTo: "",
    gender: "All",
    sortField: "name",
    sortOrder: "asc",
  });

  // ===== State =====
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);

  // ===== Handlers =====
  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handleClear = () => {
    setFilters({
      search: "",
      dateFrom: "",
      dateTo: "",
      gender: "All",
      sortField: "name",
      sortOrder: "asc",
    });
    setPage(1);
  };

  // ===== Fetch API =====
  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await customerApi.getAll({
        keyword: filters.search,
        startDate: filters.dateFrom || undefined,
        endDate: filters.dateTo || undefined,
        sortBy: filters.sortField,
        sortDir: filters.sortOrder,
        gender: filters.gender !== "All" ? filters.gender : undefined,
        page: page - 1,
        size,
      });

      setCustomers(res.data.customers || []);
      setTotal(res.data.totalItems || 0);
    } catch (error) {
      console.error("Lỗi lấy danh sách khách hàng:", error);
      setCustomers([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [filters, page, size]);

  // ===== useEffect =====
  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  // ===== Render =====
  return (
    <div className={cx("customer")}>
      {/* Filter */}
      <CustomerFilters
        filters={filters}
        onChange={handleFilterChange}
        onClear={handleClear}
      />

      {/* Table */}
      <div className={cx("customer__table")}>
        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Tên</th>
                <th>Số điện thoại</th>
                <th>Giới tính</th>
                <th>Ghi chú</th>
                <th>Ngày tạo</th>
                <th>Mua hàng gần nhất</th>
                <th>Tổng giao dịch</th>
              </tr>
            </thead>
            <tbody>
              {customers.length > 0 ? (
                customers.map((c) => (
                  <tr key={c.id}>
                    <td>{c.name}</td>
                    <td>{c.phoneNum}</td>
                    <td>{c.gender}</td>
                    <td>{c.note}</td>
                    <td>
                      {c.createdAt
                        ? new Date(c.createdAt).toLocaleDateString("vi-VN")
                        : "-"}
                    </td>
                    <td>
                      {c.lastPurchaseDate
                        ? new Date(c.lastPurchaseDate).toLocaleDateString(
                            "vi-VN"
                          )
                        : "-"}
                    </td>
                    <td>
                      {c.totalPurchaseAmount?.toLocaleString("vi-VN") || 0}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center" }}>
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Controls */}
      <PaginationControls
        currentPage={page}
        totalItems={total}
        itemsPerPage={size}
        onPageChange={setPage}
        onItemsPerPageChange={(value) => {
          setSize(value);
          setPage(1);
        }}
      />
    </div>
  );
}
