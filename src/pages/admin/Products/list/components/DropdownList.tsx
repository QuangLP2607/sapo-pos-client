import React, { useState, useRef, useEffect } from "react";
import styles from "./styles/dropdown-list.module.scss";
import classNames from "classnames/bind";
import { Icon } from "@iconify/react";

const pageSizeOptions = [{ value: 20 }, { value: 50 }];

interface DropdownListProps {
  value: any;
  onChange: (value: any) => void;
}

const cx = classNames.bind(styles);

const DropdownList: React.FC<DropdownListProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption =
    pageSizeOptions.find((opt) => opt.value === value) || pageSizeOptions[0];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (value: number) => {
    onChange(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={cx("pagination-dropdown")} ref={dropdownRef}>
      <button
        className={cx("pagination-dropdown-button")}
        onClick={toggleDropdown}
      >
        <span>{selectedOption.value}</span>
        <span className={cx("pagination-dropdown-arrow")}>
          {isOpen ? (
            <div className={cx("dropdown-icon")}>
              <Icon icon="mynaui:chevron-up-solid" />
            </div>
          ) : (
            <div className={cx("dropdown-icon")}>
              <Icon icon="mynaui:chevron-down-solid" />
            </div>
          )}
        </span>
      </button>
      {isOpen && (
        <ul className={cx("pagination-dropdown-list")}>
          {pageSizeOptions.map((option) => (
            <li
              key={option.value}
              className={cx("pagination-dropdown-item")}
              onClick={() => handleSelect(option.value)}
            >
              {option.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownList;
