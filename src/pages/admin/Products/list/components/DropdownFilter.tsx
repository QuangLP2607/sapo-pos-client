import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import styles from "./styles/dropdown-filter.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export interface FilterOption {
  id: string | number;
  label: string;
}

export interface DropdownFilterProps {
  options: FilterOption[];
  onFilterChange: (selectedId: any) => void;
  placeholder?: string;
  label?: string;
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({
  options,
  onFilterChange,
  placeholder = "Chọn một tùy chọn",
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | number | null>(
    null
  );

  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (id: string | number) => {
    setSelectedValue(id);
    onFilterChange(id);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  const selectedLabel = options.find((opt) => opt.id === selectedValue)?.label;

  return (
    <div className={cx("dropdown-filter-wrapper")} ref={containerRef}>
      {label && (
        <div>
          <span>{label}</span>
        </div>
      )}

      <div className={cx("dropdown-filter-container")}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cx(`dropdown-filter-button`, `${isOpen ? "open" : ""}`)}
        >
          <span
            className={cx(
              `dropdown-filter-text`,
              `${selectedLabel ? "selected" : "placeholder"}`
            )}
          >
            {selectedLabel || placeholder}
          </span>
          <Icon
            icon="mynaui:chevron-down-solid"
            className={cx(`dropdown-filter-icon`, `${isOpen ? "rotated" : ""}`)}
          />
        </button>

        {isOpen && (
          <div className={cx("dropdown-filter-menu")}>
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className={cx(
                  `dropdown-filter-item`,
                  `${selectedValue === option.id ? "active" : ""}`
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownFilter;
