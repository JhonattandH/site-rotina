// components/Dashboard.tsx - Painel principal com estatísticas
// Mostra resumo das rotinas e estatísticas gerais

import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { Card } from '../styles/GlobalStyles';
import { Estatisticas } from '../types';

/**
 * Props do componente Dashboard
 */
interface DashboardProps {
  estatisticas: Estatisticas;
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
 * Componente Dashboard
 * Painel principal que mostra estatísticas das rotinas
 */
export const Dashboard: React.FC<DashboardProps> = ({
  estatisticas
}) => {
  return (
    <div>
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
    </div>
  );
};
