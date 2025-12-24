import logo1 from "@/assets/logo/logo-icon.svg";
import logo2 from "@/assets/logo/logo-text.svg";
import Sidebar, { type MenuGroup } from "@/components/layout/Sidebar";

const adminMenu: MenuGroup[] = [
  {
    // title: "Dashboard",
    items: [{ to: "/admin/home", icon: "tabler:home", label: "Tổng quan" }],
  },
  {
    // title: "Quản lý",
    items: [
      {
        icon: "tabler:users",
        label: "Người dùng",
        items: [
          {
            to: "/admin/users/customers",
            // icon: "tabler:user",
            label: "Khách hàng",
          },
          {
            to: "/admin/users/staffs",
            // icon: "tabler:user-cog",
            label: "Nhân viên",
          },
        ],
      },

      {
        icon: "tabler:package",
        label: "Hàng hóa",
        items: [
          {
            to: "/admin/products",
            // icon: "tabler:box",
            label: "Sản phẩm",
          },
          {
            to: "/admin/warehouse",
            // icon: "tabler:building-warehouse",
            label: "Kho hàng",
          },
        ],
      },
    ],
  },

  {
    // title: "Báo cáo",
    items: [
      {
        icon: "tabler:chart-bar",
        label: "Thống kê",
        items: [
          {
            to: "/admin/reports/sales",
            icon: "tabler:chart-line",
            label: "Doanh thu",
          },
          {
            to: "/admin/reports/orders",
            icon: "tabler:receipt",
            label: "Đơn hàng",
          },
          {
            to: "/admin/reports/customers",
            icon: "tabler:user-check",
            label: "Khách hàng",
          },
        ],
      },
    ],
  },

  {
    // title: "Hệ thống",
    items: [
      {
        to: "/admin/settings",
        icon: "tabler:settings",
        label: "Cấu hình",
      },
    ],
  },
];

export default function AdminSidebar() {
  return (
    <Sidebar menuGroups={adminMenu} logo={{ small: logo1, large: logo2 }} />
  );
}
