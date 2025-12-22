import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Customers.module.scss";

import type { Customer } from "@/interfaces/customer";
import type { Column } from "@/components/CustomerTable";

import { CustomerFilters } from "../components/CustomerFilters";
import customerApi, {
  type CustomerListParams,
} from "@/services/customerService";
import { PaginationControls } from "@/components/PaginationControls";
import CustomerTable from "@/components/CustomerTable";

const cx = classNames.bind(styles);

export default function Customers() {
  const navigate = useNavigate();

  /* ================= FILTER ================= */
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

  /* ================= STATE ================= */
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);

  /* ================= HANDLER ================= */
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

  /* ================= TABLE COLUMNS ================= */
  const columns: Column<Customer>[] = [
    { label: "Họ và tên", render: (c) => c.name },
    { label: "Số điện thoại", render: (c) => c.phoneNum, align: "center" },
    {
      label: "Ngày tạo",
      render: (c) =>
        c.createdAt ? new Date(c.createdAt).toLocaleDateString("vi-VN") : "-",
      align: "center",
    },
    {
      label: "Tổng chi tiêu",
      render: (c) => c.totalPurchaseAmount?.toLocaleString("vi-VN") ?? 0,
      align: "right",
    },
  ];

  /* ================= FETCH API ================= */
  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await customerApi.getCustomers({
          ...filters,
          page: page - 1,
          size,
        });

        if (!mounted) return;

        setCustomers(res.customers ?? []);
        setTotal(res.totalItems ?? 0);
      } catch {
        if (!mounted) return;
        setCustomers([]);
        setTotal(0);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, [filters, page, size]);

  /* ================= RENDER ================= */
  return (
    <div className={cx("customer")}>
      <div className={cx("customer__header")}>
        <h2>Khách hàng</h2>
        <button
          className={cx("customer__header--add")}
          onClick={() => navigate("/admin/customers/create")}
        >
          Thêm khách hàng
        </button>
      </div>

      <CustomerFilters
        filters={filters}
        onChange={handleFilterChange}
        onClear={handleClear}
      />

      <CustomerTable
        columns={columns}
        data={customers}
        onRowSelect={(c) => navigate(`/admin/customers/${c.id}`)}
      />

      <PaginationControls
        currentPage={page}
        totalItems={total}
        itemsPerPage={size}
        onPageChange={setPage}
        onItemsPerPageChange={(v) => {
          setSize(v);
          setPage(1);
        }}
      />
    </div>
  );
}
