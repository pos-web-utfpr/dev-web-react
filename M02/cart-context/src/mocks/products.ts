export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Smartphone Galaxy S24 Ultra",
    price: 6999.00,
    description: "Smartphone com 512GB de armazenamento, tela AMOLED de 6.8 polegadas e câmera de 200MP.",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&q=80",
    category: "Eletrônicos",
  },
  {
    id: 2,
    name: "Notebook Dell XPS 13",
    price: 8499.90,
    description: "Processador Intel Core i7 de 13ª geração, 16GB RAM, SSD 512GB e tela FHD+ Touch.",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&q=80",
    category: "Informática",
  },
  {
    id: 3,
    name: "Fone de Ouvido Bluetooth Sony WH-1000XM5",
    price: 2199.00,
    description: "Cancelamento de ruído ativo líder de mercado, até 30h de bateria e áudio de alta resolução.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    category: "Áudio",
  },
  {
    id: 4,
    name: "Smartwatch Apple Watch Series 9",
    price: 4299.00,
    description: "Caixa de alumínio 45mm, monitoramento avançado de saúde e tela Retina Sempre Ativa.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    category: "Wearables",
  },
  {
    id: 5,
    name: "Teclado Mecânico Keychron K2",
    price: 650.00,
    description: "Teclado mecânico sem fio layout 75%, switches Gateron Brown e retroiluminação RGB.",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80",
    category: "Periféricos",
  },
  {
    id: 6,
    name: "Monitor Gamer LG Ultragear 27\"",
    price: 1599.00,
    description: "Painel IPS, taxa de atualização de 144Hz, 1ms de tempo de resposta e suporte HDR10.",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80",
    category: "Informática",
  },
];
