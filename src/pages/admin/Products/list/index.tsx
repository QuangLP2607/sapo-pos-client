import { Icon } from "@iconify/react";
import styles from "@/pages/admin/Products/list/products.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import DropdownList from "./components/DropdownList";
import ProductTable from "./components/Table";
import Filters from "./components/Filters";
import type { ProductPaginatedResponse } from "../api/product.responses";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const ProductsListPage = ({ data }: { data: ProductPaginatedResponse }) => {
  const [pageSize, setPageSize] = useState(20);
  const mockProductData = data;
  const navigate = useNavigate();

  const forwardToCreatePage = () => {
    navigate("/admin/products/create");
  };

  return (
    <div className={cx("container")}>
      {/* Header */}
      <div className={cx("header-content")}>
        <h1>{"Danh sách sản phẩm"}</h1>
        <div className={cx("header-buttons")}>
          <button
            className={cx("btn", "btn-primary")}
            onClick={forwardToCreatePage}
          >
            <Icon
              className={cx("header-btn-icon")}
              icon="mdi:plus-circle-outline"
            />
            <span>{"Thêm sản phẩm"}</span>
          </button>
        </div>
      </div>
      {/* Filters */}
      <Filters />

      {/* Table */}
      <ProductTable products={mockProductData} />

      {/* Pagination */}
      <div className={cx("pagination")}>
        {mockProductData.data && mockProductData.data.length > 0 && (
          <span className={cx("pagination-info")}>
            {`Từ 1 đến ${mockProductData.data.length} trên tổng ${mockProductData.data.length}`}
          </span>
        )}

        <div>
          <span className={cx("pagination-info")}>{"Hiển thị"}</span>
          <DropdownList value={pageSize} onChange={setPageSize} />
          <span className={cx("pagination-info")}>{"Kết quả"}</span>
        </div>
        <div className={cx("pagination-controls")}>
          <button
            className={
              mockProductData.hasPrevious
                ? cx("page-btn")
                : cx("page-btn", "disable-btn")
            }
            disabled={mockProductData.hasPrevious}
          >
            <Icon icon="meteor-icons:angle-left" />
          </button>

          <div className={cx("pagination-page")}>
            {mockProductData.currentPage}
          </div>
          <button
            className={
              mockProductData.hasNext
                ? cx("page-btn")
                : cx("page-btn", "disable-btn")
            }
            disabled={mockProductData.hasNext}
          >
            <Icon icon="meteor-icons:angle-right" />
          </button>
        </div>
      </div>

      {/* Footer Link */}
      <div className={cx("footer-link")}>
        {"Tìm hiểu thêm "}
        <a href="https://help.sapo.vn/quan-ly-danh-sach-san-pham-tren-sapo-omniai">
          {"về sản phẩm"}
        </a>
      </div>
    </div>
  );
};

export default ProductsListPage;
