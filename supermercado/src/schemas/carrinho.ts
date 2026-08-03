export interface CarrinhoItem {
  idProduto: string;
  quantidade: number;
  precoUnitario: number;
}

export interface Carrinho {
  _id: string;
  produtos: CarrinhoItem[];
  precoTotal: number;
  idUsuario: string;
  data: string; // 'YYYY-MM-DD'
}
