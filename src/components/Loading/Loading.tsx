import { Icon } from "@iconify/react";
import styles from "./loading.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(styles);

const Loading = () => {
  return (
    <div className={cx("wrapper")}>
      <span className={cx("spinner")}>
        <Icon icon="svg-spinners:90-ring-with-bg" width={56} height={56} />
      </span>
      <p className={cx("message")}>{"Đang tải..."}</p>
    </div>
  );
};

export default Loading;
