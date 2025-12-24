import classNames from "classnames/bind";
import SaveButton from "./SaveButton";

import styles from "../styles/footer.module.scss";

const cx = classNames.bind(styles);

const Footer = () => {
  const handleFunction = () => {};

  return (
    <footer className={cx("footer")}>
      <div className={cx("footer-header")}>
        <div className={cx("footer-btn")}>
          <SaveButton onSave={handleFunction} />
        </div>
      </div>

      <div className={cx("footer-link")}>
        <span>{"Tìm hiểu thêm về "}</span>
        <a href="https://help.sapo.vn/them-thong-tin-chi-tiet-san-pham">
          {"sản phẩm"}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
