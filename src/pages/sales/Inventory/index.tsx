import styles from "./Inventory.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Inventory = () => {
  return <div className={cx("inventory")}>Inventory Page</div>;
};

export default Inventory;
