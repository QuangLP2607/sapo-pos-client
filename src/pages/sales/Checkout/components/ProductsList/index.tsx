import classNames from "classnames/bind";
import styles from "./ProductsList.module.scss";
import type { Order } from "@interfaces/order";
import type { Product } from "@interfaces/product";
import { Icon } from "@iconify/react";

const cx = classNames.bind(styles);

interface ProductsListProps {
  currentTabData: Order;
  updateTabData: (partialData: Partial<Order>) => void;
}

export default function ProductsList({
  currentTabData,
  updateTabData,
}: ProductsListProps) {
  const products = currentTabData.products ?? [];

  const handleRemoveProduct = (index: number) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    updateTabData({ products: newProducts });
  };

  const updateQty = (index: number, delta: number) => {
    const newProducts = [...products];
    const target = newProducts[index];

    const newQty = (target.qty ?? 1) + delta;
    if (newQty < 1) return;

    newProducts[index] = { ...target, qty: newQty };
    updateTabData({ products: newProducts });
  };

  return (
    <div className={cx("products")}>
      <table className={cx("table")}>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Sản phẩm</th>
            <th style={{ width: "120px", textAlign: "right" }}>Đơn giá</th>
            <th style={{ width: "200px", textAlign: "center" }}>Số lượng</th>
            <th style={{ width: "120px", textAlign: "right" }}>Thành tiền</th>
            <th style={{ width: "50px" }}></th>
          </tr>
        </thead>

        <tbody>
          {products.map((p: Product & { qty: number }, idx: number) => (
            <tr key={p.id + "-" + idx}>
              <td>
                <div className={cx("table-cell")}>
                  <img src={p.image} alt={p.name} className={cx("thumb")} />

                  <div className={cx("info")}>
                    <div className={cx("name")}>{p.name}</div>
                    <div className={cx("sku")}>{p.sku}</div>
                  </div>
                </div>
              </td>

              <td style={{ textAlign: "right" }}>
                {p.price.toLocaleString()}₫
              </td>

              <td>
                <div className={cx("qty-box")}>
                  <button onClick={() => updateQty(idx, -1)}>-</button>
                  <span style={{ width: "40px" }}>{p.qty}</span>
                  <button onClick={() => updateQty(idx, +1)}>+</button>
                </div>
              </td>

              <td style={{ textAlign: "right" }}>
                {(p.price * p.qty).toLocaleString()}₫
              </td>

              <td className={cx("delete-btn-cell")}>
                <button
                  className={cx("remove")}
                  onClick={() => handleRemoveProduct(idx)}
                >
                  <Icon icon="ion:close" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
