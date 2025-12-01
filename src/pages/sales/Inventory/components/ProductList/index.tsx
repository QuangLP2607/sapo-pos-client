import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./ProductList.module.scss";
import type { Product } from "@interfaces/product";
import productApi from "@/services/productService";
import { Icon } from "@iconify/react";
import PaginationWithItemsPerPage from "@/components/PaginationWithItemsPerPage";

const cx = classNames.bind(styles);
const DEFAULT_ITEMS_PER_PAGE = 10;

export default function ProductList() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);

  // Fetch data khi search thay đổi
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await productApi.getProducts(search);
        if (isMounted) setProducts(res.data);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [search]);

  // Pagination
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={cx("product-list")}>
      <div className={cx("product-list__header")}>
        <h2 className={cx("product-list__title")}>
          Sản phẩm ({products.length})
        </h2>

        <div className={cx("product-list__search")}>
          <Icon icon="ic:round-search" className={cx("search-icon")} />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={cx("search-input")}
          />
        </div>
      </div>

      {loading ? (
        <div className={cx("product-list__loading")}>Đang tải...</div>
      ) : (
        <>
          <div className={cx("product-list__results-count")}>
            Hiển thị {paginatedProducts.length} kết quả
          </div>

          <div className={cx("product-list__table-wrapper")}>
            <table className={cx("product-list__table")}>
              <thead>
                <tr>
                  <th className={cx("product-list__th")}>Mặc định</th>
                  <th className={cx("product-list__th")}>Tên sản phẩm</th>
                  <th className={cx("product-list__th")}>Giá</th>
                  <th className={cx("product-list__th")}>SKU</th>
                  <th className={cx("product-list__th")}>Đơn vị</th>
                  <th className={cx("product-list__th")}>Tồn kho</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.length > 0 ? (
                  paginatedProducts.map((product) => (
                    <tr key={product.id} className={cx("product-list__row")}>
                      <td className={cx("product-list__td")}>
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className={cx("product-list__image")}
                          />
                        ) : (
                          <div
                            className={cx("product-list__image-placeholder")}
                          >
                            No Image
                          </div>
                        )}
                      </td>
                      <td
                        className={cx(
                          "product-list__td",
                          "product-list__td--name"
                        )}
                      >
                        {product.name}
                      </td>
                      <td className={cx("product-list__td")}>
                        {product.price.toLocaleString("vi-VN")}đ
                      </td>
                      <td className={cx("product-list__td")}>{product.sku}</td>
                      <td className={cx("product-list__td")}>cái</td>
                      <td className={cx("product-list__td")}>
                        {product.stock}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className={cx(
                        "product-list__td",
                        "product-list__td--empty"
                      )}
                    >
                      Không tìm thấy sản phẩm nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <PaginationWithItemsPerPage
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={setItemsPerPage}
            itemsPerPageOptions={[5, 10, 20, 50]}
            itemsPerPagePosition="left"
            className={cx("product-list__pagination")}
          />
        </>
      )}
    </div>
  );
}
