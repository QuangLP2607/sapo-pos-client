import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "../styles/drop-down.module.scss";
import { Icon } from "@iconify/react";

const cx = classNames.bind(styles);

interface Option {
  label: string;
  value: string | number;
}

interface DropdownProps {
  label?: string;
  options: Option[];
  placeholder?: string;
  multi?: boolean;
  value?: any;
  onChange: (value: any) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  placeholder = "Chọn giá trị...",
  multi = false,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // hide dropdown when click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (option: Option) => {
    if (multi) {
      const currentValues = Array.isArray(value) ? value : [];
      const isSelected = currentValues.includes(option.value);

      const newValues = isSelected
        ? currentValues.filter((v) => v !== option.value)
        : [...currentValues, option.value];

      onChange(newValues);
    } else {
      onChange(option.value);
      setIsOpen(false);
    }
  };

  const isSelected = (optionValue: string | number) => {
    if (multi) return Array.isArray(value) && value.includes(optionValue);
    return value === optionValue;
  };

  const renderDisplay = () => {
    if (multi) {
      if (!value || value.length === 0)
        return <span className={cx("placeholder")}>{placeholder}</span>;
      return (
        <div className={cx("selectedValues")}>
          {options
            .filter((opt) => value.includes(opt.value))
            .map((opt) => (
              <span key={opt.value} className={cx("tag")}>
                <span>{opt.label}</span>
                <button
                  className={cx("removeBtn")}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(opt);
                  }}
                >
                  <Icon icon="ix:cancel" />
                </button>
              </span>
            ))}
        </div>
      );
    }

    const selectedOpt = options.find((opt) => opt.value === value);
    return selectedOpt ? (
      <span>{selectedOpt.label}</span>
    ) : (
      <span className={cx("placeholder")}>{placeholder}</span>
    );
  };

  return (
    <div className={cx("dropdownWrapper")} ref={containerRef}>
      {label && <label className={cx("label")}>{label}</label>}

      <div className={cx("control", { isOpen })} onClick={handleToggle}>
        {renderDisplay()}
        <span style={{ fontSize: "12px", color: "#637381" }}>
          {isOpen ? (
            <Icon icon="akar-icons:triangle-up-fill" />
          ) : (
            <Icon icon="akar-icons:triangle-down-fill" />
          )}
        </span>
      </div>

      {isOpen && (
        <div className={cx("menu")}>
          {options.map((option) => (
            <div
              key={option.value}
              className={cx("option", { selected: isSelected(option.value) })}
              onClick={() => handleSelect(option)}
            >
              {option.label}
              {isSelected(option.value) && (
                <span>
                  <Icon icon="prime:check" />
                </span>
              )}
            </div>
          ))}
          {options.length === 0 && (
            <div className={cx("option")} style={{ color: "#919eab" }}>
              Không có dữ liệu
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
