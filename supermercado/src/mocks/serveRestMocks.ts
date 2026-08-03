import type { Produto } from '../schemas/produto';

const nomesBase = [
  { nome: 'Arroz Integral 1kg', preco: 8.50, desc: 'Arroz tipo 1 rico em fibras' },
  { nome: 'Feijão Preto 1kg', preco: 9.20, desc: 'Feijão preto de alta qualidade' },
  { nome: 'Açúcar Refinado 1kg', preco: 4.80, desc: 'Açúcar extra fino' },
  { nome: 'Café Torrado e Moído 500g', preco: 18.90, desc: 'Café gourmet 100% arábica' },
  { nome: 'Leite Integral 1L', preco: 5.40, desc: 'Leite UHT tipo A' },
  { nome: 'Azeite de Oliva Extra Virgem 500ml', preco: 38.00, desc: 'Azeite prensado a frio' },
  { nome: 'Macarrão Spaghettini 500g', preco: 6.30, desc: 'Massa com sêmola de trigo' },
  { nome: 'Óleo de Soja 900ml', preco: 6.90, desc: 'Óleo vegetal refinado' },
  { nome: 'Sal Refinado 1kg', preco: 2.50, desc: 'Sal iodado tipo 1' },
  { nome: 'Farinha de Trigo 1kg', preco: 5.60, desc: 'Farinha enriquecida com ferro' },
  { nome: 'Sabão em Pó 1kg', preco: 14.50, desc: 'Detergente em pó ação profunda' },
  { nome: 'Detergente Líquido 500ml', preco: 2.80, desc: 'Detergente neutro para louças' },
  { nome: 'Amaciante Concentrado 500ml', preco: 12.90, desc: 'Amaciante aroma de lavanda' },
  { nome: 'Papel Higiênico Folha Dupla 12un', preco: 19.90, desc: 'Papel macio e absorvente' },
  { nome: 'Creme Dental 90g', preco: 4.50, desc: 'Proteção anticárie 12h' },
  { nome: 'Shampoo Nutritivo 400ml', preco: 16.80, desc: 'Para todos os tipos de cabelo' },
  { nome: 'Sabonete em Barra 90g', preco: 2.90, desc: 'Com manteiga de karité' },
  { nome: 'Refrigerante Cola 2L', preco: 9.50, desc: 'Bebida gaseificada refrescante' },
  { nome: 'Suco de Laranja Integral 1L', preco: 11.00, desc: 'Suco 100% natural sem açúcar' },
  { nome: 'Água Mineral sem Gás 1.5L', preco: 3.20, desc: 'Água pura de fonte natural' },
  { nome: 'Cerveja Puro Malte 350ml', preco: 4.90, desc: 'Cerveja pilsen puro malte' },
  { nome: 'Queijo Mussarela 200g', preco: 12.50, desc: 'Queijo fatiado macio' },
  { nome: 'Presunto Cozido 200g', preco: 9.80, desc: 'Presunto fatiado sem capa de gordura' },
  { nome: 'Manteiga com Sal 200g', preco: 11.20, desc: 'Manteiga cremosa pura' },
  { nome: 'Iogurte Natural 170g', preco: 3.80, desc: 'Rico em probióticos' },
  { nome: 'Pão de Forma Integral 450g', preco: 8.90, desc: 'Pão multigrãos com aveia' },
  { nome: 'Peito de Frango 1kg', preco: 19.90, desc: 'Filé de peito congelado individualmente' },
  { nome: 'Carne Moída de Primeira 500g', preco: 22.00, desc: 'Patinho moído resfriado' },
  { nome: 'Biscoito Recheado Chocolate 140g', preco: 3.50, desc: 'Biscoito crocante recheado' },
  { nome: 'Chocolate ao Leite 90g', preco: 6.20, desc: 'Barra de chocolate cremoso' },
  { nome: 'Mouse sem Fio Ergonomico', preco: 150.00, desc: 'Mouse óptico bluetooth 2.4GHz' },
  { nome: 'Teclado Mecânico RGB', preco: 280.00, desc: 'Teclado gamer switches azuis' },
  { nome: 'Headset Stereo USB', preco: 190.00, desc: 'Fone com microfone antirruído' },
  { nome: 'Cabo HDMI 2.0 2m', preco: 25.00, desc: 'Cabo ultra HD 4K trançado' },
  { nome: 'Carregador Rápido USB-C 20W', preco: 49.90, desc: 'Fonte de carregamento rápido' },
];

const gerarProdutos = (): Produto[] => {
  const produtos: Produto[] = [];
  let count = 1;

  for (let i = 0; i < 3; i++) {
    for (const base of nomesBase) {
      const sufixo = i === 0 ? '' : i === 1 ? ' Premium' : ' Seleção Especial';
      produtos.push({
        _id: `prod_${String(count).padStart(3, '0')}`,
        nome: `${base.nome}${sufixo}`,
        preco: Number((base.preco * (1 + i * 0.15)).toFixed(2)),
        descricao: base.desc,
        quantidade: (count * 7) % 85 + 5,
      });
      count++;
    }
  }

  return produtos;
};

export const mockProdutos: Produto[] = gerarProdutos();

import type { Carrinho } from '../schemas/carrinho';

const gerarCarrinhos = (): Carrinho[] => {
  const carrinhos: Carrinho[] = [];
  const hoje = new Date(2026, 7, 3); // 2026-08-03
  let count = 1;

  for (let i = 29; i >= 0; i--) {
    const dataAtual = new Date(hoje);
    dataAtual.setDate(hoje.getDate() - i);
    const dateStr = dataAtual.toISOString().split('T')[0]; // 'YYYY-MM-DD'

    // Generate 2-4 carts per day with varying totals
    const numVendas = 2 + (count % 3);
    for (let j = 0; j < numVendas; j++) {
      const precoTotal = Number((150 + ((count * 37) % 650) + j * 45).toFixed(2));
      carrinhos.push({
        _id: `cart_${String(count).padStart(4, '0')}`,
        idUsuario: '0uxQwBchNwyFiNet',
        data: dateStr,
        precoTotal,
        produtos: [
          {
            idProduto: mockProdutos[count % mockProdutos.length]._id,
            quantidade: (count % 4) + 1,
            precoUnitario: mockProdutos[count % mockProdutos.length].preco,
          },
          {
            idProduto: mockProdutos[(count + 5) % mockProdutos.length]._id,
            quantidade: (count % 3) + 1,
            precoUnitario: mockProdutos[(count + 5) % mockProdutos.length].preco,
          },
        ],
      });
      count++;
    }
  }

  return carrinhos;
};

export const mockCarrinhos: Carrinho[] = gerarCarrinhos();

