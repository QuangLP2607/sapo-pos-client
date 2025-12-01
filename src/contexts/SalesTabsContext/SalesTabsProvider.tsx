import { useState, useCallback, type ReactNode } from "react";
import { SalesTabsContext } from "./SalesTabsContext";
import type { TabItem, SalesTabsContextType } from "@/interfaces/salesTabs";
import type { Order } from "@/interfaces/order";
import ConfirmModal from "@components/ConfirmModal";

interface SalesTabsProviderProps {
  children: ReactNode;
}

const createInitialOrder = (): Order => ({
  products: [],
  customer: undefined,
  note: "",
});

export const SalesTabsProvider = ({ children }: SalesTabsProviderProps) => {
  const [tabs, setTabs] = useState<TabItem[]>([
    {
      id: "tab_1",
      label: "Đơn 1",
      data: createInitialOrder(),
      customerSearchQuery: "",
    },
  ]);

  const [activeTab, setActiveTab] = useState("tab_1");
  const [pendingCloseTab, setPendingCloseTab] = useState<string | null>(null);

  const addTab = useCallback(() => {
    const id = "tab_" + Date.now();
    setTabs((prev) => [
      ...prev,
      {
        id,
        label: `Đơn mới ${prev.length + 1}`,
        data: createInitialOrder(),
        customerSearchQuery: "",
      },
    ]);
    setActiveTab(id);
  }, []);

  const actuallyCloseTab = useCallback(
    (id: string) => {
      setTabs((prev) => {
        const filtered = prev.filter((t) => t.id !== id);
        if (id === activeTab) {
          if (filtered.length > 0) setActiveTab(filtered[0].id);
          else addTab();
        }
        return filtered;
      });
    },
    [activeTab, addTab]
  );

  const closeTab = useCallback(
    (id: string) => {
      const tabToClose = tabs.find((t) => t.id === id);
      if (!tabToClose) return;

      const hasData =
        tabToClose.data.customer !== undefined ||
        tabToClose.data.products.length > 0;

      if (hasData) setPendingCloseTab(id);
      else actuallyCloseTab(id);
    },
    [tabs, actuallyCloseTab]
  );

  const confirmClose = useCallback(() => {
    if (pendingCloseTab) {
      actuallyCloseTab(pendingCloseTab);
      setPendingCloseTab(null);
    }
  }, [pendingCloseTab, actuallyCloseTab]);

  const cancelClose = useCallback(() => setPendingCloseTab(null), []);

  const updateTabData = useCallback(
    (partialData: Partial<Order>, searchQuery?: string) => {
      setTabs((prev) =>
        prev.map((t) =>
          t.id === activeTab
            ? {
                ...t,
                data: { ...t.data, ...partialData },
                customerSearchQuery:
                  searchQuery !== undefined
                    ? searchQuery
                    : t.customerSearchQuery,
              }
            : t
        )
      );
    },
    [activeTab]
  );

  const currentTab = tabs.find((t) => t.id === activeTab);
  const currentTabData = currentTab?.data ?? createInitialOrder();
  const currentSearchQuery = currentTab?.customerSearchQuery ?? "";

  const value: SalesTabsContextType = {
    tabs,
    activeTab,
    currentTabData,
    currentSearchQuery,
    addTab,
    closeTab,
    setActiveTab,
    updateTabData,
  };

  return (
    <SalesTabsContext.Provider value={value}>
      {children}

      <ConfirmModal
        open={!!pendingCloseTab}
        title="Xác nhận"
        message="Tab này có dữ liệu. Bạn có chắc muốn đóng không?"
        confirmText="Đồng ý"
        cancelText="Hủy"
        onConfirm={confirmClose}
        onCancel={cancelClose}
      />
    </SalesTabsContext.Provider>
  );
};
