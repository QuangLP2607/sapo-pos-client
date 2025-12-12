import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";

interface AuthRouteProps {
  element: React.ReactElement;
  mode: "protected" | "public";
}

export function AuthRoute({ element, mode }: AuthRouteProps) {
  const { user, isSignedIn } = useAuth();

  if (mode === "protected") {
    if (!isSignedIn) return <Navigate to="/login" replace />;
    return element;
  }

  // mode === "public"
  if (isSignedIn && user) {
    const roleHomeMap: Record<string, string> = {
      OWNER: "/admin/home",
      SALES: "/sales/checkout",
      CS: "/cs/home",
      WAREHOUSE: "/warehouse/home",
    };
    const homePath = roleHomeMap[user.role];
    if (homePath) return <Navigate to={homePath} replace />;
  }

  return element;
}
