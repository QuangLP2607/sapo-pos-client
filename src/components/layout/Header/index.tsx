import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import { Icon } from "@iconify/react";
import styles from "./Header.module.scss";
import ConfirmModal from "@/components/ConfirmModal";

const cx = classNames.bind(styles);

export interface MenuItem {
  icon: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface NotificationItem {
  id: string | number;
  title: string;
  description?: string;
  href?: string;
}

export interface HeaderProps {
  menuItems?: MenuItem[];
  avatarUrl?: string | null;
  logout?: () => void;
  notifications?: NotificationItem[];
}

export default function Header({
  menuItems = [],
  avatarUrl,
  logout,
  notifications = [],
}: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [imgError, setImgError] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifyRef = useRef<HTMLDivElement>(null);

  // CLICK OUTSIDE
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setShowUserMenu(false);
      }

      if (notifyRef.current && !notifyRef.current.contains(target)) {
        setShowNotify(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className={cx("header")}>
      <div className={cx("header__actions")}>
        {/* NOTIFICATION */}
        <div
          className={cx("bell")}
          ref={notifyRef}
          onClick={(e) => {
            e.stopPropagation();
            setShowNotify((prev) => !prev);
            setShowUserMenu(false);
          }}
        >
          <Icon className={cx("bell-icon")} icon="iconoir:bell" />
          {notifications.length > 0 && (
            <span className={cx("bell-dot")}>{notifications.length}</span>
          )}

          {showNotify && (
            <div className={cx("header__dropdown", "header__dropdown--notify")}>
              {notifications.length === 0 ? (
                <div className={cx("header__dropdown-item")}>
                  Không có thông báo
                </div>
              ) : (
                notifications.map((n) => {
                  const Comp = n.href ? "a" : "div";
                  return (
                    <Comp
                      key={n.id}
                      className={cx("header__dropdown-item")}
                      href={n.href}
                    >
                      {n.title}
                      {n.description && (
                        <div className={cx("notification-desc")}>
                          {n.description}
                        </div>
                      )}
                    </Comp>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* AVATAR */}
        <div
          className={cx("avatar")}
          ref={userMenuRef}
          onClick={(e) => {
            e.stopPropagation();
            setShowUserMenu((prev) => !prev);
            setShowNotify(false);
          }}
        >
          {avatarUrl && !imgError && (
            <img
              className={cx("avatar-img")}
              src={avatarUrl}
              alt="Avatar"
              onError={() => setImgError(true)}
            />
          )}

          {showUserMenu && (
            <div className={cx("header__dropdown")}>
              {menuItems.map((item, idx) => {
                const Comp = item.href ? "a" : "div";

                return (
                  <Comp
                    key={idx}
                    className={cx("header__dropdown-item")}
                    href={item.href}
                    onClick={() => {
                      item.onClick?.();
                      setShowUserMenu(false);
                    }}
                  >
                    <Icon icon={item.icon} /> {item.label}
                  </Comp>
                );
              })}

              <div
                className={cx("header__dropdown-item")}
                onClick={() => setShowLogoutConfirm(true)}
              >
                <Icon icon="material-symbols:logout" /> Đăng xuất
              </div>
            </div>
          )}
        </div>

        {/* CONFIRM MODAL LOGOUT */}
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
      </div>
    </div>
  );
}
