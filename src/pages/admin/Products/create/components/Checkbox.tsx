import React from "react";
import classNames from "classnames/bind";
import styles from "../styles/checkbox.module.scss";

const cx = classNames.bind(styles);

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, className, ...props }) => {
  return (
    <label className={cx("container", className)}>
      <input type="checkbox" {...props} />
      <span className={cx("checkmark")}></span>
      {label && <span className={cx("labelText")}>{label}</span>}
    </label>
  );
};

export default Checkbox;
