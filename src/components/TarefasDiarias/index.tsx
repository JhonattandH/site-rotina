import React from 'react';
import { Atividade, Rotina } from '../../types';
import {
  ChecklistContainer,
  SectionTitle,
  TaskCard,
  TaskHeader,
  TaskTitleRow,
  TaskBadges,
  TaskTime,
  TaskTitle,
  TaskDuration,
  TaskActions,
  TaskActionButton,
  TaskCategory,
  TaskPriority,
  EmptyState,
  ProgressBar,
  ProgressFill,
  ProgressText,
  TimelineContainer,
  TaskList
} from './styles';

interface TarefasDiariasProps {
  rotinas: Rotina[];
  onToggleAtividade: (rotinaId: string, atividadeId: string) => void;
}

interface TarefaDiaria extends Atividade {
  rotinaId: string;
  rotinaNome: string;
  rotinaCor: string;
}

export const TarefasDiarias: React.FC<TarefasDiariasProps> = ({
  rotinas,
  onToggleAtividade
}) => {
  // Função para obter todas as tarefas do dia organizadas por horário
  const obterTarefasDoDia = (): TarefaDiaria[] => {
    const tarefas: TarefaDiaria[] = [];
    
    rotinas
      .filter(rotina => rotina.ativa)
      .forEach(rotina => {
        rotina.atividades.forEach(atividade => {
          tarefas.push({
            ...atividade,
            rotinaId: rotina.id,
            rotinaNome: rotina.nome,
            rotinaCor: rotina.cor
          });
        });
      });

    // Ordenar por horário de início
    return tarefas.sort((a, b) => {
      const timeA = a.horarioInicio.split(':').map(Number);
      const timeB = b.horarioInicio.split(':').map(Number);
      const minutesA = timeA[0] * 60 + timeA[1];
      const minutesB = timeB[0] * 60 + timeB[1];
      return minutesA - minutesB;
    });
  };

  // Função para calcular horário de término
  const calcularHorarioFim = (inicio: string, duracao: number): string => {
    const [horas, minutos] = inicio.split(':').map(Number);
    const totalMinutos = horas * 60 + minutos + duracao;
    const horasFim = Math.floor(totalMinutos / 60);
    const minutosFim = totalMinutos % 60;
    return `${horasFim.toString().padStart(2, '0')}:${minutosFim.toString().padStart(2, '0')}`;
  };

  // Função para formatar duração
  const formatarDuracao = (minutos: number): string => {
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    if (horas > 0) {
      return mins > 0 ? `${horas}h ${mins}min` : `${horas}h`;
    }
    return `${mins}min`;
  };

  // Função para obter emoji da categoria removida

  const tarefasDoDia = obterTarefasDoDia();
  const tarefasConcluidas = tarefasDoDia.filter(t => t.concluida).length;
  const progressoPercentual = tarefasDoDia.length > 0 ? Math.round((tarefasConcluidas / tarefasDoDia.length) * 100) : 0;

  const handleMarkComplete = (tarefa: TarefaDiaria) => {
    if (!tarefa.concluida) {
      onToggleAtividade(tarefa.rotinaId, tarefa.id);
    }
  };

  const handleMarkIncomplete = (tarefa: TarefaDiaria) => {
    if (tarefa.concluida) {
      onToggleAtividade(tarefa.rotinaId, tarefa.id);
    }
  };

  return (
    <ChecklistContainer>
      <SectionTitle>Tarefas de Hoje</SectionTitle>
      
      {tarefasDoDia.length > 0 ? (
        <>
          <ProgressBar>
            <ProgressFill progress={progressoPercentual} />
            <ProgressText>
              {tarefasConcluidas} de {tarefasDoDia.length} tarefas concluídas ({progressoPercentual}%)
            </ProgressText>
          </ProgressBar>

          <TimelineContainer>
            <TaskList>
              {tarefasDoDia.map((tarefa) => (
                <TaskCard 
                  key={`${tarefa.rotinaId}-${tarefa.id}`} 
                  concluida={tarefa.concluida}
                  rotinaCor={tarefa.rotinaCor}
                >
                  <TaskActions>
                    <TaskActionButton
                      variant="complete"
                      onClick={() => handleMarkComplete(tarefa)}
                      title="Marcar como concluída"
                    />
                    <TaskActionButton
                      variant="incomplete"
                      onClick={() => handleMarkIncomplete(tarefa)}
                      title="Marcar como não concluída"
                    />
                  </TaskActions>
                  
                  <TaskHeader>
                    <TaskTitleRow>
                      <TaskTitle concluida={tarefa.concluida}>
                        {tarefa.titulo}
                      </TaskTitle>
                      <TaskBadges>
                        <TaskCategory>
                          {tarefa.categoria}
                        </TaskCategory>
                        <TaskPriority prioridade={tarefa.prioridade}>
                          {tarefa.prioridade}
                        </TaskPriority>
                        <TaskDuration>{formatarDuracao(tarefa.duracao)}</TaskDuration>
                      </TaskBadges>
                    </TaskTitleRow>
                    <TaskTime>{tarefa.horarioInicio} - {calcularHorarioFim(tarefa.horarioInicio, tarefa.duracao)}</TaskTime>
                  </TaskHeader>
                </TaskCard>
              ))}
            </TaskList>
          </TimelineContainer>
        </>
      ) : (
        <EmptyState>
          <div style={{ fontSize: '48px', marginBottom: '16px', fontWeight: 'bold', color: '#6366f1' }}>•</div>
          <div>Nenhuma tarefa agendada para hoje</div>
          <p>Crie rotinas com atividades para organizá-las aqui!</p>
        </EmptyState>
      )}
    </ChecklistContainer>
  );
};
