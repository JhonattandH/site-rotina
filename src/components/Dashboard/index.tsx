import React from 'react';
import { Rotina, Estatisticas } from '../../types';
import { Button } from '../UI/Button';
import { FlexContainer } from '../../styles/GlobalStyles';
import { theme } from '../../styles/theme';
import {
  StatCard,
  StatValue,
  StatLabel,
  RecentContainer,
  StatsGrid,
  SectionTitle,
  RotinaRecenteCard,
  RotinaRecenteHeader,
  RotinaRecenteTitulo,
  RotinaRecenteProgresso,
  RotinaRecenteAtividades,
  EmptyState,
  ButtonContainer
} from './styles';

// Define the props for the Dashboard component

interface DashboardProps {
  estatisticas: Estatisticas;
  rotinasRecentes: Rotina[];
  onVerRotinas: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  estatisticas,
  rotinasRecentes,
  onVerRotinas
}) => {
  return (
    <div>
      <SectionTitle>Dashboard</SectionTitle>
      
      <StatsGrid>
        <StatCard>
          <StatValue>{estatisticas.totalRotinas}</StatValue>
          <StatLabel>Total de Rotinas</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatValue>{estatisticas.rotinasAtivas}</StatValue>
          <StatLabel>Rotinas Ativas</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatValue>{estatisticas.totalAtividades}</StatValue>
          <StatLabel>Total de Atividades</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatValue>{estatisticas.percentualConclusao}%</StatValue>
          <StatLabel>Taxa de Conclusão</StatLabel>
        </StatCard>
      </StatsGrid>
      
      <RecentContainer>
        <FlexContainer justify="space-between" align="center" style={{ marginBottom: theme.spacing.lg }}>
          <h3 style={{ fontSize: theme.typography.fontSize.xl, margin: 0 }}>
            📋 Rotinas Recentes
          </h3>
          <Button variant="outline" onClick={onVerRotinas}>
            Ver Todas
          </Button>
        </FlexContainer>
        
        {rotinasRecentes.length > 0 ? (
          <div>
            {rotinasRecentes.map((rotina) => {
              const atividadesConcluidas = rotina.atividades.filter(a => a.concluida).length;
              const totalAtividades = rotina.atividades.length;
              const progresso = totalAtividades > 0 ? Math.round((atividadesConcluidas / totalAtividades) * 100) : 0;

              return (
                <RotinaRecenteCard key={rotina.id} color={rotina.cor}>
                  <RotinaRecenteHeader>
                    <RotinaRecenteTitulo>{rotina.nome}</RotinaRecenteTitulo>
                    <RotinaRecenteProgresso>{progresso}%</RotinaRecenteProgresso>
                  </RotinaRecenteHeader>
                  <RotinaRecenteAtividades>
                    {atividadesConcluidas} de {totalAtividades} atividades concluídas
                  </RotinaRecenteAtividades>
                </RotinaRecenteCard>
              );
            })}
          </div>
        ) : (
          <EmptyState>
            <div>Nenhuma rotina criada ainda</div>
            <p>Crie sua primeira rotina para começar a organizar suas atividades!</p>
            <ButtonContainer>
              <Button onClick={onVerRotinas}>Criar Primeira Rotina</Button>
            </ButtonContainer>
          </EmptyState>
        )}
      </RecentContainer>
    </div>
  );
};
