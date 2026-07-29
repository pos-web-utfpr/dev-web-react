export interface Flight {
  id: string;
  number: string;
  origin: string;
  destination: string;
  departure: string;
  status: 'Agendado' | 'Atrasado' | 'Embarcando' | 'Partiu' | 'Cancelado';
}

export const flights: Flight[] = [
  {
    id: '1',
    number: 'AD1024',
    origin: 'GRU',
    destination: 'CWB',
    departure: '2026-07-25T08:30:00Z',
    status: 'Agendado',
  },
  {
    id: '2',
    number: 'G32048',
    origin: 'CWB',
    destination: 'CGH',
    departure: '2026-07-25T14:15:00Z',
    status: 'Agendado',
  },
  {
    id: '3',
    number: 'LA4096',
    origin: 'CGH',
    destination: 'SDU',
    departure: '2026-07-26T10:00:00Z',
    status: 'Agendado',
  },
];
