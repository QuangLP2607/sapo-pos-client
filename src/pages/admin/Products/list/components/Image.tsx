import { useState } from "react";
import fallBackImageSvg from "../assets/image-fallback.svg";
import styles from "./styles/image.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface ImageProps {
  src?: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
}

const Image = ({
  src,
  alt = "Image",
  width = "38px",
  height = "38px",
  className = "",
}: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const containerStyle = {
    width,
    height,
  };

  if (hasError) {
    return (
      <div className={cx("image-fallback", className)} style={containerStyle}>
        <img height={height} width={width} src={fallBackImageSvg} />
      </div>
    );
  }

  return (
    <div className={cx("image-container", className)} style={containerStyle}>
      {isLoading && (
        <div className={cx("image-skeleton")}>
          <div className={cx("skeleton-shimmer")}></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={
          isLoading
            ? cx("image-element", "hidden")
            : cx("image-element", "visible")
        }
        style={{ width: width, height: height, objectFit: "cover" }}
      />
    </div>
  );
};

export default Image;
