import { Agent, Instance } from './types';

export const MOCK_AGENTS: Agent[] = [
  // Titulares (Coluna da Esquerda)
  { id: 't1', name: 'Ana', type: 'TITULAR' },
  { id: 't2', name: 'Julia', type: 'TITULAR' },
  { id: 't3', name: 'Patricia', type: 'TITULAR' },
  { id: 't4', name: 'Maria', type: 'TITULAR' },
  { id: 't5', name: 'Claudia', type: 'TITULAR' },
  { id: 't6', name: 'Sofia', type: 'TITULAR' },
  { id: 't7', name: 'Bia', type: 'TITULAR' },
  { id: 't8', name: 'Valentina latam', type: 'TITULAR' },
  
  // Reservas (Coluna da Direita - Pares correspondentes)
  { id: 'r1', name: 'Valéria', type: 'RESERVA' },
  { id: 'r2', name: 'Cecilia', type: 'RESERVA' },
  { id: 'r3', name: 'Silvia', type: 'RESERVA' },
  { id: 'r4', name: 'Flavia', type: 'RESERVA' },
  { id: 'r5', name: 'Natalia', type: 'RESERVA' },
  { id: 'r6', name: 'Fatima', type: 'RESERVA' },
  { id: 'r7', name: 'Livia', type: 'RESERVA' },
  { id: 'r8', name: 'Sonia', type: 'RESERVA' },
];

export const INITIAL_INSTANCES: Instance[] = [
  // Grupo Roxo (Monitoramento)
  {
    id: 'inst1',
    name: 'Monitoramento e Alarmes 1',
    segment: 'Monitoramento e Alarmes',
    titularAgentId: 't1', // Ana
    reservaAgentId: 'r1', // Valéria
    diretriz: 'Responder apenas dúvidas técnicas sobre sensores. Escalar para humano se mencionar cancelamento.',
    dailyShots: 150,
    limitShots: 5000,
    status: 'CONNECTED',
    periodStart: '2023-10-01',
    periodEnd: '2024-10-01',
  },
  {
    id: 'inst2',
    name: 'Monitoramento e Alarmes 2',
    segment: 'Monitoramento e Alarmes',
    titularAgentId: 't2', // Julia
    reservaAgentId: 'r2', // Cecilia
    diretriz: 'Foco em agendamento de visitas técnicas.',
    dailyShots: 120,
    limitShots: 4000,
    status: 'DISCONNECTED',
    periodStart: '2023-10-01',
    periodEnd: '2024-10-01',
  },
  
  // Grupo Verde (Assistência Técnica)
  {
    id: 'inst3',
    name: 'Assistência Técnica - Brasil',
    segment: 'Assistência Técnica',
    titularAgentId: 't3', // Patricia
    reservaAgentId: 'r3', // Silvia
    diretriz: 'Priorizar chamados de emergência.',
    dailyShots: 300,
    limitShots: 10000,
    status: 'CONNECTED',
    periodStart: '2023-01-15',
    periodEnd: '2024-01-15',
  },

  // Grupo Azul (Provedor)
  {
    id: 'inst4',
    name: 'Provedor - Brasil 1',
    segment: 'Provedor - Brasil',
    titularAgentId: 't4', // Maria
    reservaAgentId: 'r4', // Flavia
    diretriz: 'Ofertar planos de upgrade de velocidade.',
    dailyShots: 50,
    limitShots: 2000,
    status: 'DISCONNECTED',
    periodStart: '2023-06-01',
    periodEnd: '2024-06-01',
  },
  {
    id: 'inst5',
    name: 'Provedor - Brasil 2',
    segment: 'Provedor - Brasil',
    titularAgentId: 't5', // Claudia
    reservaAgentId: 'r5', // Natalia
    diretriz: 'Suporte financeiro e segunda via de boleto.',
    dailyShots: 80,
    limitShots: 3000,
    status: 'CONNECTED',
    periodStart: '2023-06-01',
    periodEnd: '2024-06-01',
  },

  // Grupo Laranja (LATAM CAPPI)
  {
    id: 'inst6',
    name: 'LATAM CAPPI - Provedor 1',
    segment: 'LATAM CAPPI - Provedor',
    titularAgentId: 't6', // Sofia
    reservaAgentId: 'r6', // Fatima
    diretriz: 'Atendimento em espanhol e português.',
    dailyShots: 200,
    limitShots: 8000,
    status: 'DISCONNECTED',
    periodStart: '2023-09-01',
    periodEnd: '2024-09-01',
  },
  {
    id: 'inst7',
    name: 'LATAM CAPPI - Provedor 2',
    segment: 'LATAM CAPPI - Provedor',
    titularAgentId: 't7', // Bia
    reservaAgentId: 'r7', // Livia
    diretriz: 'Suporte nível 2.',
    dailyShots: 100,
    limitShots: 5000,
    status: 'CONNECTED',
    periodStart: '2023-09-01',
    periodEnd: '2024-09-01',
  },
  {
    id: 'inst8',
    name: 'LATAM CAPPI - Provedor 3',
    segment: 'LATAM CAPPI - Provedor',
    titularAgentId: 't8', // Valentina latam
    reservaAgentId: 'r8', // Sonia
    diretriz: 'Triagem inicial.',
    dailyShots: 400,
    limitShots: 12000,
    status: 'CONNECTED',
    periodStart: '2023-09-01',
    periodEnd: '2024-09-01',
  },
];