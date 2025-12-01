import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./History.module.scss";
import type { Order } from "@interfaces/order";
import OrderList from "./components/OrderList";
import OrderDetails from "./components/OrderDetails";

const cx = classNames.bind(styles);

export default function History() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return (
    <div className={cx("history")}>
      <OrderList
        onSelectOrder={setSelectedOrder}
        selectedOrder={selectedOrder}
      />
      <OrderDetails selectedOrder={selectedOrder} />
    </div>
  );
}
