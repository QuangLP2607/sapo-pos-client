import { Icon } from "@iconify/react";
import styles from "../styles/header.module.scss";
import classNames from "classnames/bind";
import CancelButton from "./CancelButton";
import SaveButton from "./SaveButton";

const cx = classNames.bind(styles);

export interface HeaderProps {
  title: string;
  handleSave: (data: any) => void;
  handleCancel: () => void;
}

const Header = ({ title, handleSave, handleCancel }: HeaderProps) => {
  return (
    <header className={cx("header-wrapper")}>
      <div className={cx("header-left")}>
        <button className={cx("header-button")} onClick={handleCancel}>
          <span>
            <Icon icon="lets-icons:back" />
          </span>
        </button>
        <h2>{title}</h2>
      </div>
      <div className={cx("header-right")}>
        <CancelButton onCancel={handleCancel} />
        <SaveButton onSave={handleSave} />
      </div>
    </header>
  );
};

export default Header;
