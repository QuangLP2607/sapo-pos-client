import { useState, useCallback, useMemo } from "react";
import classNames from "classnames/bind";
import styles from "./OrderInfo.module.scss";

import type { Order } from "@interfaces/order";
import type { Customer } from "@interfaces/customer";

import CustomerCombobox from "@/components/CustomerCombobox";
import customerApi from "@services/customerService";
import printService from "@/services/printService";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";
import { useSalesTabs } from "@/hooks/useSalesTabs";

import BillTemplate from "../BillTemplate";

const cx = classNames.bind(styles);

interface OrderInfoProps {
  currentTabData: Order;
  updateTabData: (partialData: Partial<Order>, searchQuery?: string) => void;
}

export default function OrderInfo({
  currentTabData,
  updateTabData,
}: OrderInfoProps) {
  const { currentSearchQuery } = useSalesTabs();
  const note = currentTabData.note ?? "";
  const [autoPrint, setAutoPrint] = useState(false);

  // ================== Fetch customers ==================
  const fetchCustomers = useCallback(async (q: string) => {
    const res = await customerApi.getCustomers(q);
    return res.data;
  }, []);

  const mapToOptions = useCallback(
    (data: Customer[]) => data.map((c) => `${c.name} - ${c.phone}`),
    []
  );

  const { options, results: customers } = useDebouncedSearch<Customer>(
    currentSearchQuery,
    fetchCustomers,
    mapToOptions
  );

  const handleSelectCustomer = useCallback(
    (value: string) => {
      const found = customers.find((c) => `${c.name} - ${c.phone}` === value);
      if (!found) return;
      updateTabData({ customer: found }, currentSearchQuery);
    },
    [customers, updateTabData, currentSearchQuery]
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      updateTabData(value === "" ? { customer: undefined } : {}, value);
    },
    [updateTabData]
  );

  // ================== Calculations ==================
  const totalItems = useMemo(
    () => currentTabData.products.reduce((s, p) => s + p.qty, 0),
    [currentTabData.products]
  );

  const totalAmount = useMemo(
    () =>
      currentTabData.products.reduce((s, p) => s + (p.price || 0) * p.qty, 0),
    [currentTabData.products]
  );

  const vat = 0;
  const discount = 0;
  const payable = useMemo(
    () => totalAmount + vat - discount,
    [totalAmount, vat, discount]
  );

  // ================== Manual Print ==================
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  // ================== Payment & Auto Print ==================
  const handlePayment = useCallback(() => {
    updateTabData({ totalAmount, vat, discount, payable });

    if (autoPrint) {
      printService
        .printOrder({ ...currentTabData, totalAmount, vat, discount, payable })
        .then((res) => {
          if (!res.data.success) {
            console.error("In hóa đơn thất bại:", res.data.message);
          }
        })
        .catch((err) => console.error("Lỗi khi in hóa đơn:", err));

      alert("Thanh toán thành công!");
    } else {
      handlePrint();
    }
  }, [
    autoPrint,
    currentTabData,
    totalAmount,
    vat,
    discount,
    payable,
    updateTabData,
    handlePrint,
  ]);

  return (
    <div className={cx("order")}>
      {/* CUSTOMER SEARCH */}
      <div className={cx("order__search-customer")}>
        <CustomerCombobox
          placeholder="Tìm khách theo tên hoặc SĐT"
          options={options}
          value={
            currentTabData.customer
              ? `${currentTabData.customer.name} - ${currentTabData.customer.phone}`
              : ""
          }
          searchQuery={currentSearchQuery}
          onSearchQueryChange={handleSearchChange}
          onSelect={handleSelectCustomer}
        />
      </div>

      {/* INVOICE INFO */}
      <div className={cx("order__invoice")}>
        <div className={cx("order__invoice-line")}>
          <span>Tổng tiền hàng ({totalItems} sản phẩm)</span>
          {totalAmount.toLocaleString()}₫
        </div>

        <div className={cx("order__invoice-line")}>
          <span>VAT:</span> {vat.toLocaleString()}₫
        </div>

        <div className={cx("order__invoice-line")}>
          <span>Giảm giá:</span> {discount.toLocaleString()}₫
        </div>

        <div className={cx("order__invoice-line", "total")}>
          <span>Khách phải trả:</span>
          <strong>{payable.toLocaleString()}₫</strong>
        </div>
      </div>

      {/* ORDER NOTE */}
      <div className={cx("order__note-wrapper")}>
        <textarea
          placeholder="Nhập ghi chú đơn hàng"
          value={note}
          onChange={(e) => updateTabData({ note: e.target.value })}
          className={cx("note")}
          rows={3}
        />
      </div>

      {/* ACTIONS */}
      <div className={cx("order__actions")}>
        <label className={cx("print")}>
          <input
            type="checkbox"
            checked={autoPrint}
            onChange={(e) => setAutoPrint(e.target.checked)}
          />
          In hóa đơn tự động
        </label>

        <button className={cx("pay")} onClick={handlePayment}>
          Thanh toán
        </button>
      </div>

      {/* ================== Hidden print template ================== */}
      <div className={cx("print-only")}>
        <BillTemplate order={currentTabData} />
      </div>
    </div>
  );
}
