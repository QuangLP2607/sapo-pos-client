import classNames from "classnames/bind";
import styles from "../styles/body.module.scss";
import ProductInfo, { type ProductInfoProps } from "./ProductInfo";
import ProductPrice, { type ProductPrices } from "./ProductPrice";
import BrandAndType from "./BrandAndTypes";
import ProductImage from "./ProductImage";
import ProductOptionsEditor, { type EditedOption } from "./ProductOptionEditor";
import ProductVariants, { type Variant } from "./ProductVariants";
import { useEffect, useState } from "react";
import type { ProductCreateRequest } from "../../api/product.request";
import type { ProductResponse } from "../../api/product.responses";

export interface BodyProps {
  userId: string;
  initialProductInfo?: ProductInfoProps;
  initialProductVariants?: Variant;
  onChange: (productCreateRequest: ProductCreateRequest) => void;
  onChangeImages: (files: File[]) => void;
  existedProduct?: ProductResponse;
}

const cx = classNames.bind(styles);

const Body = ({
  userId,
  onChange,
  onChangeImages,
  existedProduct,
}: BodyProps) => {
  const [options, setOptions] = useState<EditedOption[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [productInfos, setProductInfos] = useState<ProductInfoProps>({
    barcode: existedProduct?.variants[0].barcode || "",
    content: existedProduct?.content || "",
    name: existedProduct?.name || "",
    sku: existedProduct?.variants[0].sku || "",
    summary: existedProduct?.summary || "",
    unit: existedProduct?.variants[0].unit || "",
  });
  const [productPrices, setProductPrices] = useState<ProductPrices>({
    basePrice: existedProduct?.variants[0].base_price || 0,
    comparePrice: existedProduct?.variants[0].compare_at_price || 0,
    inventoryQuantity: existedProduct?.variants[0].inventory_quantity || 0,
    price: existedProduct?.variants[0].price || 0,
    taxable: existedProduct?.variants[0].taxable || false,
  });
  const [productImages, setProductImages] = useState<File[]>();
  const [brandAndTypes, setBrandAndTypes] = useState<{
    brandId: number;
    typeIds: number[];
  }>();

  useEffect(() => {
    onChange({
      createdByUserId: Number(userId),
      name: productInfos.name || "",
      brandId:
        brandAndTypes?.brandId === 0 ? undefined : brandAndTypes?.brandId,
      typeIds: brandAndTypes?.typeIds || undefined,
      content: productInfos?.content,
      options: options.map((option, index) => ({
        name: option.name,
        position: index + 1,
        values: option.values.map((value) => ({
          value,
        })),
      })),
      status: "ACTIVE",
      summary: productInfos.summary,
      variants: variants.map((variant, index) => ({
        sku: variant.sku,
        barcode: variant.barcode,
        price: Number(variant.price),
        basePrice: variant.basePrice,
        title: variant.title,
        option1: variant.option1 ?? undefined,
        option2: variant.option2 ?? undefined,
        option3: variant.option3 ?? undefined,
        taxable: variant.taxable,
        inventoryQuantity: variant.inventoryQuantity,
        unit: variant.unit,
        position: index + 1,
      })),
    });
    onChangeImages(productImages || []);
  }, [
    productInfos,
    productPrices,
    variants,
    options,
    productImages,
    brandAndTypes,
  ]);

  return (
    <div className={cx("body")}>
      <div className={cx("first-body-element")}>
        <ProductInfo
          productInfos={productInfos}
          onChangeProductInfos={setProductInfos}
        />
        <ProductPrice
          productPrices={productPrices}
          onProductPricesChange={setProductPrices}
        />
        <ProductOptionsEditor onOptionsChange={setOptions} />
        <ProductVariants
          defaultVariantValues={{
            unit: productInfos.unit,
            inventoryQuantity: productPrices.inventoryQuantity,
            sku: productInfos.sku || "",
            barcode: productInfos.barcode,
            price: String(productPrices.price),
            basePrice: productPrices.basePrice,
            taxable: productPrices.taxable,
          }}
          initialVariants={existedProduct?.variants}
          options={options}
          onVariantsChange={setVariants}
        />
      </div>
      <div className={cx("second-body-element")}>
        <ProductImage
          initialData={existedProduct?.images}
          onChange={setProductImages}
        />
        <BrandAndType onChange={setBrandAndTypes} />
      </div>
    </div>
  );
};

export default Body;
