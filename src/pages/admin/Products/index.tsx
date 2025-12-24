import { useEffect, useState } from "react";
import ProductsListPage from "./list";
import productApi, { type SearchParams } from "./api/api";
import type { ProductPaginatedResponse } from "./api/product.responses";
import Loading from "@/components/Loading/Loading";

const Products = () => {
  const [productsList, setProductsList] = useState<ProductPaginatedResponse>({
    data: [],
    currentPage: 0,
    pageSize: 20,
    totalPages: 0,
    totalElements: 0,
    hasNext: false,
    hasPrevious: false,
  });
  const [searchParams, setSearchParams] = useState<SearchParams>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const products = (
          await productApi.getOrSearchProducts(searchParams ? searchParams : {})
        ).data;
        setProductsList(products);
      } catch (err) {
        console.error("Product list error:", err);
        setProductsList((prev) => ({
          ...prev,
          data: [],
          currentPage: 0,
          pageSize: 20,
          totalPages: 0,
          totalElements: 0,
          hasNext: false,
          hasPrevious: false,
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ProductsListPage
        onChangeFilterValues={setSearchParams}
        data={productsList}
      />
      {isLoading && <Loading />}
    </div>
  );
};

export default Products;
