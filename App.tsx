import React, { useState, useMemo } from 'react';
import { Agent, Instance, ViewMode, SwapResult } from './types';
import { MOCK_AGENTS, INITIAL_INSTANCES } from './constants';
import { ConnectionPanel } from './components/ConnectionPanel';
import { SpreadsheetView } from './components/SpreadsheetView';
import { InstanceModal } from './components/InstanceModal';
import { Search, LayoutGrid, Table2, Filter } from 'lucide-react';

export default function App() {
  const [instances, setInstances] = useState<Instance[]>(INITIAL_INSTANCES);
  const [viewMode, setViewMode] = useState<ViewMode>('PANEL');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'CONNECTED' | 'DISCONNECTED'>('ALL');
  
  // Modal State
  const [selectedInstance, setSelectedInstance] = useState<Instance | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Derived Data
  const reservaAgents = MOCK_AGENTS.filter(a => a.type === 'RESERVA');
  
  const filteredInstances = useMemo(() => {
    return instances.filter(inst => {
      const matchesSearch = inst.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            inst.segment.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || inst.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [instances, searchQuery, statusFilter]);

  // Handlers
  const handleOpenInstance = (instance: Instance) => {
    setSelectedInstance(instance);
    setIsModalOpen(true);
  };

  const handleSaveInstance = (updatedInstance: Instance) => {
    setInstances(prev => prev.map(inst => inst.id === updatedInstance.id ? updatedInstance : inst));
  };

  const handleSwapReserva = (targetInstanceId: string, newReservaId: string): SwapResult => {
    // Logic: 
    // 1. Find the target instance (Instance A)
    // 2. Identify the old reserva (Agent X)
    // 3. Check if new reserva (Agent Y) is assigned to another instance (Instance B)
    // 4. If yes, assign Agent X to Instance B.
    // 5. Assign Agent Y to Instance A.
    // 6. Return success message.

    const targetInstance = instances.find(i => i.id === targetInstanceId);
    if (!targetInstance) return { success: false, message: 'Instance not found' };

    const oldReservaId = targetInstance.reservaAgentId;
    const conflictingInstance = instances.find(i => i.reservaAgentId === newReservaId && i.id !== targetInstanceId);

    const newInstances = [...instances];

    if (conflictingInstance) {
      // Perform Swap
      const conflictingIndex = newInstances.findIndex(i => i.id === conflictingInstance.id);
      newInstances[conflictingIndex] = {
        ...newInstances[conflictingIndex],
        reservaAgentId: oldReservaId // Old agent goes to the other instance
      };
      
      const targetIndex = newInstances.findIndex(i => i.id === targetInstanceId);
      newInstances[targetIndex] = {
        ...newInstances[targetIndex],
        reservaAgentId: newReservaId // New agent comes here
      };

      setInstances(newInstances);
      return { 
        success: true, 
        message: 'Troca realizada com sucesso.',
        swappedWithInstanceName: conflictingInstance.name 
      };
    } else {
      // Simple assignment (Agent is free)
      const targetIndex = newInstances.findIndex(i => i.id === targetInstanceId);
      newInstances[targetIndex] = {
        ...newInstances[targetIndex],
        reservaAgentId: newReservaId
      };
      setInstances(newInstances);
      return { success: true, message: 'Reserva atualizado.' };
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30 text-foreground font-sans selection:bg-primary/20">
      
      {/* Main Container */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Gestão de Instâncias IA</h1>
            <p className="text-muted-foreground mt-1">Gerencie reservas, diretrizes e conexões dos agentes.</p>
          </div>

          <div className="flex bg-muted p-1 rounded-lg border border-border">
            <button
              onClick={() => setViewMode('PANEL')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === 'PANEL' 
                  ? 'bg-white dark:bg-card text-primary shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <LayoutGrid size={16} />
              Painel
            </button>
            <button
              onClick={() => setViewMode('SPREADSHEET')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === 'SPREADSHEET' 
                  ? 'bg-white dark:bg-card text-primary shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Table2 size={16} />
              Planilha
            </button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Buscar por nome ou segmento..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-white dark:bg-card focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 bg-white dark:bg-card px-4 py-2.5 rounded-lg border border-border min-w-[200px]">
            <Filter size={18} className="text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-transparent border-none outline-none text-sm w-full text-foreground cursor-pointer"
            >
              <option value="ALL">Todos os status</option>
              <option value="CONNECTED">Apenas Conectadas</option>
              <option value="DISCONNECTED">Apenas Desconectadas</option>
            </select>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-background">
          {filteredInstances.length === 0 ? (
            <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed border-border">
              <p className="text-muted-foreground">Nenhuma instância encontrada para os filtros aplicados.</p>
            </div>
          ) : viewMode === 'PANEL' ? (
            <ConnectionPanel 
              instances={filteredInstances} 
              agents={MOCK_AGENTS} 
              onOpenInstance={handleOpenInstance} 
            />
          ) : (
            <SpreadsheetView 
              instances={filteredInstances} 
              allAgents={MOCK_AGENTS} 
              onOpenInstance={handleOpenInstance} 
            />
          )}
        </div>

      </main>

      {/* Modal */}
      {selectedInstance && (
        <InstanceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          instance={selectedInstance}
          allReservaAgents={reservaAgents}
          allInstances={instances}
          onSave={handleSaveInstance}
          onSwapReserva={handleSwapReserva}
          allAgents={MOCK_AGENTS}
        />
      )}

    </div>
  );
}