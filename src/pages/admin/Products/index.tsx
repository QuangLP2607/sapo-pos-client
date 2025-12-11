import styles from "./Products.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Products = () => {
  return <div className={cx("products")}></div>;
};

export default Products;
