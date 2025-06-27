import React from 'react';
import { Estatisticas } from '../../types';
import {
  StatCard,
  StatValue,
  StatLabel,
  StatsGrid,
  SectionTitle
} from './styles';

// Define the props for the Dashboard component
interface DashboardProps {
  estatisticas: Estatisticas;
}

export const Dashboard: React.FC<DashboardProps> = ({
  estatisticas
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
    </div>
  );
};
