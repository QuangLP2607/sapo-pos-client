# Copilot Instructions for SAPO POS Client

## Project Overview

**SAPO POS Client** is a React 19 + TypeScript + Vite POS (Point of Sale) system frontend. It's a multi-role application (Owner, Admin, Sales, Support, Warehouse) with role-based route protection and a sophisticated tab-based checkout interface.

**Key Stack**: React 19, React Router v7, TypeScript 5.9, Vite, SCSS with CSS Modules, Axios, Iconify React

---

## Critical Architecture Patterns

### 1. **Route System with Role-Based Protection** (`src/routes/`)

- Routes are centralized in `src/routes/index.tsx` as a `RouteType[]` array
- Each route defines: `path`, `component`, `layout`, `mode` ("public" | "protected"), and optional `role`
- **AuthRoute wrapper** (`src/routes/AuthRoute.tsx`) enforces mode and role protection
- Layouts wrap pages dynamically: `SalesLayout` for sales roles, `DefaultLayout` for others
- **Pattern**: When adding routes, add to the array with proper layout assignment

### 2. **Authentication Flow** (`src/contexts/AuthContext/`, `src/services/authService.tsx`)

- **Global state**: `AuthContext` provides `user`, `isSignedIn`, `isLoading`, `login()`, `logout()`
- **Token management**: Stored in `localStorage` under key `"token"`
- **Axios interceptor** (`src/services/apiClient.tsx`) auto-injects `Authorization: Bearer {token}` header
- **useAuth hook** enforces provider usage with error boundary
- **API calls**: All services use the pre-configured `apiClient` instance with base URL from `VITE_API_URL` env var

### 3. **Layout & Component Hierarchy**

- **SalesLayout** (`src/layout/SalesLayout/`) manages multi-tab checkout interface with Header, Sidebar, and active checkout view
- Tab system stores per-tab state via `tabsData` object keyed by tab ID
- **Key component**: `<Checkout>` is re-mounted on tab change via React `key` prop to reset form state
- Pages are function components with layouts composed at route level (not nested in pages)

### 4. **SCSS Architecture** (`src/styles/`)

- **CSS Modules** used for component scoping: `component.module.scss`
- Global SCSS variables/mixins auto-injected via Vite config: `@use "@styles/variables"`, `@use "@styles/mixins"`
- Semantic color system defined in `_variables.scss`: `$accent-primary`, `$accent-success`, `$accent-error`, etc.
- **classnames bind pattern**: `const cx = classnames.bind(styles)` for conditional CSS class composition

### 5. **Custom Hooks & State Management**

- **useAuth()**: Access global auth state (must be within AuthProvider)
- **useAlert()**: Local alert state management with auto-dismiss (5s timeout)
- Hooks return typed objects; avoid Context directly—use hooks as public API

### 6. **Service Layer Pattern** (`src/services/`)

- Separate service files per domain: `authService.tsx`, `userService.tsx`
- Services are object exports with method definitions, not classes
- All services use `apiClient` for HTTP requests with type safety via generics
- **API responses typed** with interfaces from `src/interfaces/`

### 7. **Type Safety** (`src/interfaces/`)

- Core types: `auth.ts`, `user.ts`, `alert.ts`, `common.ts`
- `common.ts` defines `Role` type (shared enum/union across auth and routes)
- API response/request payloads fully typed
- Always import types from interfaces, not inline definitions

---

## Path Aliases (Vite Config)

All imports use configured aliases—use them consistently:

```
@                  → src/
@components        → src/components/
@pages             → src/pages/
@services          → src/services/
@contexts          → src/contexts/
@hooks             → src/hooks/
@interfaces        → src/interfaces/
@layout            → src/layout/
@styles            → src/styles/
@utils             → src/utils/
@assets            → src/assets/
```

---

## Developer Workflows

### Build & Run

```bash
npm run dev       # Start Vite dev server (http://localhost:5173)
npm run build     # TypeScript check + Vite build (output: dist/)
npm run lint      # Run ESLint
npm run preview   # Preview production build locally
```

### Environment Setup

Create `.env` file in project root:

```
VITE_API_URL=http://localhost:8080
```

---

## Common Patterns & Code Examples

### Adding a New Protected Route

```typescript
// src/routes/index.tsx
{
  path: "/sales/new-page",
  component: NewPageComponent,
  layout: SalesLayout,
  role: "SALES",
  mode: "protected",
}
```

### Creating a Service with API Calls

```typescript
// src/services/productService.tsx
import apiClient from "./apiClient";
import type { Product } from "@interfaces/product";

const productApi = {
  getAll() {
    return apiClient.get<Product[]>("/products");
  },
  create(payload: Product) {
    return apiClient.post<Product>("/products", payload);
  },
};
export default productApi;
```

### Component with SCSS Modules & Alert

```typescript
// src/pages/sales/NewFeature/index.tsx
import { useAlert } from "@hooks/useAlert";
import Alert from "@components/Alert";
import styles from "./NewFeature.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function NewFeature() {
  const { alert, showAlert, clearAlert } = useAlert();

  const handleAction = () => {
    showAlert({ type: "success", title: "Success", content: "Done!" });
  };

  return (
    <div className={cx("container")}>
      <Alert alert={alert} clearAlert={clearAlert} />
      <button onClick={handleAction}>Action</button>
    </div>
  );
}
```

---

## Important Notes

- **Auth required**: Most routes require valid token; LoginResponse returns token + role
- **Component re-mounting**: Sales checkout uses `key` prop on `<Checkout>` for state reset between tabs
- **SCSS globals**: Avoid writing color/spacing values directly; use `_variables.scss`
- **Error boundaries**: useAuth() throws if used outside AuthProvider context
- **Vietnamese comments common** in codebase—maintain consistency where adding comments

---

## When in Doubt

1. Check `src/routes/index.tsx` for app structure
2. Reference `src/services/authService.tsx` and `apiClient.tsx` for API patterns
3. Look at `src/layout/SalesLayout/` for complex UI state management
4. Use types from `src/interfaces/` - they're authoritative for data shapes
