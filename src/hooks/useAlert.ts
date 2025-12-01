import { useState, useCallback } from "react";
import type { AlertData } from "@interfaces/alert";

export function useAlert() {
  const [alert, setAlert] = useState<AlertData | null>(null);

  const showAlert = useCallback((data: AlertData) => {
    setAlert(data);
  }, []);

  const clearAlert = useCallback(() => {
    setAlert(null);
  }, []);

  return { alert, showAlert, clearAlert };
}
