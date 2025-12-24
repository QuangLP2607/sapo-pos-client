// src/pages/admin/Products/Create.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import styles from "./styles/add-product.module.scss";
import Loading from "@/components/Loading/Loading";
import ConfirmModal from "@/components/ConfirmModal";

const cx = classNames.bind(styles);

const CreateProductPage = () => {
  const userJSON = localStorage.getItem("user") || "";
  const userId = JSON.parse(userJSON)?.id;

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOpenConfirmModal, setOpenConfirmModal] = useState(false);

  const handleCancel = () => {
    setOpenConfirmModal(true);
  };

  const handleSave = () => {};

  return (
    <div className={cx("wrapper")}>
      <Header
        title="Thêm sản phẩm"
        handleCancel={handleCancel}
        handleSave={handleSave}
      />

      <Body />

      <Footer />
      <ConfirmModal
        open={isOpenConfirmModal}
        onCancel={() => {
          setOpenConfirmModal(false);
        }}
        onConfirm={() => navigate("/admin/products")}
        title={"Bạn có chắc?"}
        message="Tất cả thông tin của bạn không được lưu sau khi rời khỏi trang, bạn có chắc chắn muốn rời khỏi trang?"
      />

      {loading && <Loading />}
      {error && <div className={cx("error")}>{error}</div>}
    </div>
  );
};

export default CreateProductPage;
