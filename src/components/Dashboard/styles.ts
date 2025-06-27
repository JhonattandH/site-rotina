import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Card } from '../../styles/GlobalStyles';

//Define o estilo do cartão de estatísticas

export const StatCard = styled(Card)`
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

export const StatValue = styled.div`
  font-size: ${theme.typography.fontSize['4xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};
  line-height: 1.2;
`;

export const StatLabel = styled.div`
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.textSecondary};
  font-weight: ${theme.typography.fontWeight.medium};
`;

export const RecentContainer = styled(Card)`
  grid-column: 1 / -1;
`;

export const StatsGrid = styled.div`
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

export const SectionTitle = styled.h2`
  font-size: ${theme.typography.fontSize['2xl']};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

export const RotinaRecenteCard = styled(Card)`
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.md};
  border-left: 4px solid ${props => props.color || theme.colors.primary};
  
  &:hover {
    transform: translateX(8px);
  }
`;

export const RotinaRecenteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.sm};
`;

export const RotinaRecenteTitulo = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.text};
  margin: 0;
`;

export const RotinaRecenteProgresso = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.primary};
  font-weight: ${theme.typography.fontWeight.medium};
`;

export const RotinaRecenteAtividades = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl} ${theme.spacing.lg};
  color: ${theme.colors.textSecondary};
  
  h3 {
    margin-bottom: ${theme.spacing.sm};
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${theme.spacing.lg};
`;
