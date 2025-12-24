// ProductVariants.tsx

import classNames from "classnames/bind";
import styles from "../styles/product-variants.module.scss"; // bạn có thể tạo file SCSS riêng
import { useMemo, useState } from "react";
import InputField from "./InputField";
import { type EditedOption } from "./ProductOptionEditor"; // import interface chung
import Container from "./Container";

const cx = classNames.bind(styles);

export interface Variant {
  id?: number;
  title: string;
  option1: string | null;
  option2: string | null;
  option3: string | null;
  sku: string;
  price: string;
  inventoryQuantity: number;
}

interface ProductVariantsProps {
  options: EditedOption[];
  onVariantsChange?: (variants: Variant[]) => void;
}

const ProductVariants = ({
  options,
  onVariantsChange,
}: ProductVariantsProps) => {
  const generatedVariants = useMemo(() => {
    if (options.length === 0) return [];

    const valuesArrays = options.map((opt) => opt.values.filter(Boolean));

    if (valuesArrays.some((arr) => arr.length === 0)) return [];

    const cartesian = (...arrays: string[][]): string[][] =>
      arrays.reduce(
        (acc, curr) =>
          acc.flatMap((a) => curr.map((b) => [...a, b] as string[])),
        [[]] as string[][]
      );

    const combinations = cartesian(...valuesArrays);

    return combinations.map((combo) => {
      const titleParts = combo.map((val, _) => {
        return `${val}`;
      });

      return {
        title: titleParts.join(" / "),
        option1: combo[0] || null,
        option2: combo[1] || null,
        option3: combo[2] || null,
        sku: "",
        price: "",
        inventoryQuantity: 0,
      };
    });
  }, [options]);

  const [editedVariants, setEditedVariants] = useState<Variant[]>([]);

  useMemo(() => {
    setEditedVariants(generatedVariants);
  }, [generatedVariants]);

  useMemo(() => {
    onVariantsChange?.(editedVariants);
  }, [editedVariants, onVariantsChange]);

  const handleVariantChange = (
    index: number,
    field: keyof Variant,
    value: string | number
  ) => {
    setEditedVariants((prev) => {
      const updated = [...prev];
      // @ts-ignore
      updated[index][field] = value;
      return updated;
    });
  };

  if (options.length === 0 || generatedVariants.length === 0) {
    return null;
  }

  return (
    <Container title={"Phiên bản"}>
      <div className={cx("container")}>
        <h3 className={cx("title")}>
          Biến thể sản phẩm ({generatedVariants.length})
        </h3>

        <div className={cx("table-wrapper")}>
          <table className={cx("table")}>
            <thead>
              <tr>
                <th>{"Tên"}</th>
                <th>SKU</th>
                <th>Giá</th>
                <th>Tồn kho</th>
              </tr>
            </thead>
            <tbody>
              {editedVariants.map((variant, index) => (
                <tr key={index}>
                  <td className={cx("title-cell")}>
                    <div>{variant.title}</div>
                  </td>
                  <td>
                    <InputField
                      value={variant.sku}
                      onChange={(e) =>
                        handleVariantChange(index, "sku", e.target.value)
                      }
                      placeholder="Nhập SKU"
                    />
                  </td>
                  <td>
                    <InputField
                      type="number"
                      value={variant.price}
                      onChange={(e) =>
                        handleVariantChange(index, "price", e.target.value)
                      }
                      placeholder="0"
                    />
                  </td>
                  <td>
                    <InputField
                      type="number"
                      value={variant.inventoryQuantity}
                      onChange={(e) =>
                        handleVariantChange(
                          index,
                          "inventoryQuantity",
                          Number(e.target.value) || 0
                        )
                      }
                      placeholder="0"
                      min="0"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
};

export default ProductVariants;
