import { createContext } from "react";
import type { SalesTabsContextType } from "@/interfaces/salesTabs";

export const SalesTabsContext = createContext<SalesTabsContextType | null>(
  null
);
