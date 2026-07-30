import React from 'react';
import { Link, useParams } from 'react-router';
import { mockProdutos } from '../mocks/serveRestMocks';

export const ProdutoDetalhes: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const produto = mockProdutos.find((item) => item._id === id);

  if (!produto) {
    return (
      <div>
        <h1>Produto não encontrado</h1>
        <p>Nenhum produto cadastrado com o ID "{id}".</p>
        <Link to="/app/produtos">Voltar para a lista de produtos</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Detalhes do Produto: {produto.nome}</h1>
      <dl>
        <dt>ID:</dt>
        <dd>{produto._id}</dd>
        <dt>Nome:</dt>
        <dd>{produto.nome}</dd>
        <dt>Preço:</dt>
        <dd>R$ {produto.preco}</dd>
        <dt>Descrição:</dt>
        <dd>{produto.descricao}</dd>
        <dt>Quantidade em Estoque:</dt>
        <dd>{produto.quantidade}</dd>
      </dl>
      <p>
        <Link to="/app/produtos">Voltar para a lista de produtos</Link>
      </p>
    </div>
  );
};
