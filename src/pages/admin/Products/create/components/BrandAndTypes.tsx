import { useState } from "react";
import Dropdown from "./DropdownList";
import styles from "../styles/brand-type.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const BrandAndType = () => {
  const [singleVal, setSingleVal] = useState("");
  const [multiVals, setMultiVals] = useState<string[]>([]);

  const fruitOptions = [
    { label: "Táo", value: "apple" },
    { label: "Chuối", value: "banana" },
    { label: "Cam", value: "orange" },
  ];

  return (
    <div className={cx("brand-type-wrapper")}>
      <Dropdown
        label="Nhãn hiệu"
        options={fruitOptions}
        value={singleVal}
        onChange={setSingleVal}
      />

      <Dropdown
        label="Loại sản phẩm"
        multi
        placeholder="Chọn nhiều loại trái cây..."
        options={fruitOptions}
        value={multiVals}
        onChange={setMultiVals}
      />
    </div>
  );
};

export default BrandAndType;
