import classNames from "classnames/bind";
import styles from "./styles/product-table.module.scss";
import { useState } from "react";
import type { ProductPaginatedResponse } from "../../api/product.responses";
import Image from "./Image";
import { Link, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const ProductTable = ({ products }: { products: ProductPaginatedResponse }) => {
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const productData = products.data;
  const navigate = useNavigate();

  const toggleSelect = (id: number) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedItems.size === productData.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(productData.map((p) => p.id)));
    }
  };

  const handleForwardDetail = (productId: number) => {
    console.log("productId::", productId);
    navigate(`/admin/products/${productId}`);
  };

  return (
    <div className={cx("table-container")}>
      <table>
        <thead>
          <tr>
            <th className={cx("th-checkbox")}>
              <input
                type="checkbox"
                checked={
                  selectedItems.size === productData.length &&
                  productData.length > 0
                }
                onChange={toggleSelectAll}
                className={cx("checkbox")}
              />
            </th>
            <th></th>
            <th>{"Sản phẩm"}</th>
            <th>{"Có thể bán"}</th>
            <th>{"Loại"}</th>
            <th>{"Nhãn hiệu"}</th>
            <th>{"Ngày khởi tạo"}</th>
          </tr>
        </thead>
        <tbody>
          {productData.map((product) => (
            <tr
              key={product.id}
              onClick={() => handleForwardDetail(product.id)}
            >
              <td className={cx("th-checkbox")}>
                <input
                  type="checkbox"
                  checked={selectedItems.has(product.id)}
                  onChange={() => toggleSelect(product.id)}
                  className={cx("checkbox")}
                />
              </td>
              <td>
                <Image
                  src={
                    product.images.find((image) => image.position === 1)?.src
                  }
                />
              </td>
              <td>
                <div className={cx("table-cell")}>
                  <Link
                    to={`/admin/products/${product.id}`}
                    className={cx("table-link")}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {product.name}
                  </Link>
                </div>
              </td>
              <td>
                <div className={cx("variants-info")}>
                  {product.variants.reduce(
                    (previousInventoryQuantities, variant) =>
                      variant.inventory_quantity + previousInventoryQuantities,
                    0
                  )}
                </div>
                {product.variants.length > 0 && (
                  <div className={cx("variants-sub")}>
                    ({product.variants.length} phiên bản)
                  </div>
                )}
              </td>
              <td>
                {product.types.length > 0
                  ? product.types.map((type) => (
                      <div className={cx("product-type")}>{type.name}</div>
                    ))
                  : "-"}
              </td>
              <td className={cx("")}>
                {product.brand ? product.brand.name : "-"}
              </td>
              <td>{product.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
