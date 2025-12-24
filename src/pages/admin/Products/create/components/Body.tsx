import classNames from "classnames/bind";
import styles from "../styles/body.module.scss";
import ProductInfo, { type ProductInfoProps } from "./ProductInfo";
import ProductPrice, { type ProductPrices } from "./ProductPrice";
import BrandAndType from "./BrandAndTypes";
import ProductImage from "./ProductImage";
import ProductOptionsEditor, { type EditedOption } from "./ProductOptionEditor";
import ProductVariants, { type Variant } from "./ProductVariants";
import { useState } from "react";
import type { ProductImageResponse } from "../../api/product.responses";

export interface BodyProps {
  initialProductInfo?: ProductInfoProps;
  initialProductVariants?: Variant;
}

const cx = classNames.bind(styles);

const Body = ({}) => {
  const fakeImages: ProductImageResponse[] = [
    {
      id: 103,
      src: "https://res.cloudinary.com/dgbmaul7r/image/upload/v1766031050/dog_20251218111049_8d4a02b7.jpg",
      alt: "Samsung Galaxy S24 Front",
      position: 1,
      filename: "galaxy-s24-1.jpg",
      size: 1756383,
      width: 1200,
      height: 1200,
    },
    {
      id: 101,
      src: "https://bizweb.dktcdn.net/100/624/127/products/7688be9e-ec9e-4bc5-92a6-e88e107a7610.jpg?v=1765786434910",
      alt: "iPhone 15 Pro Front View",
      position: 1,
      filename: "iphone15-pro-1.jpg",
      size: 2048576,
      width: 1200,
      height: 1200,
    },
  ];
  const [options, setOptions] = useState<EditedOption[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [productInfos, setProductInfos] = useState<ProductInfoProps>({
    barcode: "123456",
    content: "hello, world",
    name: "iphone 17 pro max",
    sku: "siuuuuu",
    summary: "Siuuuu",
    unit: "piece",
  });
  const [productPrices, setProductPrices] = useState<ProductPrices>({
    basePrice: 0,
    comparePrice: 0,
    inventoryQuantity: 0,
    price: 0,
    taxable: false,
  });
  const [productImages, setProductImages] = useState<File[]>();

  console.log("product images::", productImages);

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
        <ProductVariants options={options} onVariantsChange={setVariants} />
      </div>
      <div className={cx("second-body-element")}>
        <ProductImage onChange={setProductImages} />
        <BrandAndType />
      </div>
    </div>
  );
};

export default Body;
