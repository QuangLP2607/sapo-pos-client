import styles from "../styles/button.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const CancelButton = ({ onCancel }: { onCancel: () => void }) => {
  return (
    <button
      className={cx("button", "header-right-btn", "cancel-btn")}
      onClick={onCancel}
    >
      {"Hủy"}
    </button>
  );
};

export default CancelButton;
