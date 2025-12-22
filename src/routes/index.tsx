import type { ReactElement, ReactNode } from "react";

// Layouts
import SalesLayout from "@/layout/SalesLayout";
import OwnerLayout from "@/layout/OwnerLayout";

// Pages
import Login from "@/pages/auth/Login";

// Admin pages
import AdminHome from "@/pages/admin/Home";
import AdminCustomersList from "@/pages/admin/Customers/List";
import AdminCustomerDetail from "@/pages/admin/Customers/Detail";
import AdminStaffs from "@/pages/admin/Staffs";
// import AdminWarehouse from "@/pages/admin/Warehouse";
// import AdminProducts from "@/pages/admin/Products";
// import AdminSettings from "@/pages/admin/SettingsPage";
// import AdminReportSales from "@/pages/admin/reports/Sales";
// import AdminReportCustomers from "@/pages/admin/reports/Customers";
// import AdminReportOrders from "@/pages/admin/reports/Orders";

// Sales pages
import SalesCheckout from "@/pages/sales/Checkout";
import SalesHistory from "@/pages/sales/History";
import SalesInventory from "@/pages/sales/Inventory";

// Support pages
// import SupportHome from "@pages/support/Home";
// import SupportTickets from "@pages/support/Tickets";

// Warehouse pages
// import WarehouseHome from "@pages/warehouse/Home";
// import WarehouseInventory from "@pages/warehouse/Inventory";

import type { Role } from "@/interfaces/common";

export interface RouteType {
  path: string;
  component: () => ReactElement;
  layout?: (props: { children: ReactNode }) => ReactElement | null;
  layoutProps?: Record<string, unknown>;
  role?: Role;
  mode?: "public" | "protected";
}

// ================= All Routes =================
const routes: RouteType[] = [
  // -------- PUBLIC ROUTES --------
  {
    path: "/login",
    component: Login,
    layout: undefined,
    mode: "public",
  },

  // -------- ADMIN --------
  {
    path: "/admin/home",
    component: AdminHome,
    layout: OwnerLayout,
    role: "OWNER",
  },
  {
    path: "/admin/users/customers",
    component: AdminCustomersList,
    layout: OwnerLayout,
    role: "OWNER",
  },
  {
    path: "/admin/users/customers/:id",
    component: AdminCustomerDetail,
    layout: OwnerLayout,
    role: "OWNER",
  },
  {
    path: "/admin/users/staffs",
    component: AdminStaffs,
    layout: OwnerLayout,
    role: "OWNER",
  },
  // {
  //   path: "/admin/warehouse",
  //   component: AdminWarehouse,
  //   layout: OwnerLayout,
  //   role: "OWNER",
  // },
  // {
  //   path: "/admin/products",
  //   component: AdminProducts,
  //   layout: OwnerLayout,
  //   role: "OWNER",
  // },
  // {
  //   path: "/admin/settings",
  //   component: AdminSettings,
  //   layout: OwnerLayout,
  //   role: "OWNER",
  // },

  // Admin Reports
  // {
  //   path: "/admin/reports/sales",
  //   component: AdminReportSales,
  //   layout: OwnerLayout,
  //   role: "OWNER",
  // },
  // {
  //   path: "/admin/reports/customers",
  //   component: AdminReportCustomers,
  //   layout: OwnerLayout,
  //   role: "OWNER",
  // },
  // {
  //   path: "/admin/reports/orders",
  //   component: AdminReportOrders,
  //   layout: OwnerLayout,
  //   role: "OWNER",
  // },

  // -------- SALES --------
  {
    path: "/sales/checkout",
    component: SalesCheckout,
    layout: SalesLayout,
    role: "SALES",
  },
  {
    path: "/sales/inventory",
    component: SalesInventory,
    layout: SalesLayout,
    role: "SALES",
  },
  {
    path: "/sales/history",
    component: SalesHistory,
    layout: SalesLayout,
    role: "SALES",
  },

  // -------- SUPPORT --------
  // { path: "/cs/home", component: SupportHome, layout: DefaultLayout, role: "CS" },
  // { path: "/cs/tickets", component: SupportTickets, layout: DefaultLayout, role: "CS" },

  // -------- WAREHOUSE --------
  // { path: "/warehouse/home", component: WarehouseHome, layout: DefaultLayout, role: "WAREHOUSE" },
  // { path: "/warehouse/inventory", component: WarehouseInventory, layout: DefaultLayout, role: "WAREHOUSE" },
];

export default routes;
