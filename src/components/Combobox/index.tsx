import { useState, useRef, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Combobox.module.scss";
import { Icon } from "@iconify/react";

const cx = classNames.bind(styles);

interface ComboboxProps {
  placeholder?: string;
  options: string[];
  onSelect: (value: string) => void;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  keepValueOnSelect?: boolean;
}

export default function Combobox({
  placeholder = "Nhập từ khoá...",
  options,
  onSelect,
  className,
  value,
  onChange,
  keepValueOnSelect = false,
}: ComboboxProps) {
  const [internalQuery, setInternalQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [displayedOptions, setDisplayedOptions] = useState<string[]>(options);

  const ref = useRef<HTMLDivElement>(null);

  const query = value ?? internalQuery;
  const setQuery = onChange ?? setInternalQuery;

  useEffect(() => {
    setDisplayedOptions(options);
  }, [options]);

  const handleSelect = (val: string) => {
    onSelect(val);

    if (keepValueOnSelect) {
      setQuery(val);
    } else {
      setQuery("");
    }

    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);
    setOpen(true);

    setDisplayedOptions(
      options.filter((opt) =>
        opt.toLowerCase().includes(newValue.toLowerCase())
      )
    );
  };

  const handleFocus = () => {
    setOpen(true);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const shouldShowDropdown = open && displayedOptions.length > 0;

  return (
    <div className={cx("cbx", className)} ref={ref}>
      <Icon icon="ic:round-search" className={cx("cbx__icon")} />
      <input
        className={cx("cbx__input")}
        placeholder={placeholder}
        type="text"
        value={query}
        onChange={handleChange}
        onFocus={handleFocus}
      />

      {shouldShowDropdown && (
        <ul className={cx("cbx__dropdown")}>
          {displayedOptions.map((item) => (
            <li
              key={item}
              className={cx("cbx__item")}
              onClick={() => handleSelect(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      {open && displayedOptions.length === 0 && (
        <ul className={cx("cbx__dropdown")}>
          <li className={cx("cbx__no-data")}>Không có kết quả</li>
        </ul>
      )}
    </div>
  );
}
