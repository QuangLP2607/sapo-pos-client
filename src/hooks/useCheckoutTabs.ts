import { useContext } from "react";
import { SalesTabsContext } from "@/contexts/SalesTabsContext";
import type { SalesTabsContextType } from "@/interfaces/salesTabs";

const useCheckoutTabs = (): SalesTabsContextType => {
  const ctx = useContext(SalesTabsContext);
  if (!ctx)
    throw new Error("useCheckoutTabs must be used within SalesTabsProvider");
  return ctx;
};

export default useCheckoutTabs;
