// src/components/BillTemplate.tsx
import type { Order } from "@/interfaces/order";
import "./BillTemplate.scss";

interface BillTemplateProps {
  order: Order;
}

export default function BillTemplate({ order }: BillTemplateProps) {
  const totalAmount = order.products.reduce(
    (s, p) => s + (p.price || 0) * p.qty,
    0
  );

  return (
    <div id="print-bill">
      <div className="bill-header">
        <h2>HÓA ĐƠN BÁN HÀNG</h2>
        <div>Ngày: {new Date().toLocaleString()}</div>
      </div>

      {order.customer && (
        <div className="bill-customer">
          <div>Khách: {order.customer.name}</div>
          <div>SĐT: {order.customer.phone}</div>
        </div>
      )}

      <table className="bill-table">
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>SL</th>
            <th>Đơn giá</th>
            <th>Thành tiền</th>
          </tr>
        </thead>

        <tbody>
          {order.products.map((p, i) => (
            <tr key={i}>
              <td>{p.name}</td>
              <td>{p.qty}</td>
              <td>{p.price.toLocaleString()}₫</td>
              <td>{(p.price * p.qty).toLocaleString()}₫</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bill-total">
        Tổng thanh toán: {totalAmount.toLocaleString()}₫
      </div>

      <div className="bill-footer">Cảm ơn quý khách!</div>
    </div>
  );
}
