import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Customers.module.scss";
import { CustomerFilters, type Filters } from "../components/CustomerFilters";
import customerApi, { type Customer } from "@/services/customerService1";
import { PaginationControls } from "@/components/PaginationControls";
import CustomerTable from "@/components/CustomerTable";

const cx = classNames.bind(styles);

export default function Customers() {
  const navigate = useNavigate();
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

  // ===== Fetch API ====
  useEffect(() => {
    let isMounted = true;

    async function load() {
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

        if (!isMounted) return;

        setCustomers(res.data.customers || []);
        setTotal(res.data.totalItems || 0);
      } catch {
        if (!isMounted) return;
        setCustomers([]);
        setTotal(0);
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [filters, page, size]);

  // ===== Render =====
  return (
    <div className={cx("customer")}>
      {/* Filter */}
      <CustomerFilters
        filters={filters}
        onChange={handleFilterChange}
        onClear={handleClear}
      />

      <CustomerTable
        columns={[
          { label: "Tên", render: (c) => c.name },
          { label: "Số điện thoại", render: (c) => c.phoneNum },
          { label: "Giới tính", render: (c) => c.gender },
          { label: "Ghi chú", render: (c) => c.note },
          {
            label: "Ngày tạo",
            render: (c) =>
              c.createdAt
                ? new Date(c.createdAt).toLocaleDateString("vi-VN")
                : "-",
          },
          {
            label: "Mua hàng gần nhất",
            render: (c) =>
              c.lastPurchaseDate
                ? new Date(c.lastPurchaseDate).toLocaleDateString("vi-VN")
                : "-",
          },
          {
            label: "Tổng giao dịch",
            render: (c) => c.totalPurchaseAmount?.toLocaleString("vi-VN") || 0,
          },
        ]}
        customers={customers}
        onRowSelect={(customer) => navigate(`/admin/customers/${customer.id}`)}
      />

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
