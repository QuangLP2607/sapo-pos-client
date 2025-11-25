import styles from "./Checkout.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Checkout = () => {
  return <div className={cx("checkout")}>Checkout Page</div>;
};

export default Checkout;
