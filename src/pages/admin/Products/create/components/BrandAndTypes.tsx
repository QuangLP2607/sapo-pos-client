import { useEffect, useState } from "react";
import Dropdown, { type Option } from "./DropdownList";
import styles from "../styles/brand-type.module.scss";
import classNames from "classnames/bind";
import brandApi from "@/services/brandService";
import typeApi from "@/services/typeService";

const cx = classNames.bind(styles);

const BrandAndType = ({
  onChange,
  initialBrandId,
  initialTypeIds,
}: {
  initialBrandId?: number;
  initialTypeIds?: number[];
  onChange: ({
    brandId,
    typeIds,
  }: {
    brandId: number;
    typeIds: number[];
  }) => void;
}) => {
  const [singleVal, setSingleVal] = useState(initialBrandId || 0);
  const [multiVals, setMultiVals] = useState<number[]>(initialTypeIds || []);

  const [brandsList, setBrandsList] = useState<Option[]>([]);
  const [typesList, setTypesList] = useState<Option[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brands = (await brandApi.getBrands({ page: 0, size: 10 })).brands;
        setBrandsList(
          brands.map((brand) => ({
            label: brand.name,
            value: brand.id,
          }))
        );
      } catch (err) {
        console.log("error::", err);
        setBrandsList([]);
      }
    };

    const fetchTypes = async () => {
      try {
        const types = (await typeApi.getTypes({ page: 0, size: 10 })).types;
        setTypesList(
          types.map((type) => ({
            label: type.name,
            value: type.id,
          }))
        );
      } catch (err) {
        console.log("error::", err);
        setTypesList([]);
      }
    };

    fetchBrands();
    fetchTypes();
  }, []);

  useEffect(() => {
    onChange({
      brandId: singleVal,
      typeIds: multiVals,
    });
  }, [singleVal, multiVals]);

  return (
    <div className={cx("brand-type-wrapper")}>
      <Dropdown
        label="Nhãn hiệu"
        options={brandsList}
        value={singleVal}
        onChange={setSingleVal}
      />

      <Dropdown
        label="Loại sản phẩm"
        multi
        placeholder="Chọn nhiều loại sản phẩm..."
        options={typesList}
        value={multiVals}
        onChange={setMultiVals}
      />
    </div>
  );
};

export default BrandAndType;
