import { useState, useEffect, useMemo } from "react";
import classNames from "classnames/bind";
import styles from "./OrderList.module.scss";
import type { Order } from "@interfaces/order";
import orderApi from "@/services/orderService";
import { Icon } from "@iconify/react";
import PaginationWithItemsPerPage from "@/components/PaginationWithItemsPerPage";

interface OrderListProps {
  onSelectOrder: (order: Order) => void;
  selectedOrder: Order | null;
}

const cx = classNames.bind(styles);
const DEFAULT_ITEMS_PER_PAGE = 5;

export default function OrderList({
  onSelectOrder,
  selectedOrder,
}: OrderListProps) {
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);

  // Fetch data khi search thay đổi
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await orderApi.getOrders(search);
        if (isMounted) setOrders(res.data);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [search]);

  // Filter theo search và date
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const q = search.toLowerCase();
      const customerName = order.customer?.name?.toLowerCase() ?? "";
      const firstProduct = order.products[0]?.name.toLowerCase() ?? "";
      const orderId = order.id.toLowerCase();
      const matchesSearch =
        !q ||
        customerName.includes(q) ||
        firstProduct.includes(q) ||
        orderId.includes(q);

      if (!matchesSearch) return false;
      if (!order.paidAt) return false;

      const orderDate = new Date(order.paidAt);
      orderDate.setHours(0, 0, 0, 0);

      if (!dateFrom && !dateTo) return true;

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
  }, [orders, search, dateFrom, dateTo]);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, dateFrom, dateTo, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const listElement = document.querySelector(`.${cx("order-list")}`);
    if (listElement) {
      listElement.scrollTop = 0;
    }
  };

  return (
    <div className={cx("order-list")}>
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
            placeholder="Từ ngày"
          />
          <span className={cx("order-list__date-separator")}>đến</span>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className={cx("order-list__date-input")}
            placeholder="Đến ngày"
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

          <PaginationWithItemsPerPage
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={setItemsPerPage}
            itemsPerPageOptions={[1, 5, 10, 20, 50]}
            itemsPerPagePosition="left"
            className={cx("order-list__pagination")}
          />
        </>
      )}
    </div>
  );
}
