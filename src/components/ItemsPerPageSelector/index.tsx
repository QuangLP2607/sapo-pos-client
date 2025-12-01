import classNames from "classnames/bind";
import styles from "./ItemsPerPageSelector.module.scss";

const cx = classNames.bind(styles);

interface ItemsPerPageSelectorProps {
  itemsPerPage: number;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  itemsPerPageOptions?: number[];
  className?: string;
}

export default function ItemsPerPageSelector({
  itemsPerPage,
  onItemsPerPageChange,
  itemsPerPageOptions = [5, 10, 20, 50],
  className,
}: ItemsPerPageSelectorProps) {
  return (
    <div className={cx("items-per-page", className)}>
      <label className={cx("items-per-page__label")}>Hiển thị:</label>
      <select
        className={cx("items-per-page__select")}
        value={itemsPerPage}
        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
      >
        {itemsPerPageOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
