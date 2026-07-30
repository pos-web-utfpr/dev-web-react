import React from 'react';
import { Link } from 'react-router';
import { mockProdutos } from '../mocks/serveRestMocks';

export const Produtos: React.FC = () => {
  return (
    <div>
      <h1>Lista de Produtos</h1>
      <ul>
        {mockProdutos.map((produto) => (
          <li key={produto._id}>
            <strong>{produto.nome}</strong> - R$ {produto.preco}{' '}
            <Link to={`/app/produtos/${produto._id}`}>Ver Detalhes</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
