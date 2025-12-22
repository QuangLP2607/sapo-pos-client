import classNames from "classnames/bind";
import styles from "./CustomerFilters.module.scss";
import { Select } from "@/components/Select";
import type { CustomerListParams } from "@/services/customerService";

const cx = classNames.bind(styles);

export interface CustomerFiltersProps {
  filters: CustomerListParams;
  onChange: (
    key: keyof CustomerListParams,
    value: string | number | undefined
  ) => void;
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
        {/* Keyword */}
        <div
          className={cx(
            "customer-filters__item",
            "customer-filters__item--search"
          )}
        >
          <input
            type="text"
            value={filters.keyword || ""}
            onChange={(e) => onChange("keyword", e.target.value)}
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
            value={filters.startDate || ""}
            onChange={(e) => onChange("startDate", e.target.value)}
            className={cx("customer-filters__input")}
          />
          <span className={cx("customer-filters__label")}>đến</span>
          <input
            type="date"
            value={filters.endDate || ""}
            onChange={(e) => onChange("endDate", e.target.value)}
            className={cx("customer-filters__input")}
          />
        </div>

        {/* Amount */}
        <div
          className={cx(
            "customer-filters__item",
            "customer-filters__item--amount"
          )}
        >
          <input
            type="number"
            value={filters.minAmount ?? ""}
            onChange={(e) =>
              onChange(
                "minAmount",
                e.target.value ? Number(e.target.value) : undefined
              )
            }
            placeholder="Tối thiểu"
            className={cx("customer-filters__input")}
          />
          <span className={cx("customer-filters__label")}>-</span>
          <input
            type="number"
            value={filters.maxAmount ?? ""}
            onChange={(e) =>
              onChange(
                "maxAmount",
                e.target.value ? Number(e.target.value) : undefined
              )
            }
            placeholder="Tối đa"
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
            value={filters.gender || "OTHER"}
            onChange={(v) =>
              onChange("gender", v as CustomerListParams["gender"])
            }
            options={[
              { value: "OTHER", label: "Tất cả" },
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
            value={filters.sortBy || "name"}
            onChange={(v) => onChange("sortBy", v)}
            options={[
              { value: "name", label: "Tên" },
              { value: "createdAt", label: "Ngày tạo" },
              { value: "lastPurchaseDate", label: "Mua hàng gần nhất" },
              { value: "totalPurchaseAmount", label: "Tổng giao dịch" },
            ]}
          />
          <Select
            value={filters.sortDir || "asc"}
            onChange={(v) => onChange("sortDir", v)}
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

      <div className={cx("customer-filters__add")}></div>
    </div>
  );
}
