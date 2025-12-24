import classNames from "classnames/bind";
import styles from "./Checkout.module.scss";
import useCheckoutTabs from "@/hooks/useCheckoutTabs";
import OrderInfo from "./components/OrderInfo";
import ProductsList from "./components/ProductsList";

const cx = classNames.bind(styles);

export default function Checkout() {
  const { currentTabData, updateTabData } = useCheckoutTabs();

  return (
    <div className={cx("checkout")}>
      <ProductsList
        currentTabData={currentTabData}
        updateTabData={updateTabData}
      />
      <OrderInfo
        currentTabData={currentTabData}
        updateTabData={updateTabData}
      />
    </div>
  );
}
