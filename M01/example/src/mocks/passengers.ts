export interface Passenger {
  id: number;
  name: string;
  flight: number | null;
  gate: string | null;
  items: string[];
}

export const passengers: Passenger[] = [
  {
    "id": 1,
    "name": "Ana Souza",
    "flight": 102,
    "gate": "3A",
    "items": ["Bolsa", "Mochila"]
  },
  {
    "id": 2,
    "name": "Carlos Lima",
    "flight": null,
    "gate": null,
    "items": ["Mochila de mão", "Laptop"]
  },
  {
    "id": 3,
    "name": "Mariana Costa",
    "flight": 305,
    "gate": "12",
    "items": ["Tablet", "Bolsa"]
  },
  {
    "id": 4,
    "name": "João Silva",
    "flight": 816,
    "gate": "8",
    "items": ["Mochila", "Laptop", "Mochila de mão"]
  },
  {
    "id": 5,
    "name": "Beatriz Santos",
    "flight": null,
    "gate": null,
    "items": ["Laptop"]
  },
  {
    "id": 6,
    "name": "Pedro Rocha",
    "flight": 412,
    "gate": "15B",
    "items": ["Mochila", "Tablet"]
  },
  {
    "id": 7,
    "name": "Fernanda Almeida",
    "flight": 501,
    "gate": "2",
    "items": ["Bolsa"]
  },
  {
    "id": 8,
    "name": "Lucas Oliveira",
    "flight": null,
    "gate": null,
    "items": []
  },
  {
    "id": 9,
    "name": "Juliana Martins",
    "flight": 704,
    "gate": "5C",
    "items": ["Mochila de mão", "Laptop", "Tablet"]
  },
  {
    "id": 10,
    "name": "Rodrigo Pereira",
    "flight": 910,
    "gate": null,
    "items": ["Bolsa", "Mochila"]
  }
];
