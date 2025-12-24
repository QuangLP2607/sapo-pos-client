import type { ReactNode } from "react";
import classNames from "classnames/bind";
import OwnerFooter from "./Footer";
import OwnerHeader from "./Header";
import OwnerSidebar from "./Sidebar";
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
      <div className={cx("wrapper--sidebar")}>
        {showSidebar && <OwnerSidebar />}
      </div>

      <div className={cx("wrapper__content")}>
        {showHeader && (
          <div className={cx("wrapper__content--header")}>
            <OwnerHeader />
          </div>
        )}

        <main className={cx("wrapper__content--main")}>{children}</main>

        {showFooter && (
          <div className={cx("wrapper__content--footer")}>
            <OwnerFooter />
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerLayout;
