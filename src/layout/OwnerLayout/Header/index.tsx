import { useState } from "react";
import Header from "@components/layout/Header";
import ConfirmModal from "@components/ConfirmModal";
import authApi from "@/services/authService";

export default function AdminHeader() {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = async () => {
    try {
      await authApi.logout();
      window.location.href = "/login";
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <>
      <Header
        logout={() => setShowConfirm(true)}
        menuItems={
          [
            //   { icon: "mdi:account", label: "Profile", href: "/profile" },
            //   {
            //     icon: "mdi:cog",
            //     label: "Settings",
            //     onClick: () => alert("Settings"),
            //   },
            // ]}
            // notifications={[
            //   { id: 1, title: "Bạn có 1 tin nhắn mới", href: "/messages" },
            //   { id: 2, title: "Hệ thống cập nhật", description: "Phiên bản 2.1" },
          ]
        }
      />

      <ConfirmModal
        open={showConfirm}
        title="Xác nhận đăng xuất"
        message="Bạn có chắc muốn đăng xuất không?"
        confirmText="Đăng xuất"
        cancelText="Hủy"
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}
