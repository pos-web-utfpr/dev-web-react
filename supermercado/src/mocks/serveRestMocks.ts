import type { Produto } from '../schemas/produto';

export const mockProdutos: Produto[] = [
  {
    _id: 'K6lehywScWCaA2da',
    nome: 'Logitech MX Master 3S',
    preco: 600,
    descricao: 'Mouse sem fio ergonômico de alta precisão',
    quantidade: 15,
  },
  {
    _id: 'vQ1l84n0K6lehywS',
    nome: 'Teclado Mecânico Keychron K2',
    preco: 450,
    descricao: 'Teclado mecânico sem fio layout 75%',
    quantidade: 8,
  },
  {
    _id: 'Beez2398K6lehywS',
    nome: 'Monitor Dell UltraSharp 27"',
    preco: 2200,
    descricao: 'Monitor IPS 4K UHD com conexão USB-C',
    quantidade: 5,
  },
];
