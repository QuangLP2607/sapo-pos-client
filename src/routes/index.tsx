import type { ReactElement, ReactNode } from "react";

// Layouts
import SalesLayout from "@layout/SalesLayout";
// import { DefaultLayout } from "@layout/DefaultLayout";

// Pages
import Login from "@pages/auth/Login";

// Admin pages
// import AdminHome from "@pages/admin/Home";
// import AdminUsers from "@pages/admin/Users";
// import AdminSettings from "@pages/admin/Settings";

// Sales pages
import SalesCheckout from "@pages/sales/Checkout";
import SalesHistory from "@pages/sales/History";
import SalesInventory from "@pages/sales/Inventory";

// Support pages
// import SupportHome from "@pages/support/Home";
// import SupportTickets from "@pages/support/Tickets";

// Warehouse pages
// import WarehouseHome from "@pages/warehouse/Home";
// import WarehouseInventory from "@pages/warehouse/Inventory";

import type { Role } from "@interfaces/common";

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
  // {
  //   path: "/admin/home",
  //   component: AdminHome,
  //   layout: DefaultLayout,
  //   role: "OWNER",
  // },
  // {
  //   path: "/admin/users",
  //   component: AdminUsers,
  //   layout: DefaultLayout,
  //   role: "OWNER",
  // },
  // {
  //   path: "/admin/settings",
  //   component: AdminSettings,
  //   layout: DefaultLayout,
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
  // {
  //   path: "/cs/home",
  //   component: SupportHome,
  //   layout: DefaultLayout,
  //   role: "CS",
  // },
  // {
  //   path: "/cs/tickets",
  //   component: SupportTickets,
  //   layout: DefaultLayout,
  //   role: "CS",
  // },

  // -------- WAREHOUSE --------
  // {
  //   path: "/warehouse/home",
  //   component: WarehouseHome,
  //   layout: DefaultLayout,
  //   role: "WAREHOUSE",
  // },
  // {
  //   path: "/warehouse/inventory",
  //   component: WarehouseInventory,
  //   layout: DefaultLayout,
  //   role: "WAREHOUSE",
  // },
];

export default routes;
