import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import type { Role } from "@/interfaces/common";

interface AuthRouteProps {
  element: React.ReactElement;
  mode: "protected" | "public";
  role?: Role;
}

export function AuthRoute({ element, mode, role }: AuthRouteProps) {
  const { user, isSignedIn } = useAuth();

  if (mode === "protected") {
    if (!isSignedIn) return <Navigate to="/login" replace />;

    if (role && user?.role !== role) {
      const roleHomeMap: Record<string, string> = {
        OWNER: "/admin/home",
        SALES: "/sales/checkout",
        CS: "/cs/home",
        WAREHOUSE: "/warehouse/home",
      };
      const homePath = roleHomeMap[user!.role] || "/login";
      return <Navigate to={homePath} replace />;
    }

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
