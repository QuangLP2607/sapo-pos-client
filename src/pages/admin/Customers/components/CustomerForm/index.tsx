import classNames from "classnames/bind";
import styles from "./CustomerFilters.module.scss";
import { Select } from "@/components/Select";

const cx = classNames.bind(styles);

export interface Filters {
  search: string;
  dateFrom: string;
  dateTo: string;
  gender: string;
  sortField: string;
  sortOrder: string;
}

export interface CustomerFiltersProps {
  filters: Filters;
  onChange: (key: keyof Filters, value: string) => void;
  onClear: () => void;
}

export function CustomerFilters({
  filters,
  onChange,
  onClear,
}: CustomerFiltersProps) {
  return (
    <div className={cx("customer-filters")}>
      <div className={cx("customer-filters__group")}>
        {/* Search */}
        <div
          className={cx(
            "customer-filters__item",
            "customer-filters__item--search"
          )}
        >
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onChange("search", e.target.value)}
            placeholder="Tìm kiếm khách hàng..."
            className={cx("customer-filters__input")}
          />
        </div>

        {/* Date */}
        <div
          className={cx(
            "customer-filters__item",
            "customer-filters__item--date"
          )}
        >
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => onChange("dateFrom", e.target.value)}
            className={cx("customer-filters__input")}
          />
          <span className={cx("customer-filters__label")}>đến</span>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => onChange("dateTo", e.target.value)}
            className={cx("customer-filters__input")}
          />
        </div>

        {/* Gender */}
        <div
          className={cx(
            "customer-filters__item",
            "customer-filters__item--gender"
          )}
        >
          <Select
            value={filters.gender || "All"}
            onChange={(v) => onChange("gender", v.toString())}
            options={[
              { value: "All", label: "Tất cả" },
              { value: "MALE", label: "Nam" },
              { value: "FEMALE", label: "Nữ" },
            ]}
          />
        </div>

        {/* Sort */}
        <div
          className={cx(
            "customer-filters__item",
            "customer-filters__item--sort"
          )}
        >
          <Select
            value={filters.sortField || "name"}
            onChange={(v) => onChange("sortField", v.toString())}
            options={[
              { value: "name", label: "Tên" },
              { value: "createdAt", label: "Ngày tạo" },
              { value: "lastPurchaseDate", label: "Mua hàng gần nhất" },
              { value: "totalPurchaseAmount", label: "Tổng giao dịch" },
            ]}
          />
          <Select
            value={filters.sortOrder || "asc"}
            onChange={(v) => onChange("sortOrder", v.toString())}
            options={[
              { value: "asc", label: "Tăng dần" },
              { value: "desc", label: "Giảm dần" },
            ]}
          />
        </div>

        {/* Actions */}
        <div
          className={cx(
            "customer-filters__item",
            "customer-filters__item--actions"
          )}
        >
          <button
            className={cx(
              "customer-filters__btn",
              "customer-filters__btn--clear"
            )}
            onClick={onClear}
          >
            Xoá lọc
          </button>
        </div>
      </div>

      <div className={cx("customer-filters__add")}>
        <button
          className={cx("customer-filters__btn", "customer-filters__btn--add")}
        >
          Thêm khách hàng
        </button>
      </div>
    </div>
  );
}
