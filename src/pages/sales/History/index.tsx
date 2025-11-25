import styles from "./History.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const History = () => {
  return <div className={cx("history")}>History Page</div>;
};

export default History;
