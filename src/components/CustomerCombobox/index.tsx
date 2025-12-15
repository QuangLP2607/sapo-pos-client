import { useState, useRef, useEffect, useMemo } from "react";
import classNames from "classnames/bind";
import styles from "./CustomerCombobox.module.scss";
import { Icon } from "@iconify/react";

const cx = classNames.bind(styles);

interface ComboboxProps {
  placeholder?: string;
  options: string[];
  onSelect: (value: string) => void;
  className?: string;
  value?: string;
  searchQuery?: string;
  onSearchQueryChange?: (query: string) => void;
}

export default function CustomerCombobox({
  placeholder = "Nhập từ khoá...",
  options,
  onSelect,
  className,
  value,
  searchQuery,
  onSearchQueryChange,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const displayValue = focused ? searchQuery || "" : value || "";

  const filteredOptions = useMemo(() => {
    return options.filter((opt) =>
      opt.toLowerCase().includes((searchQuery || "").toLowerCase())
    );
  }, [options, searchQuery]);

  const handleSelect = (val: string) => {
    onSelect(val);
    setOpen(false);
    setFocused(false);
    inputRef.current?.blur();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchQueryChange?.(e.target.value);
    setOpen(true);
  };

  const handleFocus = () => {
    setFocused(true);
    setOpen(true);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setFocused(false);
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className={cx("cbx", className)} ref={ref}>
      <Icon icon="bxs:user" className={cx("cbx__icon")} />

      <input
        ref={inputRef}
        className={cx("cbx__input")}
        placeholder={placeholder}
        type="text"
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
      />

      {open && (
        <ul className={cx("cbx__dropdown")}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((item) => (
              <li
                key={item}
                className={cx("cbx__item")}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelect(item);
                }}
              >
                {item}
              </li>
            ))
          ) : (
            <li className={cx("cbx__no-data")}>Không có kết quả</li>
          )}
        </ul>
      )}

      <div className={cx("cbx__add")}>
        <Icon icon="tabler:plus" className={cx("cbx__add-icon")} />
      </div>
    </div>
  );
}
