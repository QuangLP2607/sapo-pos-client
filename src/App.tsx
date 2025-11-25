import type { ComponentType, ReactNode } from "react";
import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { AuthProvider } from "@contexts/AuthContext";
import { AuthRoute } from "./routes/AuthRoute";
import routes from "./routes";

function AppRouter() {
  const renderLayout = (
    Page: () => React.ReactElement,
    layout: ComponentType<{ children: ReactNode }> | null | undefined,
    layoutProps: Record<string, unknown> = {}
  ) => {
    if (!layout) return <Page />;
    const Layout = layout;
    return (
      <Layout {...layoutProps}>
        <Page />
      </Layout>
    );
  };

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            <AuthRoute
              mode={route.mode || "protected"}
              element={renderLayout(
                route.component,
                route.layout,
                route.layoutProps
              )}
            />
          }
        />
      ))}

      {/* fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRouter />
      </Router>
    </AuthProvider>
  );
}
