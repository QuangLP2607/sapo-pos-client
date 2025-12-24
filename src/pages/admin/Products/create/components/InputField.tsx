import React, { type InputHTMLAttributes, type ReactNode } from "react";
import classNames from "classnames/bind";
import styles from "../styles/input-field.module.scss";

const cx = classNames.bind(styles);

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  prefixIcon?: ReactNode;
  suffix?: ReactNode;
  showInfo?: boolean;
  containerClassName?: string;
  placeholder?: string;
  isDecimal?: boolean;
}

const InputField: React.FC<InputProps> = ({
  label,
  required,
  prefixIcon,
  suffix,
  containerClassName,
  placeholder,
  isDecimal,
  ...props
}) => {
  const validateNumericInput = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    input.value = input.value.replace(/[^0-9]/g, "");
  };

  return (
    <div className={cx("wrapper", containerClassName)}>
      {label && (
        <div className={cx("label-wrapper")}>
          <span>{label}</span>
          {required && <span className={cx("required")}>*</span>}
        </div>
      )}

      <div className={cx("input-container")}>
        <input
          {...props}
          placeholder={placeholder}
          onInput={isDecimal ? validateNumericInput : () => {}}
          inputMode={isDecimal ? "decimal" : "text"}
        />

        {suffix && <div className={cx("suffix")}>{suffix}</div>}
      </div>
    </div>
  );
};

export default InputField;
