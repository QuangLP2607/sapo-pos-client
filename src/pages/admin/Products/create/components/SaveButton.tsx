import styles from "../styles/button.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const SaveButton = ({
  onSave,
  isActive = false,
}: {
  onSave: (data: any) => void;
  isActive?: boolean;
}) => {
  return (
    <button
      className={cx(
        "button",
        "header-right-btn",
        "save-btn",
        `${isActive && "active"}`
      )}
      onClick={onSave}
    >
      {"Lưu"}
    </button>
  );
};

export default SaveButton;
