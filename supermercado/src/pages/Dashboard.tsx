import React from 'react';
import { Link } from 'react-router';

export const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>Painel Administrativo</h1>
      <p>Bem-vindo ao sistema de gestão do usuário autenticado.</p>
      <h2>Resumo e Atalhos Rápidos</h2>
      <ul>
        <li>
          <Link to="/app/produtos">Gerenciar Produtos</Link>
        </li>
      </ul>
    </div>
  );
};
