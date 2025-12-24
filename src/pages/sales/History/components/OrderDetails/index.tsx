import classNames from "classnames/bind";
import styles from "./OrderDetails.module.scss";
import type { Order } from "@/interfaces/order";
import { Icon } from "@iconify/react";

interface OrderDetailsProps {
  selectedOrder: Order | null;
}

const cx = classNames.bind(styles);

export default function OrderDetails({ selectedOrder }: OrderDetailsProps) {
  return (
    <div className={cx("order-details")}>
      {selectedOrder ? (
        <div className={cx("order-details__content")}>
          <h2 className={cx("order-details__title")}>
            Chi tiết đơn hàng #{selectedOrder.id}
          </h2>

          <div className={cx("order-details__section")}>
            <h3 className={cx("order-details__subtitle")}>
              Thông tin khách hàng
            </h3>
            <div className={cx("order-details__row")}>
              <span className={cx("order-details__label")}>Tên:</span>
              <span>{selectedOrder.customer?.name || "Khách lẻ"}</span>
            </div>
            {selectedOrder.customer?.phone && (
              <div className={cx("order-details__row")}>
                <span className={cx("order-details__label")}>SĐT:</span>
                <span>{selectedOrder.customer.phone}</span>
              </div>
            )}
            {selectedOrder.customer?.address && (
              <div className={cx("order-details__row")}>
                <span className={cx("order-details__label")}>Địa chỉ:</span>
                <span>{selectedOrder.customer.address}</span>
              </div>
            )}
          </div>

          <div className={cx("order-details__section")}>
            <h3 className={cx("order-details__subtitle")}>Sản phẩm</h3>
            <div className={cx("order-details__products")}>
              {selectedOrder.products.map((p) => (
                <div key={p.id} className={cx("order-details__product")}>
                  <div className={cx("order-details__product-name")}>
                    {p.name}
                  </div>
                  <div className={cx("order-details__product-info")}>
                    <span>
                      SL: {p.qty} × {p.price.toLocaleString("vi-VN")}đ
                    </span>
                    <span className={cx("order-details__product-total")}>
                      {(p.qty * p.price).toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedOrder.note && (
            <div className={cx("order-details__section")}>
              <h3 className={cx("order-details__subtitle")}>Ghi chú</h3>
              <p className={cx("order-details__note")}>{selectedOrder.note}</p>
            </div>
          )}

          <div className={cx("order-details__section")}>
            <h3 className={cx("order-details__subtitle")}>
              Thông tin thanh toán
            </h3>
            <div className={cx("order-details__row")}>
              <span className={cx("order-details__label")}>Tổng tiền:</span>
              <span>{selectedOrder.totalAmount?.toLocaleString("vi-VN")}đ</span>
            </div>
            {selectedOrder.vat && selectedOrder.vat > 0 && (
              <div className={cx("order-details__row")}>
                <span className={cx("order-details__label")}>VAT:</span>
                <span>{selectedOrder.vat.toLocaleString("vi-VN")}đ</span>
              </div>
            )}
            {selectedOrder.discount && selectedOrder.discount > 0 && (
              <div className={cx("order-details__row")}>
                <span className={cx("order-details__label")}>Giảm giá:</span>
                <span>-{selectedOrder.discount.toLocaleString("vi-VN")}đ</span>
              </div>
            )}
            <div
              className={cx("order-details__row", "order-details__row--total")}
            >
              <span className={cx("order-details__label")}>Thành tiền:</span>
              <span className={cx("order-details__amount")}>
                {selectedOrder.payable?.toLocaleString("vi-VN")}đ
              </span>
            </div>
            {selectedOrder.paidAt && (
              <div className={cx("order-details__row")}>
                <span className={cx("order-details__label")}>
                  Ngày thanh toán:
                </span>
                <span>
                  {new Date(selectedOrder.paidAt).toLocaleString("vi-VN")}
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={cx("order-details__empty")}>
          <Icon
            icon="mdi:file-document-outline"
            className={cx("order-details__empty-icon")}
          />
          <p>Chọn một đơn hàng để xem chi tiết</p>
        </div>
      )}
    </div>
  );
}
