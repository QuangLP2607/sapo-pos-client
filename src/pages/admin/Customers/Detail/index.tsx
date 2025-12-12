import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import customerApi, { type Customer } from "@/services/customerService1";
import styles from "./CustomerDetail.module.scss";

const cx = classNames.bind(styles);

export default function CustomerDetail() {
  const { id } = useParams<{ id: string }>();

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  // ===== Fetch customer by ID =====
  useEffect(() => {
    async function load() {
      try {
        const res = await customerApi.getById(Number(id));
        setCustomer(res.data);
      } catch (err) {
        console.error("Failed to load customer", err);
        setCustomer(null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  // ===== Render: Loading =====
  if (loading) {
    return <div className={cx("loading")}>Đang tải dữ liệu...</div>;
  }

  // ===== Render: Not found =====
  if (!customer) {
    return <div className={cx("notFound")}>Không tìm thấy khách hàng.</div>;
  }

  // ===== Format dates =====
  const createdAt = customer.createdAt
    ? new Date(customer.createdAt).toLocaleString("vi-VN")
    : "-";

  const lastPurchase = customer.lastPurchaseDate
    ? new Date(customer.lastPurchaseDate).toLocaleString("vi-VN")
    : "-";

  const totalAmount =
    customer.totalPurchaseAmount?.toLocaleString("vi-VN") + " ₫";

  return (
    <div className={cx("customerDetail")}>
      <h2 className={cx("title")}>Chi tiết khách hàng</h2>

      {/* ===== Basic Info ===== */}
      <div className={cx("infoSection")}>
        <div className={cx("infoItem")}>
          <span className={cx("label")}>Họ tên:</span>
          <span className={cx("value")}>{customer.name}</span>
        </div>

        <div className={cx("infoItem")}>
          <span className={cx("label")}>Số điện thoại:</span>
          <span className={cx("value")}>{customer.phoneNum}</span>
        </div>

        <div className={cx("infoItem")}>
          <span className={cx("label")}>Giới tính:</span>
          <span className={cx("value")}>{customer.gender}</span>
        </div>

        <div className={cx("infoItem")}>
          <span className={cx("label")}>Ngày tạo:</span>
          <span className={cx("value")}>{createdAt}</span>
        </div>

        <div className={cx("infoItem")}>
          <span className={cx("label")}>Lần mua gần nhất:</span>
          <span className={cx("value")}>{lastPurchase}</span>
        </div>

        <div className={cx("infoItem")}>
          <span className={cx("label")}>Ghi chú:</span>
          <span className={cx("value")}>{customer.note || "-"}</span>
        </div>

        <div className={cx("infoItem")}>
          <span className={cx("label")}>Tổng chi tiêu:</span>
          <span className={cx("value", "highlight")}>{totalAmount}</span>
        </div>
      </div>

      {/* ===== Purchase History ===== */}
      <h3 className={cx("subtitle")}>Lịch sử mua hàng</h3>
      <table className={cx("historyTable")}>
        <thead>
          <tr>
            <th>Thời gian</th>
            <th>Số tiền</th>
            <th>Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {customer.purchases && customer.purchases.length > 0 ? (
            customer.purchases.map((p) => (
              <tr key={p.id}>
                <td>{new Date(p.purchaseDate).toLocaleString("vi-VN")}</td>
                <td>{p.amount.toLocaleString("vi-VN")} ₫</td>
                <td>{p.note || "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className={cx("noData")}>
                Chưa có giao dịch nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
