import classNames from "classnames/bind";
import styles from "./Inventory.module.scss";
import ProductList from "./components/ProductList";

const cx = classNames.bind(styles);

export default function Inventory() {
  return (
    <div className={cx("inventory")}>
      <ProductList />
    </div>
  );
}
