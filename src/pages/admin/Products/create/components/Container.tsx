import type React from "react";
import styles from "../styles/container.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Container = ({
  children,
  title,
  subTitle,
  isHidden,
  onChange,
}: {
  children: React.ReactElement;
  title?: string;
  subTitle?: string;
  isHidden?: boolean;
  onChange?: () => void;
}) => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        {title && <h2 className={cx("title")}>{title}</h2>}
        {subTitle && isHidden && (
          <button className={cx("header-btn")} onClick={onChange}>
            {subTitle}
          </button>
        )}
      </div>

      <div className={cx("body")}>{children}</div>
    </div>
  );
};

export default Container;
