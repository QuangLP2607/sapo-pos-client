import classNames from "classnames/bind";
import styles from "../styles/error-card.module.scss";
import { Icon } from "@iconify/react";

const cx = classNames.bind(styles);

const ErrorCard = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => {
  return (
    <div className={cx("card")}>
      <div className={cx("wrapper")}>
        <div className={cx("icon-message-wrapper")}>
          <div className={cx("icon-wrapper")}>
            <span className={cx("error-icon")}>
              <Icon icon="bi:exclamation-circle" />
            </span>
          </div>

          <div className={cx("message-wrapper")}>
            <span>{message}</span>
          </div>
        </div>

        <div className={cx("btn-wrapper")}>
          <button className={cx("close-btn")} onClick={onClose}>
            <span className={cx("close-icon")}>
              <Icon icon="ph:x-circle" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorCard;
