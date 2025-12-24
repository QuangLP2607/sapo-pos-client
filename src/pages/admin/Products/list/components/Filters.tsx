import { Icon } from "@iconify/react";
import styles from "./styles/filters.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import Dropdown from "../../create/components/DropdownList";

const cx = classNames.bind(styles);

const Filters = () => {
  const [singleVal, setSingleVal] = useState("");
  const [multiVals, setMultiVals] = useState<string[]>([]);

  const fruitOptions = [
    { label: "Táo", value: "apple" },
    { label: "Chuối", value: "banana" },
    { label: "Cam", value: "orange" },
  ];

  return (
    <div className={cx("filters")}>
      <div className={cx("filter-row")}>
        <div className={cx("search-container")}>
          <Icon
            className={cx("search-icon")}
            icon="material-symbols-light:search"
          />
          <input
            type="text"
            placeholder="Tìm kiếm theo mã sản phẩm, tên sản phẩm, barcode"
            className={cx("search-input")}
          />
        </div>
        <Dropdown
          options={fruitOptions}
          onChange={setSingleVal}
          value={singleVal}
          placeholder={"Lọc theo nhãn hàng"}
        />
        <Dropdown
          multi
          options={fruitOptions}
          value={multiVals}
          onChange={setMultiVals}
          placeholder={"Lọc theo loại hàng"}
        />
      </div>
    </div>
  );
};

export default Filters;
