import { useState } from "react";
import { Icon } from "@iconify/react";
import styles from "./UserMenu.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface MenuItem {
  icon: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

interface Props {
  avatarUrl?: string | null;
  menuItems?: MenuItem[];
  open: boolean;
  onToggle: () => void;
  onLogout?: () => void;
}

export default function UserMenu({
  avatarUrl,
  menuItems = [],
  open,
  onToggle,
  onLogout,
}: Props) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={cx("avatar")}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
    >
      {!avatarUrl || imgError ? (
        <Icon className={cx("avatar-icon")} icon="si:user-fill" />
      ) : (
        <img
          className={cx("avatar-img")}
          src={avatarUrl}
          alt="Avatar"
          draggable={false}
          onError={() => setImgError(true)}
        />
      )}

      {open && (
        <div className={cx("avatar__dropdown")}>
          {menuItems.map((item, idx) => {
            const Comp = item.href ? "a" : "div";
            return (
              <Comp
                key={idx}
                className={cx("avatar__dropdown-item")}
                href={item.href}
                onClick={(e) => {
                  e.stopPropagation();
                  item.onClick?.();
                }}
              >
                <Icon icon={item.icon} /> {item.label}
              </Comp>
            );
          })}

          <div
            className={cx("avatar__dropdown-item")}
            onClick={(e) => {
              e.stopPropagation();
              onLogout?.();
            }}
          >
            <Icon icon="material-symbols:logout" /> Đăng xuất
          </div>
        </div>
      )}
    </div>
  );
}
