import { useState } from "react";
import classNames from "classnames/bind";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import ConfirmModal from "@/components/ConfirmModal";

const cx = classNames.bind(styles);

const menuItems = [
  { id: 1, label: "Checkout", icon: "mdi:shopping", path: "/sales/checkout" },
  { id: 2, label: "History", icon: "mdi:history", path: "/sales/history" },
  {
    id: 3,
    label: "Inventory",
    icon: "mdi:warehouse",
    path: "/sales/inventory",
  },
];

export default function Sidebar() {
  const location = useLocation();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      <aside className={cx("sidebar")}>
        <nav className={cx("menu")}>
          {menuItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.id}
                to={item.path}
                className={cx("menu__item", { active: isActive })}
              >
                <Icon className={cx("menu__item-icon")} icon={item.icon} />
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => setShowConfirm(true)}
          className={cx("menu__item", "logout")}
        >
          <Icon icon="mdi:logout" className={cx("menu__item-icon")} />
        </button>
      </aside>

      {/* Modal xác nhận logout */}
      <ConfirmModal
        open={showConfirm}
        title="Xác nhận đăng xuất"
        message="Bạn có chắc muốn đăng xuất không?"
        confirmText="Đăng xuất"
        cancelText="Hủy"
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}
