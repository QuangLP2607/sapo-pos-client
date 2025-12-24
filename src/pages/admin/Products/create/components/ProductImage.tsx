import Container from "./Container";
import styles from "../styles/product-image.module.scss";
import classNames from "classnames/bind";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import ErrorCard from "./ErrorCard";
import type { ProductImageResponse } from "../../api/product.responses";

const cx = classNames.bind(styles);

export interface ImageUploaderProps {
  maxSizeMB?: number;
  multiple?: boolean;
  onChange?: (files: File[]) => void;
  initialData?: ProductImageResponse[];
  isUpdated?: boolean;
}

const ProductImage = ({
  maxSizeMB = 2,
  // multiple = true,
  onChange,
  initialData = [],
  isUpdated = false,
}: ImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const maxSize = maxSizeMB * 1024 * 1024;

  useEffect(() => {
    onChange?.(uploadedFiles);
  }, [uploadedFiles]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setError("Đã có lỗi xảy ra vui lòng thử lại!");
      return;
    }

    if (!file?.type.startsWith("image/")) {
      setError("File không đúng định dạng");
      return;
    }

    if (file?.size > maxSize) {
      setError(`Ảnh không được vượt quá ${maxSizeMB}MB`);
      return;
    }

    if (isUpdated) {
      // call api
    }

    setUploadedFiles((prev) => [...prev, file]);
    setPreviewImages((prev) => [...prev, URL.createObjectURL(file)]);

    onChange?.(uploadedFiles);
    setError("");
    if (e.target) e.target.value = "";
  };

  const handleRemoveNew = (index: number) => {
    if (isUpdated) {
      // call api delete
    }

    const newUploadedFiles = uploadedFiles?.filter((_, i) => i !== index);
    const newPreviewImages = previewImages?.filter((_, i) => i !== index);
    setUploadedFiles(newUploadedFiles);
    setPreviewImages(newPreviewImages);
  };

  const handleTrigger = () => {
    inputRef.current?.click();
  };

  const srcInitialImage = initialData.map((img) => img.src);
  const allPreviews = [...srcInitialImage, ...previewImages];

  return (
    <Container title={"Ảnh sản phẩm"}>
      <div className={cx("wrapper")}>
        {error && <ErrorCard message={error} onClose={() => setError("")} />}

        {allPreviews.length === 0 ? (
          <div className={cx("container")} onClick={handleTrigger}>
            <div className={cx("content-wrapper")}>
              <div className={cx("content")}>
                <div className={cx("icon-row")}>
                  <span className={cx("icon")}>
                    <Icon icon="mdi:plus" />
                  </span>
                  <span>{"Thêm ảnh"}</span>
                </div>
                <div>
                  <span className={cx("note-row")}>
                    {`(Dung lượng tối đa ${maxSizeMB}MB)`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={cx("new-container")}>
            <div className={cx("add-image-btn")} onClick={handleTrigger}>
              <div className={cx("icon-row")}>
                <span className={cx("icon")}>
                  <Icon icon="mdi:plus" />
                </span>
              </div>
            </div>

            {allPreviews.map((src, index) => (
              <div key={index} className={cx("image-item")}>
                <img src={src} alt={`preview-${index}`} />
                <button
                  type="button"
                  className={cx("remove-btn")}
                  onClick={() => handleRemoveNew(index)}
                >
                  <Icon icon="mdi:close" />
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          ref={inputRef}
          // multiple={multiple}
          hidden
          accept="image/*"
          onChange={handleFileChange}
          type="file"
        />
      </div>
    </Container>
  );
};

export default ProductImage;
