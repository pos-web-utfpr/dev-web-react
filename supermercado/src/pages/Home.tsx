import React from 'react';
import { Link } from 'react-router';

export const Home: React.FC = () => {
  return (
    <div>
      <h1>Sistema de Gestão ERP - ServeRest</h1>
      <p>Bem-vindo à plataforma de gestão e e-commerce.</p>
      <nav>
        <ul>
          <li>
            <Link to="/login">Acessar Login</Link>
          </li>
          <li>
            <Link to="/app">Ir para o Painel (/app)</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
