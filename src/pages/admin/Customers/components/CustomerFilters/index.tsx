import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./CustomerFilters.module.scss";
import { Select } from "@/components/Select";
import type { CustomerListParams } from "@/services/customerService";
import { Icon } from "@iconify/react";
import { resolveDatePreset, type DatePreset } from "./datePreset";

const cx = classNames.bind(styles);

type Gender = NonNullable<CustomerListParams["gender"]>;
type SortBy = NonNullable<CustomerListParams["sortBy"]>;
type SortDir = NonNullable<CustomerListParams["sortDir"]>;

interface Props {
  filters: CustomerListParams;
  onChange: (
    key: keyof CustomerListParams,
    value: string | number | undefined
  ) => void;
  onClear: () => void;
}

const genderOptions: { value: Gender; label: string }[] = [
  { value: "NaN", label: "Tất cả" },
  { value: "MALE", label: "Nam" },
  { value: "FEMALE", label: "Nữ" },
];

const sortOptions: { value: SortBy; label: string }[] = [
  { value: "name", label: "Tên" },
  { value: "createdAt", label: "Ngày tạo" },
  { value: "totalPurchaseAmount", label: "Tổng giao dịch" },
];

const datePresetOptions: { value: DatePreset; label: string }[] = [
  { value: "ALL", label: "Tất cả thời gian" },
  { value: "THIS_WEEK", label: "Tuần này" },
  { value: "LAST_WEEK", label: "Tuần trước" },
  { value: "THIS_MONTH", label: "Tháng này" },
  { value: "LAST_MONTH", label: "Tháng trước" },
  { value: "THIS_YEAR", label: "Năm nay" },
];

export function CustomerFilters({ filters, onChange, onClear }: Props) {
  const [open, setOpen] = useState(false);

  const applyDatePreset = (preset: DatePreset) => {
    const { startDate, endDate } = resolveDatePreset(preset);
    onChange("startDate", startDate);
    onChange("endDate", endDate);
  };

  const toggleSortDir = () => {
    const next: SortDir = filters.sortDir === "asc" ? "desc" : "asc";
    onChange("sortDir", next);
  };

  return (
    <div className={cx("filters")}>
      {/* SEARCH */}
      <div className={cx("filters__search")}>
        <Icon icon="mdi:magnify" />
        <input
          value={filters.keyword || ""}
          onChange={(e) => onChange("keyword", e.target.value)}
          placeholder="Tìm kiếm khách hàng..."
        />
      </div>

      {/* FILTER BUTTON */}
      <button
        className={cx("filters__toggle")}
        onClick={() => setOpen((v) => !v)}
      >
        <Icon icon="mdi:filter-variant" />
        Bộ lọc
      </button>

      {/* FILTER PANEL */}
      {open && (
        <div className={cx("filters__panel")}>
          {/* DATE PRESET */}
          <div className={cx("filters__row")}>
            <label>Thời gian</label>
            <Select
              value="ALL"
              onChange={(v) => applyDatePreset(v as DatePreset)}
              options={datePresetOptions}
            />
          </div>

          {/* AMOUNT */}
          <div className={cx("filters__row")}>
            <label>Giá trị</label>
            <input
              type="number"
              placeholder="Min"
              value={filters.minAmount ?? ""}
              onChange={(e) =>
                onChange(
                  "minAmount",
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
            />
            <span>→</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.maxAmount ?? ""}
              onChange={(e) =>
                onChange(
                  "maxAmount",
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
            />
          </div>

          {/* GENDER */}
          <div className={cx("filters__row")}>
            <label>Giới tính</label>
            <Select
              value={filters.gender ?? "OTHER"}
              onChange={(v) => onChange("gender", v as Gender)}
              options={genderOptions}
            />
          </div>

          {/* SORT */}
          <div className={cx("filters__row")}>
            <label>Sắp xếp</label>
            <Select
              value={filters.sortBy ?? "name"}
              onChange={(v) => onChange("sortBy", v as SortBy)}
              options={sortOptions}
            />
            <button
              className={cx("sort-dir")}
              onClick={toggleSortDir}
              title="Đổi chiều sắp xếp"
            >
              <Icon
                icon={
                  filters.sortDir === "desc"
                    ? "mdi:sort-descending"
                    : "mdi:sort-ascending"
                }
              />
            </button>
          </div>

          {/* ACTIONS */}
          <div className={cx("filters__actions")}>
            <button className={cx("btn", "btn--ghost")} onClick={onClear}>
              Xoá lọc
            </button>
            <button
              className={cx("btn", "btn--primary")}
              onClick={() => setOpen(false)}
            >
              Áp dụng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
