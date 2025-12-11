import type { ReactNode } from "react";
import classNames from "classnames/bind";
import AdminFooter from "./Footer";
import AdminHeader from "./Header";
import AdminSidebar from "./Sidebar";
import styles from "./OwnerLayout.module.scss";

const cx = classNames.bind(styles);

interface OwnerLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showSidebar?: boolean;
  showFooter?: boolean;
}

const OwnerLayout = ({
  children,
  showHeader = true,
  showSidebar = true,
  showFooter = true,
}: OwnerLayoutProps) => {
  return (
    <div className={cx("wrapper")}>
      {showSidebar && <AdminSidebar />}
      <div className={cx("wrapper__content")}>
        {showHeader && <AdminHeader />}
        <main className={cx("wrapper__content--main")}>{children}</main>
        {showFooter && <AdminFooter />}
      </div>
    </div>
  );
};

export default OwnerLayout;
