import React from 'react';
import { Link } from 'react-router';

export const NotFound: React.FC = () => {
  return (
    <div>
      <h1>404 - Página Não Encontrada</h1>
      <p>A página que você procura não existe ou foi movida.</p>
      <Link to="/">Voltar para a Página Inicial</Link>
    </div>
  );
};
