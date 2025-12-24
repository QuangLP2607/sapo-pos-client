import InputField from "./InputField";
import Editor from "./TextEditor";
import styles from "../styles/product-info.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import Container from "./Container";

const cx = classNames.bind(styles);

export interface ProductInfoProps {
  name?: string;
  sku?: string;
  barcode?: string;
  unit?: string;
  content?: string;
  summary?: string;
}

const ProductInfo = ({
  productInfos,
  onChangeProductInfos,
}: {
  productInfos: ProductInfoProps;
  onChangeProductInfos: (productInfoProps: ProductInfoProps) => void;
}) => {
  const { name, sku, barcode, unit } = productInfos;

  const [isHidden, setHidden] = useState(true);

  const handleClick = () => {
    setHidden(!isHidden);
  };

  return (
    <Container title={"Thông tin sản phẩm"}>
      <>
        <div>
          <div className={cx("input-gap")}>
            <InputField
              onChange={(e) =>
                onChangeProductInfos({ ...productInfos, name: e.target.value })
              }
              value={name}
              label={"Tên sản phẩm"}
              placeholder="Nhập tên sản phẩm (tối đa 320 ký tự)"
              required
            />
          </div>
          <div className={cx("sku-and-barcode", "input-gap")}>
            <InputField
              placeholder="Nhập mã SKU (tối đa 50 ký tự)"
              label={"Mã SKU"}
              value={sku}
              onChange={(e) =>
                onChangeProductInfos({ ...productInfos, sku: e.target.value })
              }
            />

            <InputField
              placeholder="Nhập mã vạch/ Barcode (tối đa 50 ký tự)"
              label={"Mã vạch/ Barcode"}
              value={barcode}
              onChange={(e) =>
                onChangeProductInfos({
                  ...productInfos,
                  barcode: e.target.value,
                })
              }
            />
          </div>
          <div className={cx("input-gap", "unit-and-blank")}>
            <div className={cx("unit-input")}>
              <InputField
                placeholder="Nhập đơn vị tính"
                label={"Đơn vị tính"}
                value={unit}
                onChange={(e) =>
                  onChangeProductInfos({
                    ...productInfos,
                    unit: e.target.value,
                  })
                }
              />
            </div>

            <div className={cx("blank-input")}>
              <div></div>
            </div>
          </div>
        </div>

        <div>
          <Editor
            onChange={onChangeProductInfos}
            label={"Mô tả"}
            productInfos={productInfos}
            isSummary={false}
          />
          <button className={cx("add-summary")} onClick={handleClick}>
            <span>{isHidden ? "Thêm mô tả ngắn" : "Ẩn mô tả ngắn"}</span>
          </button>
          {!isHidden && (
            <Editor
              onChange={onChangeProductInfos}
              label={"Mô tả ngắn"}
              productInfos={productInfos}
              isSummary={true}
            />
          )}
        </div>
      </>
    </Container>
  );
};

export default ProductInfo;
