import { Icon } from "@iconify/react";
import styles from "./styles/filters.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import Dropdown, { type Option } from "../../create/components/DropdownList";
import typeApi from "@/services/typeService";
import brandApi from "@/services/brandService";

const cx = classNames.bind(styles);

const Filters = ({
  onChangeFilterValues,
}: {
  onChangeFilterValues: ({
    brandId,
    typeIds,
    searchWord,
  }: {
    brandId?: number;
    typeIds?: number[];
    searchWord?: string;
  }) => void;
}) => {
  const [singleVal, setSingleVal] = useState(0);
  const [multiVals, setMultiVals] = useState<number[]>([]);

  const [brandsList, setBrandsList] = useState<Option[]>([]);
  const [typesList, setTypesList] = useState<Option[]>([]);
  const [searchWord, setSearchWord] = useState<string>("");

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brands = (await brandApi.getBrands({ page: 0, size: 30 })).brands;
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
        const types = (await typeApi.getTypes({ page: 0, size: 30 })).types;
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
    onChangeFilterValues({
      brandId: singleVal,
      typeIds: multiVals,
      searchWord,
    });
  }, [singleVal, multiVals, searchWord]);

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
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
          />
        </div>
        <Dropdown
          options={brandsList}
          onChange={setSingleVal}
          value={singleVal}
          placeholder={"Lọc theo nhãn hàng"}
        />
        <Dropdown
          multi
          options={typesList}
          value={multiVals}
          onChange={setMultiVals}
          placeholder={"Lọc theo loại hàng"}
        />
      </div>
    </div>
  );
};

export default Filters;
