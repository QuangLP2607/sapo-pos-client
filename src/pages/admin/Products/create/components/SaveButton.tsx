import styles from "../styles/button.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const SaveButton = ({ onSave }: { onSave: (data: any) => void }) => {
  return (
    <button
      className={cx("button", "header-right-btn", "save-btn", "active")}
      onClick={onSave}
    >
      {"Lưu"}
    </button>
  );
};

export default SaveButton;
