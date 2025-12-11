import { useState, useRef, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Select.module.scss";
import { Icon } from "@iconify/react";

const cx = classNames.bind(styles);

export interface Option {
  value: string | number;
  label: string;
}

export interface SelectProps {
  label?: string;
  value?: string | number;
  placeholder?: string;
  options: Option[];
  onChange: (value: string | number) => void;
  className?: string;
  style?: React.CSSProperties;
}

export function Select({
  value,
  placeholder,
  options,
  onChange,
  className,
  style,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={cx("select-wrapper", className)} style={style} ref={ref}>
      <div
        className={cx("select-display", { open })}
        onClick={() => setOpen(!open)}
      >
        {selectedOption?.label || placeholder || "Chọn..."}
        <span className={cx("arrow")}>
          <Icon icon="iconamoon:arrow-down-2-bold" />
        </span>
      </div>
      {open && (
        <ul className={cx("select-dropdown")}>
          {options.map((opt) => (
            <li
              key={opt.value}
              className={cx("select-option", { selected: opt.value === value })}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
