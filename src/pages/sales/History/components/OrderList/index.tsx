import { useState, useMemo, useCallback, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./OrderList.module.scss";
import type { Order } from "@interfaces/order";
import orderApi from "@/services/orderService";
import { Icon } from "@iconify/react";
import { PaginationControls } from "@/components/PaginationControls";
import { useDebouncedSearch } from "@/hooks/useDebounce";

interface OrderListProps {
  onSelectOrder: (order: Order) => void;
  selectedOrder: Order | null;
}

const cx = classNames.bind(styles);

export default function OrderList({
  onSelectOrder,
  selectedOrder,
}: OrderListProps) {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState(
    firstDayOfMonth.toISOString().split("T")[0]
  );
  const [dateTo, setDateTo] = useState(today.toISOString().split("T")[0]);
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // ---------------- fetchFn memoized ----------------
  const fetchOrders = useCallback(async (q: string) => {
    setLoading(true);
    try {
      const res = await orderApi.getOrders(q);
      return res.data;
    } finally {
      setLoading(false);
    }
  }, []);

  const mapToOptions = useCallback(
    (items: Order[]) => items.map((o) => o.id),
    []
  );

  // ---------------- fetch all orders when mount ----------------
  useEffect(() => {
    const fetchInitial = async () => {
      setLoading(true);
      try {
        const res = await orderApi.getOrders("");
        setAllOrders(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchInitial();
  }, []);

  // ---------------- useDebouncedSearch ----------------
  const { results: searchedOrders } = useDebouncedSearch<Order>(
    search,
    fetchOrders,
    mapToOptions
  );

  const orders = search ? searchedOrders : allOrders;

  // ---------------- filter theo date ----------------
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      if (!order.paidAt) return false;

      const orderDate = new Date(order.paidAt);
      orderDate.setHours(0, 0, 0, 0);

      if (dateFrom) {
        const fromDate = new Date(dateFrom);
        fromDate.setHours(0, 0, 0, 0);
        if (orderDate < fromDate) return false;
      }

      if (dateTo) {
        const toDate = new Date(dateTo);
        toDate.setHours(23, 59, 59, 999);
        if (orderDate > toDate) return false;
      }

      return true;
    });
  }, [orders, dateFrom, dateTo]);

  // ---------------- pagination ----------------
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, dateFrom, dateTo]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const listElement = document.querySelector(`.${cx("order-list")}`);
    if (listElement) listElement.scrollTop = 0;
  };

  return (
    <div className={cx("order-list")}>
      {/* ---------------- Search ---------------- */}
      <div className={cx("order-list__search")}>
        <Icon icon="ic:round-search" className={cx("search-icon")} />
        <input
          type="text"
          placeholder="Tìm kiếm theo tên khách, sản phẩm hoặc mã đơn..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={cx("search-input")}
        />
      </div>

      {/* ---------------- Filters ---------------- */}
      <div className={cx("order-list__filters")}>
        <label className={cx("order-list__filter-label")}>
          <Icon icon="mdi:calendar" className={cx("order-list__filter-icon")} />
          Lọc theo ngày:
        </label>
        <div className={cx("order-list__date-range")}>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className={cx("order-list__date-input")}
          />
          <span className={cx("order-list__date-separator")}>đến</span>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className={cx("order-list__date-input")}
          />
          {(dateFrom || dateTo) && (
            <button
              className={cx("order-list__clear-date")}
              onClick={() => {
                setDateFrom("");
                setDateTo("");
              }}
              title="Xóa lọc ngày"
            >
              <Icon icon="mdi:close" />
            </button>
          )}
        </div>
      </div>

      {/* ---------------- Results ---------------- */}
      <div className={cx("order-list__results-count")}>
        Tìm thấy {filteredOrders.length} đơn hàng
      </div>

      {loading ? (
        <div className={cx("order-list__loading")}>Đang tải...</div>
      ) : (
        <>
          <ul className={cx("order-list__list")}>
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order) => (
                <li
                  key={order.id}
                  className={cx("order-list__item", {
                    active: selectedOrder?.id === order.id,
                  })}
                  onClick={() => onSelectOrder(order)}
                >
                  <div className={cx("order-list__item-header")}>
                    <span className={cx("order-list__item-id")}>
                      #{order.id}
                    </span>
                    {order.paidAt && (
                      <span className={cx("order-list__item-date")}>
                        {new Date(order.paidAt).toLocaleDateString("vi-VN")}
                      </span>
                    )}
                  </div>
                  <div className={cx("order-list__item-content")}>
                    <div className={cx("order-list__item-customer")}>
                      {order.customer?.name || "Khách lẻ"}
                    </div>
                    <div className={cx("order-list__item-product")}>
                      {order.products[0]?.name}
                      {order.products.length > 1 &&
                        ` +${order.products.length - 1}`}
                    </div>
                    <div className={cx("order-list__item-total")}>
                      {order.payable?.toLocaleString("vi-VN")}đ
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className={cx("order-list__empty")}>
                Không tìm thấy đơn hàng nào
              </li>
            )}
          </ul>

          <PaginationControls
            currentPage={currentPage}
            totalItems={filteredOrders.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={setItemsPerPage}
          />
        </>
      )}
    </div>
  );
}
