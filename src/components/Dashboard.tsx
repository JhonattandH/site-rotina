// components/Dashboard.tsx - Painel principal com estatísticas
// Mostra resumo das rotinas e estatísticas gerais

import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { Card, FlexContainer } from '../styles/GlobalStyles';
import { Button } from './UI/Button';
import { Rotina, Estatisticas } from '../types';

/**
 * Props do componente Dashboard
 */
interface DashboardProps {
  estatisticas: Estatisticas;
  rotinasRecentes: Rotina[];
  onVerRotinas: () => void;
}

/**
 * Card de estatística individual
 */
const StatCard = styled(Card)`
  text-align: center;
  background: linear-gradient(135deg, ${theme.colors.background} 0%, ${theme.colors.backgroundSecondary} 100%);
  min-height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${theme.spacing.xl};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.lg};
  }
`;

/**
 * Valor da estatística (número grande)
 */
const StatValue = styled.div`
  font-size: ${theme.typography.fontSize['4xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};
  line-height: 1.2;
`;

/**
 * Label da estatística
 */
const StatLabel = styled.div`
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.textSecondary};
  font-weight: ${theme.typography.fontWeight.medium};
`;

/**
 * Container para as rotinas recentes
 */
const RecentContainer = styled(Card)`
  grid-column: 1 / -1; /* Ocupa toda a largura do grid */
`;

/**
 * Container específico para cards de estatísticas
 * Força layout em linha única para desktops
 */
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

/**
 * Título da seção
 */
const SectionTitle = styled.h2`
  font-size: ${theme.typography.fontSize['2xl']};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  
  &::before {
    content: "📊";
    font-size: ${theme.typography.fontSize.lg};
  }
`;

/**
 * Lista de rotinas recentes
 */
const RotinasList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

/**
 * Item de rotina individual
 */
const RotinaItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.md};
  background: ${theme.colors.backgroundSecondary};
  border-radius: ${theme.borderRadius.md};
  border-left: 4px solid ${theme.colors.primary};
`;

/**
 * Informações da rotina
 */
const RotinaInfo = styled.div`
  flex: 1;
`;

/**
 * Nome da rotina
 */
const RotinaNome = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.xs};
`;

/**
 * Meta dados da rotina
 */
const RotinaMetadata = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textSecondary};
  display: flex;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
`;

/**
 * Badge de status
 */
const StatusBadge = styled.span<{ ativa: boolean }>`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.medium};
  background-color: ${props => props.ativa ? theme.colors.success : theme.colors.gray[300]};
  color: ${props => props.ativa ? theme.colors.textLight : theme.colors.textSecondary};
`;

/**
 * Mensagem quando não há rotinas
 */
const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  color: ${theme.colors.textSecondary};
  
  h3 {
    font-size: ${theme.typography.fontSize.xl};
    margin-bottom: ${theme.spacing.sm};
    color: ${theme.colors.text};
  }
  
  p {
    margin-bottom: ${theme.spacing.lg};
  }
`;

/**
 * Componente Dashboard
 * Painel principal que mostra estatísticas e rotinas recentes
 */
export const Dashboard: React.FC<DashboardProps> = ({
  estatisticas,
  rotinasRecentes,
  onVerRotinas
}) => {
  return (
    <div>
      <SectionTitle>Dashboard</SectionTitle>
      
      {/* Grid de estatísticas */}
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
      
      {/* Rotinas recentes */}
      <RecentContainer>
        <FlexContainer justify="space-between" align="center" style={{ marginBottom: theme.spacing.lg }}>
          <h3 style={{ fontSize: theme.typography.fontSize.xl, margin: 0 }}>
            Rotinas Recentes
          </h3>
          <Button variant="outline" onClick={onVerRotinas}>
            Ver Todas
          </Button>
        </FlexContainer>
        
        {rotinasRecentes.length > 0 ? (
          <RotinasList>
            {rotinasRecentes.map((rotina) => (
              <RotinaItem key={rotina.id}>
                <RotinaInfo>
                  <RotinaNome>{rotina.nome}</RotinaNome>
                  <RotinaMetadata>
                    <span>{rotina.atividades.length} atividades</span>
                    <span>
                      {rotina.atividades.filter(a => a.concluida).length} concluídas
                    </span>
                    <StatusBadge ativa={rotina.ativa}>
                      {rotina.ativa ? 'Ativa' : 'Inativa'}
                    </StatusBadge>
                  </RotinaMetadata>
                </RotinaInfo>
              </RotinaItem>
            ))}
          </RotinasList>
        ) : (
          <EmptyState>
            <h3>Nenhuma rotina criada ainda</h3>
            <p>Crie sua primeira rotina para começar a organizar suas atividades!</p>
            <Button onClick={onVerRotinas}>Criar Primeira Rotina</Button>
          </EmptyState>
        )}
      </RecentContainer>
    </div>
  );
};
