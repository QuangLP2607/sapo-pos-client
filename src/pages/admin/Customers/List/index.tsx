import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Customers.module.scss";
import type { Customer } from "@/interfaces/customer";
import { CustomerFilters } from "../components/CustomerFilters";
import customerApi, {
  type CustomerListParams,
} from "@/services/customerService";
import { PaginationControls } from "@/components/PaginationControls";
import CustomerTable from "@/components/CustomerTable";

const cx = classNames.bind(styles);

export default function Customers() {
  const navigate = useNavigate();

  // ===== Filters =====
  const [filters, setFilters] = useState<CustomerListParams>({
    keyword: "",
    startDate: "",
    endDate: "",
    minAmount: undefined,
    maxAmount: undefined,
    gender: "NaN",
    sortBy: "name",
    sortDir: "asc",
  });

  // ===== State =====
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);

  // ===== Handlers =====
  const handleFilterChange = (
    key: keyof CustomerListParams,
    value: string | number | undefined
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handleClear = () => {
    setFilters({
      keyword: "",
      startDate: "",
      endDate: "",
      minAmount: undefined,
      maxAmount: undefined,
      gender: "NaN",
      sortBy: "name",
      sortDir: "asc",
    });
    setPage(1);
  };

  // ===== Fetch API =====
  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const params: CustomerListParams & { page: number; size: number } = {
          ...filters,
          page: page - 1,
          size,
        };

        const res = await customerApi.getCustomers(params);

        if (!isMounted) return;

        setCustomers(res.customers || []);
        setTotal(res.totalItems || 0);
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
      <div className={cx("customer__header")}>
        <h2>Khách hàng</h2>
        <button className={cx("customer__header--add")}>Thêm khách hàng</button>
      </div>
      {/* Filter */}
      <CustomerFilters
        filters={filters}
        onChange={handleFilterChange}
        onClear={handleClear}
      />

      {/* Customer Table */}
      <CustomerTable
        columns={[
          { label: "Tên", render: (c) => c.name },
          { label: "Điện thoại", render: (c) => c.phoneNum },
          { label: "Đơn hàng", render: (c) => c.gender },
          {
            label: "Mua hàng gần nhất",
            render: (c) =>
              c.lastPurchaseDate
                ? new Date(c.lastPurchaseDate).toLocaleDateString("vi-VN")
                : "-",
          },
          {
            label: "Tổng chi tiêu",
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
