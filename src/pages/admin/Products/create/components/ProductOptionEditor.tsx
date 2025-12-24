import classNames from "classnames/bind";
import Container from "./Container";
import styles from "../styles/product-option-editor.module.scss";
import { useState, useEffect } from "react";
import InputField from "./InputField";
import { Icon } from "@iconify/react";
import TagInput from "./TagInput";

import {
  type ProductOptionResponse,
  type ProductOptionValueResponse,
} from "../../api/product.responses";

const cx = classNames.bind(styles);

const defaultOptionNames = ["Kích thước", "Màu sắc", "Chất liệu"] as const;

interface ProductOptionsEditorProps {
  initialOptions?: ProductOptionResponse[];
  onOptionsChange?: (options: EditedOption[]) => void;
}

export interface EditedOption {
  id?: number;
  name: string;
  values: string[];
}

const ProductOptionsEditor = ({
  initialOptions,
  onOptionsChange,
}: ProductOptionsEditorProps) => {
  const [isHidden, setHidden] = useState(true);
  const [options, setOptions] = useState<EditedOption[]>([]);

  // creation mode
  const isCreateMode = !initialOptions || initialOptions.length === 0;

  // Load data (update case)
  useEffect(() => {
    if (!isCreateMode && initialOptions && initialOptions.length > 0) {
      const loaded: EditedOption[] = initialOptions.map(
        (opt: ProductOptionResponse) => ({
          id: opt.id,
          name: opt.name,
          values: opt.values.map((v: ProductOptionValueResponse) => v.value),
        })
      );
      setOptions(loaded);
      setHidden(false);
    }
  }, [initialOptions, isCreateMode]);

  useEffect(() => {
    const resultOptions = options.filter((option) => option.values.length > 0);
    onOptionsChange?.(resultOptions);
  }, [options, onOptionsChange]);

  const handleAddOption = () => {
    if (options.length >= 3) return;

    const newIndex = options.length;
    const defaultName = defaultOptionNames[newIndex] ?? "";

    setOptions((prev) => [...prev, { name: defaultName, values: [] }]);
  };

  const handleRemoveOption = (index: number) => {
    setOptions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNameChange = (index: number, newName: string) => {
    setOptions((prev) => {
      const updated = [...prev];
      updated[index].name = newName;
      return updated;
    });
  };

  const handleValuesChange = (index: number, newValues: string[]) => {
    setOptions((prev) => {
      const updated = [...prev];
      updated[index].values = [...newValues];
      return updated;
    });
  };

  const handleShowContent = () => {
    setHidden(false);
    if (options.length === 0) {
      const defaultName = isCreateMode ? defaultOptionNames[0] : "";
      setOptions([{ name: defaultName, values: [] }]);
    }
  };

  return (
    <Container
      title={"Thuộc tính"}
      isHidden={isHidden || options.length <= 0}
      subTitle={"Thêm thuộc tính"}
      onChange={handleShowContent}
    >
      <>
        {!isHidden && options.length > 0 ? (
          <div>
            {/* Header */}
            <div className={cx("header")}>
              <div className={cx("wrapper")}>
                <div className={cx("title", "left")}>{"Tên thuộc tính"}</div>
                <div className={cx("title", "right")}>{"Giá trị"}</div>
              </div>
            </div>

            {/* Option list */}
            {options.map((option, index) => (
              <div key={index} className={cx("child")}>
                <div className={cx("left")}>
                  <InputField
                    value={option.name}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    placeholder={
                      isCreateMode ? undefined : "Nhập tên thuộc tính"
                    }
                  />
                </div>

                <div className={cx("right")}>
                  <TagInput
                    initialTags={option.values}
                    onTagsChange={(tags) => handleValuesChange(index, tags)}
                    placeholder="Nhập ký tự và ấn enter"
                  />
                </div>

                <div className={cx("delete-btn-wrapper")}>
                  <button
                    type="button"
                    className={cx("delete-btn")}
                    onClick={() => handleRemoveOption(index)}
                  >
                    <span className={cx("trash-icon")}>
                      <Icon icon="bi:trash" />
                    </span>
                  </button>
                </div>
              </div>
            ))}

            {/* Add new option button */}
            {options.length < 3 && (
              <div className={cx("add-option-wrapper")}>
                <button
                  type="button"
                  className={cx("add-option-btn")}
                  onClick={handleAddOption}
                >
                  <span className={cx("add-icon")}>
                    <Icon icon="mdi:plus-circle-outline" />
                  </span>

                  <span className={cx("add-icon-text")}>
                    {"Thêm thuộc tính khác"}
                  </span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <span>
            {
              "Sản phẩm có nhiều thuộc tính khác nhau. Ví dụ: kích thước, màu sắc."
            }
          </span>
        )}
      </>
    </Container>
  );
};

export default ProductOptionsEditor;
