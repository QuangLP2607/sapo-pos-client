import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { Icon } from "@iconify/react";
import ConfirmModal from "@/components/ConfirmModal";
import Item from "./components/SidebarItem";

const cx = classNames.bind(styles);

/* ================= TYPES ================= */
export interface DropdownConfig<T> {
  options: readonly T[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  getLabel: (option: T) => string;
}

export interface MenuItem {
  label: string;
  icon?: string;
  to?: string;
  items?: MenuItem[];
  dropdown?: DropdownConfig<unknown>;
}

export interface MenuGroup {
  title?: string;
  items: MenuItem[];
}

interface SidebarProps {
  menuGroups: MenuGroup[];
  logo?: { small: string; large: string };
  logout?: () => void;
}

export default function Sidebar({ menuGroups, logo, logout }: SidebarProps) {
  const { pathname } = useLocation();

  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem("sidebar-collapsed") !== "false";
    } catch {
      return true;
    }
  });

  const toggleSidebar = () => {
    setCollapsed((prev) => {
      localStorage.setItem("sidebar-collapsed", String(!prev));
      return !prev;
    });
  };

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  return (
    <div className={cx("sidebar-wrapper")}>
      {!collapsed && (
        <div
          className={cx("sidebar-overlay")}
          onClick={() => setCollapsed(true)}
        />
      )}

      <button className={cx("sidebar-toggle")} onClick={toggleSidebar}>
        <Icon
          icon={
            collapsed ? "line-md:menu-fold-right" : "line-md:menu-fold-left"
          }
        />
      </button>

      <aside className={cx("sidebar", { collapsed })}>
        {/* LOGO */}
        <Link to="/" className={cx("sidebar-logo")}>
          {logo && (
            <>
              <img
                src={logo.small}
                className={cx("sidebar-logo__img", "is-small")}
              />
              <img
                src={logo.large}
                className={cx("sidebar-logo__img", "is-large")}
              />
            </>
          )}
        </Link>

        {/* MENU */}
        <ul className={cx("sidebar-menu")}>
          {menuGroups.map((group, idx) => {
            const hasTitle = Boolean(group.title);

            return (
              <li key={idx} className={cx("menu-group")}>
                {/* ===== GROUP TITLE ===== */}
                <div className={cx("menu-group__title", { hasTitle })}>
                  <hr />
                  {hasTitle && <span>{group.title}</span>}
                </div>

                <ul className={cx("menu-group__list")}>
                  {group.items.map((item, i) => (
                    <Item
                      key={i}
                      data={item}
                      collapsed={collapsed}
                      path={pathname}
                      onExpand={toggleSidebar}
                    />
                  ))}
                </ul>
              </li>
            );
          })}

          {logout && (
            <button
              className={cx("sidebar-logout")}
              onClick={() => setShowLogoutConfirm(true)}
            >
              <Icon icon="line-md:logout" />
              {!collapsed && <span>Đăng xuất</span>}
            </button>
          )}
        </ul>

        <ConfirmModal
          open={showLogoutConfirm}
          title="Xác nhận đăng xuất"
          message="Bạn có chắc muốn đăng xuất?"
          confirmText="Đăng xuất"
          cancelText="Hủy"
          onCancel={() => setShowLogoutConfirm(false)}
          onConfirm={() => {
            logout?.();
            setShowLogoutConfirm(false);
          }}
        />
      </aside>
    </div>
  );
}
