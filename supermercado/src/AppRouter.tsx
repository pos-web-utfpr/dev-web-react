import React from 'react';
import { Route, Routes } from 'react-router';
import { AuthLayout } from './layouts/AuthLayout';
import { ProtectedRoute } from './layouts/ProtectedRoute';
import { RootLayout } from './layouts/RootLayout';
import { Dashboard } from './pages/Dashboard';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { ProdutoCadastro } from './pages/ProdutoCadastro';
import { ProdutoDetalhes } from './pages/ProdutoDetalhes';
import { ProdutoEdicao } from './pages/ProdutoEdicao';
import { Produtos } from './pages/Produtos';

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
          <Route path="produtos" element={<Produtos />} />
          <Route path="produtos/novo" element={<ProdutoCadastro />} />
          <Route path="produtos/:id" element={<ProdutoDetalhes />} />
          <Route path="produtos/:id/editar" element={<ProdutoEdicao />} />
        </Route>
      </Route>

      {/* Rota 404 - Não encontrada */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
