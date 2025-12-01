import type { Order } from "./order";

export interface TabItem {
  id: string;
  label: string;
  data: Order;
  customerSearchQuery: string;
}

export interface SalesTabsContextType {
  tabs: TabItem[];
  activeTab: string;
  currentTabData: Order;
  currentSearchQuery: string;
  addTab: () => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  updateTabData: (partialData: Partial<Order>, searchQuery?: string) => void;
}
