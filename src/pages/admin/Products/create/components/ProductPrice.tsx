import classNames from "classnames/bind";
import styles from "../styles/product-price.module.scss";
import InputField from "./InputField";
import Checkbox from "./Checkbox";
import Container from "./Container";

export interface ProductPrices {
  price: number;
  comparePrice: number;
  basePrice: number;
  inventoryQuantity: number;
  taxable: boolean;
}

const cx = classNames.bind(styles);

const ProductPrice = ({
  productPrices,
  onProductPricesChange,
}: {
  productPrices: ProductPrices;
  onProductPricesChange: (productPrices: ProductPrices) => void;
}) => {
  return (
    <Container title={"Thông tin giá"}>
      <>
        <div className={cx("sell-and-compare-price", "input-gap")}>
          <InputField
            placeholder={"Nhập giá bán sản phẩm"}
            label={"Giá bán"}
            suffix={"đ"}
            value={productPrices.price || 0}
            onChange={(e) =>
              onProductPricesChange({
                ...productPrices,
                price: parseFloat(e.target.value) || 0,
              })
            }
          />
          <InputField
            label={"Giá so sánh"}
            placeholder={"Nhập giá so sánh sản phẩm"}
            suffix={"đ"}
            value={productPrices.comparePrice || 0}
            onChange={(e) =>
              onProductPricesChange({
                ...productPrices,
                comparePrice: parseFloat(e.target.value) || 0,
              })
            }
          />
        </div>
        <div className={cx("input-gap", "base-price-and-blank")}>
          <div className={cx("base-price-input")}>
            <InputField
              label={"Giá vốn"}
              placeholder={"Nhập giá vốn sản phẩm"}
              suffix={"đ"}
              value={productPrices.basePrice || 0}
              onChange={(e) =>
                onProductPricesChange({
                  ...productPrices,
                  basePrice: parseFloat(e.target.value) || 0,
                })
              }
            />
          </div>

          <div className={cx("blank-input")}>
            <InputField
              isDecimal
              label={"Tồn kho"}
              placeholder={"Nhập số lượng tồn kho"}
              value={productPrices.inventoryQuantity || 0}
              onChange={(e) =>
                onProductPricesChange({
                  ...productPrices,
                  inventoryQuantity: parseFloat(e.target.value) || 0,
                })
              }
            />
          </div>
        </div>
        <div>
          <Checkbox
            checked={productPrices.taxable}
            onChange={(e) =>
              onProductPricesChange({
                ...productPrices,
                taxable: e.target.checked,
              })
            }
            label={"Áp dụng thuế"}
          />
        </div>
      </>
    </Container>
  );
};

export default ProductPrice;
