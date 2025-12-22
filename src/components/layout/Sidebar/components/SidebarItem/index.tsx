import { memo, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./SidebarItem.module.scss";
import { Icon } from "@iconify/react";
import type { MenuItem, DropdownConfig } from "../../index";

const cx = classNames.bind(styles);

interface ItemProps {
  data: MenuItem;
  lvl?: number;
  collapsed: boolean;
  path: string;
  onExpand?: () => void;
}

/* ================= DROPDOWN ================= */
function Dropdown<T>({
  dropdown,
  onClose,
}: {
  dropdown: DropdownConfig<T>;
  onClose: () => void;
}) {
  return (
    <>
      {dropdown.options.map((opt, idx) => (
        <li className={cx("dropdown__item")} key={idx}>
          <button
            type="button"
            className={cx({ active: idx === dropdown.selectedIndex })}
            onClick={() => {
              dropdown.onSelect(idx);
              onClose();
            }}
          >
            {dropdown.getLabel(opt)}
          </button>
        </li>
      ))}
    </>
  );
}

/* ================= ITEM ================= */
const Item = memo(function Item({
  data,
  lvl = 0,
  collapsed,
  path,
  onExpand,
}: ItemProps) {
  const [manualOpen, setManualOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  if (collapsed && !data.icon) return null;

  const hasSub = Boolean(data.items?.length);
  const hasDrop = Boolean(data.dropdown);
  const active = Boolean(data.to && path.startsWith(data.to));

  const subOpen = hasSub && (manualOpen || active);

  return (
    <li
      className={cx("menu__item", { collapsed, hasDrop })}
      style={
        !collapsed ? ({ "--level": lvl } as React.CSSProperties) : undefined
      }
    >
      <div className={cx("menu__item-wrapper", { active })}>
        {data.to ? (
          <Link to={data.to} className={cx("item", { active })}>
            {data.icon && (
              <Icon icon={data.icon} className={cx("item__icon")} />
            )}
            {!collapsed && (
              <span className={cx("item__content")}>{data.label}</span>
            )}
          </Link>
        ) : (
          <button
            type="button"
            className={cx("item")}
            onClick={() => {
              if (collapsed && hasSub) {
                onExpand?.();
                setManualOpen(true);
                return;
              }

              if (hasSub) {
                setManualOpen((v) => !v);
              }
            }}
          >
            {data.icon && (
              <Icon icon={data.icon} className={cx("item__icon")} />
            )}
            {!collapsed && (
              <span className={cx("item__content")}>{data.label}</span>
            )}
          </button>
        )}

        {/* ===== TOOLTIP ===== */}
        {collapsed && <span className={cx("item__tooltip")}>{data.label}</span>}

        {/* ===== DROPDOWN ===== */}
        {hasDrop && !collapsed && (
          <div className={cx("dropdown")}>
            <button
              className={cx("dropdown__toggle")}
              type="button"
              onClick={() => setDropOpen((v) => !v)}
            >
              <Icon
                icon="tabler:chevron-down"
                className={cx("dropdown__icon", { open: dropOpen })}
              />
            </button>

            {dropOpen && (
              <ul className={cx("dropdown__menu")}>
                <Dropdown
                  dropdown={data.dropdown!}
                  onClose={() => setDropOpen(false)}
                />
              </ul>
            )}
          </div>
        )}
      </div>

      {subOpen && (
        <ul className={cx("menu__sub")}>
          {data.items!.map((child, idx) => (
            <Item
              key={idx}
              data={child}
              lvl={lvl + 1}
              collapsed={collapsed}
              path={path}
              onExpand={onExpand}
            />
          ))}
        </ul>
      )}
    </li>
  );
});

export default Item;
