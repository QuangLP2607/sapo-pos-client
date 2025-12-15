import logo1 from "@assets/logo/logo-icon.svg";
import logo2 from "@assets/logo/logo-text.svg";
import type { MenuGroup } from "@components/layout/Sidebar";
import Sidebar from "@components/layout/Sidebar";

const adminMenu: MenuGroup[] = [
  {
    title: "Tổng quan",
    items: [{ to: "/admin/home", icon: "tabler:home", label: "Trang chủ" }],
  },
  {
    title: "Người dùng",
    items: [
      { to: "/admin/customers", icon: "tabler:users", label: "Khách hàng" },
      { to: "/admin/staffs", icon: "tabler:user", label: "Nhân viên" },
    ],
  },
  {
    title: "Hàng hóa",
    items: [
      {
        to: "/admin/warehouse",
        icon: "tabler:building-warehouse",
        label: "Kho hàng",
      },

      { to: "/admin/products", icon: "tabler:box", label: "Sản phẩm" },
    ],
  },
  {
    title: "Báo cáo",
    items: [
      {
        to: "/admin/reports/sales",
        icon: "tabler:chart-bar",
        label: "Doanh thu",
      },
      {
        to: "/admin/reports/customers",
        icon: "tabler:user-check",
        label: "Khách hàng",
      },
      {
        to: "/admin/reports/orders",
        icon: "tabler:receipt",
        label: "Đơn hàng",
      },
    ],
  },
  {
    title: "Cài đặt",
    items: [
      { to: "/admin/settings", icon: "tabler:settings", label: "Cấu hình" },
    ],
  },
];

export default function AdminSidebar() {
  return (
    <Sidebar menuGroups={adminMenu} logo={{ small: logo1, large: logo2 }} />
  );
}
