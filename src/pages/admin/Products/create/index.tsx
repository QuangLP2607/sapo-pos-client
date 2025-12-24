import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import styles from "./styles/add-product.module.scss";
import Loading from "@/components/Loading/Loading";
import ConfirmModal from "@/components/ConfirmModal";
import { type ProductCreateRequest } from "../api/product.request";
import productApi from "../api/api";

const cx = classNames.bind(styles);

const CreateProductPage = () => {
  const userJSON = localStorage.getItem("user") || "";
  const userId = JSON.parse(userJSON)?.id;

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isOpenConfirmModal, setOpenConfirmModal] = useState(false);
  const [isProductNameRequired, setProductNameRequired] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const [productCreateRequest, setProductCreateRequest] =
    useState<ProductCreateRequest>({ name: "", createdByUserId: userId });
  const [images, setImages] = useState<File[]>();

  const handleCancel = () => {
    setOpenConfirmModal(true);
  };

  const handleSave = async () => {
    const request =
      productCreateRequest?.brandId === 0
        ? {
            ...productCreateRequest,
            brandId: undefined,
          }
        : productCreateRequest;

    setLoading(true);
    if (!productCreateRequest?.name) {
      setProductNameRequired(false);
      setLoading(false);
      return;
    }
    try {
      const product = (await productApi.createProduct(request, images || []))
        .data;
      console.log("product::", product);
      navigate("/admin/products");
    } catch (err) {
      console.log("error:", err);
      console.log("product create request:", productCreateRequest);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsSaved(true);
  }, [productCreateRequest]);

  return (
    <div className={cx("wrapper")}>
      <Header
        isSaved={isSaved}
        title="Thêm sản phẩm"
        handleCancel={handleCancel}
        handleSave={handleSave}
      />

      <Body
        onChangeImages={setImages}
        userId={userId}
        onChange={setProductCreateRequest}
      />

      <Footer handleSave={handleSave} isSaved={isSaved} />
      <ConfirmModal
        open={isOpenConfirmModal}
        onCancel={() => {
          setOpenConfirmModal(false);
        }}
        onConfirm={() => navigate("/admin/products")}
        title={"Bạn có chắc?"}
        message={
          "Tất cả thông tin của bạn không được lưu sau khi rời khỏi trang, bạn có chắc chắn muốn rời khỏi trang?"
        }
      />
      <ConfirmModal
        open={!isProductNameRequired}
        onCancel={() => {
          setProductNameRequired(true);
        }}
        onConfirm={() => setProductNameRequired(true)}
        title={"Cảnh báo"}
        message={"Tên sản phẩm là bắt buộc"}
        cancelText={"Hủy"}
      />

      {loading && <Loading />}
    </div>
  );
};

export default CreateProductPage;
