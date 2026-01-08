export interface Agent {
  id: string;
  name: string;
  type: 'TITULAR' | 'RESERVA';
}

export interface Instance {
  id: string;
  name: string;
  segment: string;
  titularAgentId: string;
  reservaAgentId: string;
  diretriz: string;
  dailyShots: number;
  limitShots: number;
  status: 'CONNECTED' | 'DISCONNECTED';
  periodStart: string; // ISO Date YYYY-MM-DD
  periodEnd: string;   // ISO Date YYYY-MM-DD
}

export type ViewMode = 'PANEL' | 'SPREADSHEET';

export interface SwapResult {
  success: boolean;
  message: string;
  swappedWithInstanceName?: string;
}