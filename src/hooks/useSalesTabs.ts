import { useContext } from "react";
import { SalesTabsContext } from "@contexts/SalesTabsContext";

export const useSalesTabs = () => {
  const ctx = useContext(SalesTabsContext);
  if (!ctx) throw new Error("useSalesTabs must be used inside provider");
  return ctx;
};
