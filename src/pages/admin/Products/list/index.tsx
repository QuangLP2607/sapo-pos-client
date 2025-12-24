import { Icon } from "@iconify/react";
import styles from "@/pages/admin/Products/list/products.module.scss";
import classNames from "classnames/bind";
import { useEffect, useMemo, useState } from "react";
import DropdownList from "./components/DropdownList";
import ProductTable from "./components/Table";
import Filters from "./components/Filters";
import type { ProductPaginatedResponse } from "../api/product.responses";
import { useNavigate } from "react-router-dom";
import { type SearchParams } from "../api/api";

const cx = classNames.bind(styles);

const ProductsListPage = ({
  data,
  onChangeFilterValues,
}: {
  data: ProductPaginatedResponse;
  onChangeFilterValues: (searchParams: SearchParams) => void;
}) => {
  const [pageSize, setPageSize] = useState(20);
  const mockProductData = data;
  const navigate = useNavigate();
  const [filtersValue, setFiltersValue] = useState<{
    brandId?: number;
    typeIds?: number[];
    searchWord?: string;
  }>();
  const [pageNumber, setPageNumber] = useState<number>(data.currentPage);

  const params = useMemo(
    () => ({
      brandId: filtersValue?.brandId,
      limit: pageSize,
      page: pageNumber,
      search: filtersValue?.searchWord,
      typeIds: filtersValue?.typeIds,
    }),
    [filtersValue, pageNumber, pageSize]
  );

  useEffect(() => {
    onChangeFilterValues(params);
  }, [params, onChangeFilterValues]);

  const forwardToCreatePage = () => {
    navigate("/admin/products/create");
  };

  const handleChangePageNumber = (isPrevious: boolean) => {
    if (isPrevious && data.hasPrevious) {
      setPageNumber((prev) => prev - 1);
    } else if (!isPrevious && data.hasNext) {
      setPageNumber((prev) => prev + 1);
    }
  };

  console.log("mock data::", mockProductData);

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
      <Filters onChangeFilterValues={setFiltersValue} />

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
            onClick={() => {
              handleChangePageNumber(true);
            }}
            className={
              mockProductData.hasPrevious
                ? cx("page-btn")
                : cx("page-btn", "disable-btn")
            }
            disabled={!mockProductData.hasPrevious}
          >
            <Icon icon="meteor-icons:angle-left" />
          </button>

          <div className={cx("pagination-page")}>
            {mockProductData.currentPage + 1}
          </div>
          <button
            onClick={() => {
              handleChangePageNumber(false);
            }}
            className={
              mockProductData.hasNext
                ? cx("page-btn")
                : cx("page-btn", "disable-btn")
            }
            disabled={!mockProductData.hasNext}
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
