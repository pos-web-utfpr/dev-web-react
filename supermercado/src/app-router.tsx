import React from "react";
import { Route, Routes } from "react-router";
import { AuthLayout } from "./layouts/auth-layout";
import { ProtectedRoute } from "./layouts/protected-route";
import { RootLayout } from "./layouts/root-layout";
import { Dashboard } from "./pages/dashboard";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { NotFound } from "./pages/not-found";
import { ProductCreate } from "./pages/product-create";
import { ProductDetails } from "./pages/product-details";
import { ProductEdit } from "./pages/product-edit";
import { Products } from "./pages/products";

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Rota Landing Page Pública */}
      <Route path="/" element={<Home />} />

      {/* Rota de Autenticação (Pública Minimalista) */}
      <Route path="/login" element={<AuthLayout />}>
        <Route index element={<Login />} />
      </Route>

      {/* Rota User Space ERP (Protegida por Gate) */}
      <Route path="/app" element={<ProtectedRoute />}>
        <Route element={<RootLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="produtos" element={<Products />} />
          <Route path="produtos/novo" element={<ProductCreate />} />
          <Route path="produtos/:id" element={<ProductDetails />} />
          <Route path="produtos/:id/editar" element={<ProductEdit />} />
        </Route>
      </Route>

      {/* Rota 404 - Não encontrada */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
