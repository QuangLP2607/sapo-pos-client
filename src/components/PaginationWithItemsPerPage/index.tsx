import classNames from "classnames/bind";
import styles from "./PaginationWithItemsPerPage.module.scss";
import Pagination from "../Pagination";
import ItemsPerPageSelector from "../ItemsPerPageSelector";

const cx = classNames.bind(styles);

interface PaginationWithItemsPerPageProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  itemsPerPageOptions?: number[];
  itemsPerPagePosition?: "left" | "right" | "top" | "bottom";
  className?: string;
}

export default function PaginationWithItemsPerPage({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
  itemsPerPageOptions = [5, 10, 20, 50],
  itemsPerPagePosition = "left",
  className,
}: PaginationWithItemsPerPageProps) {
  const handleItemsPerPageChange = (newValue: number) => {
    onItemsPerPageChange(newValue);
    onPageChange(1);
  };

  const itemsPerPageSelector = (
    <ItemsPerPageSelector
      itemsPerPage={itemsPerPage}
      onItemsPerPageChange={handleItemsPerPageChange}
      itemsPerPageOptions={itemsPerPageOptions}
      className={cx("pagination-wrapper__items-selector")}
    />
  );

  const pagination =
    totalPages > 1 ? (
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        className={cx("pagination-wrapper__pagination")}
      />
    ) : null;

  return (
    <div
      className={cx(
        "pagination-wrapper",
        `pagination-wrapper--${itemsPerPagePosition}`,
        className
      )}
    >
      {itemsPerPagePosition === "top" && itemsPerPageSelector}
      {itemsPerPagePosition === "left" && itemsPerPageSelector}
      {pagination}
      {itemsPerPagePosition === "right" && itemsPerPageSelector}
      {itemsPerPagePosition === "bottom" && itemsPerPageSelector}
    </div>
  );
}
