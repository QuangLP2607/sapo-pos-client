import type { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styles from "./SalesLayout.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface SalesLayoutProps {
  children: ReactNode;
}

const SalesLayout = ({ children }: SalesLayoutProps) => {
  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("wrapper__content")}>
        <Sidebar />
        <main className={cx("wrapper__content--main")}>{children}</main>
      </div>
    </div>
  );
};

export default SalesLayout;
