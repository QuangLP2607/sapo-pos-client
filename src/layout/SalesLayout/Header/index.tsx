import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import useCheckoutTabs from "@/hooks/useCheckoutTabs";
import Combobox from "@/components/Combobox";
import TabsBar from "./components/TabsBar";
import { Icon } from "@iconify/react";
import { useDebouncedSearch } from "@/hooks/useDebounce";
import productApi from "@/services/productService";
import type { Product } from "@/interfaces/product";

const cx = classNames.bind(styles);

interface PageConfig {
  path: string;
  title?: string;
  showSearch?: boolean;
  showTabs?: boolean;
}

const pages: PageConfig[] = [
  { path: "/sales/checkout", showSearch: true, showTabs: true },
  { path: "/sales/history", title: "Tra cứu đơn hàng" },
  { path: "/sales/inventory", title: "Tra cứu kho hàng" },
];

export default function Header() {
  const location = useLocation();
  const {
    tabs,
    activeTab,
    setActiveTab,
    addTab,
    closeTab,
    currentTabData,
    updateTabData,
  } = useCheckoutTabs();

  const [query, setQuery] = useState("");
  const pageConfig = pages.find((p) => p.path === location.pathname);

  const showSearch = pageConfig?.showSearch ?? false;
  const showTabs = pageConfig?.showTabs ?? false;
  const showTitle = !!pageConfig?.title;

  // ---------------- Fetch products ----------------
  const fetchProducts = useCallback(
    async (keyword: string): Promise<Product[]> => {
      const res = await productApi.getProducts({
        page: 0,
        size: 10,
        sortBy: "id",
        keyword,
      });
      return res.data;
    },
    []
  );

  const mapProductsToOptions = useCallback((data: Product[]): string[] => {
    return data.flatMap(
      (p) => p.variants?.map((v) => `${p.name} (${v.title}) - (${v.sku})`) || []
    );
  }, []);

  const { results: productsList, options } = useDebouncedSearch<Product>(
    query,
    fetchProducts,
    mapProductsToOptions
  );

  // ---------------- Fullscreen ----------------
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen();
  }, []);

  // ---------------- Handle product select ----------------
  const handleSelectProduct = useCallback(
    (productName: string) => {
      const product = productsList.find((p) => p.name === productName);
      if (!product) return;

      const exists = currentTabData.products.find(
        (p: Product & { qty: number }) => p.id === product.id
      );

      if (!exists) {
        updateTabData({
          products: [...currentTabData.products, { ...product, qty: 1 }],
        });
      }

      setQuery("");
    },
    [productsList, currentTabData.products, updateTabData]
  );

  return (
    <header className={cx("header")}>
      {/* Title  */}
      {showTitle && <h1 className={cx("header-title")}>{pageConfig.title}</h1>}

      {/* Product search  */}
      {showSearch && (
        <Combobox
          className={cx("header-combobox")}
          placeholder="Nhập tên sản phẩm hoặc mã SKU"
          options={options}
          value={query}
          onChange={setQuery}
          onSelect={handleSelectProduct}
        />
      )}

      {/* Tabs */}
      {showTabs && tabs && (
        <TabsBar
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          addTab={addTab}
          closeTab={closeTab}
        />
      )}

      {/* Fullscreen */}
      <button
        className={cx("fullscreen-btn")}
        onClick={toggleFullscreen}
        title={isFullscreen ? "Thoát toàn màn hình" : "Toàn màn hình"}
      >
        <Icon icon={isFullscreen ? "mdi:fullscreen-exit" : "mdi:fullscreen"} />
      </button>
    </header>
  );
}
