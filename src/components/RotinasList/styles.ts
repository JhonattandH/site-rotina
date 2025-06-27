import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Card } from '../../styles/GlobalStyles';

export const FiltrosContainer = styled(Card)`
  margin-bottom: ${theme.spacing.xl};
  background: ${theme.colors.backgroundSecondary};
`;

export const FiltrosGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.7fr 0.7fr 0.7fr auto auto auto;
  gap: ${theme.spacing.md};
  align-items: end;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: ${theme.spacing.sm};
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.text};
  background: ${theme.colors.background};
  transition: all ${theme.transitions.fast} ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px ${theme.colors.primary}20;
  }
`;

export const RotinasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

export const RotinasLista = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

export const RotinaListItem = styled(Card)<{ cor: string }>`
  border-left: 6px solid ${props => props.cor};
  display: flex;
  align-items: center;
  padding: ${theme.spacing.md};
  gap: ${theme.spacing.lg};
  transition: all ${theme.transitions.fast} ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }
`;

export const RotinaListInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
`;

export const RotinaListContent = styled.div`
  flex: 1;
`;

export const RotinaListProgress = styled.div`
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

export const RotinaListActions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  align-items: center;
`;

export const RotinaCard = styled(Card)<{ cor: string }>`
  border-left: 6px solid ${props => props.cor};
  transition: all ${theme.transitions.fast} ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.xl};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.cor}, ${props => props.cor}80);
  }
`;

export const RotinaHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};
`;

export const RotinaTitulo = styled.h3`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text};
  margin: 0 0 ${theme.spacing.xs} 0;
  line-height: 1.2;
`;

export const RotinaDescricao = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textSecondary};
  margin: 0 0 ${theme.spacing.md} 0;
  line-height: 1.4;
`;

export const RotinaActions = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
`;

export const AtividadesList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: ${theme.spacing.md};
`;

export const AtividadeItem = styled.div<{ concluida: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.sm};
  background: ${theme.colors.backgroundSecondary};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.sm};
  opacity: ${props => props.concluida ? 0.7 : 1};
  transition: all ${theme.transitions.fast} ease;

  &:hover {
    background: ${theme.colors.border};
  }
`;

export const AtividadeInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

export const AtividadeTitulo = styled.span<{ concluida: boolean }>`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text};
  text-decoration: ${props => props.concluida ? 'line-through' : 'none'};
  font-weight: ${theme.typography.fontWeight.medium};
`;

export const AtividadeHorario = styled.span`
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.primary};
  font-weight: ${theme.typography.fontWeight.medium};
  background: ${theme.colors.primary}10;
  padding: 2px 6px;
  border-radius: ${theme.borderRadius.sm};
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${theme.colors.border};
  border-radius: ${theme.borderRadius.full};
  overflow: hidden;
  margin-bottom: ${theme.spacing.sm};
`;

export const ProgressFill = styled.div<{ percentage: number; cor: string }>`
  height: 100%;
  width: ${props => props.percentage}%;
  background: ${props => props.cor};
  transition: width ${theme.transitions.normal} ease;
`;

export const ProgressText = styled.div`
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.textSecondary};
  text-align: center;
  margin-bottom: ${theme.spacing.sm};
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  color: ${theme.colors.textSecondary};
  grid-column: 1 / -1;
  
  h3 {
    font-size: ${theme.typography.fontSize.xl};
    margin-bottom: ${theme.spacing.sm};
    color: ${theme.colors.text};
  }
  
  p {
    margin-bottom: ${theme.spacing.lg};
  }
`;

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};

  h2 {
    font-size: ${theme.typography.fontSize['2xl']};
    color: ${theme.colors.text};
    margin: 0;
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    
    &::before {
      content: "📋";
      font-size: ${theme.typography.fontSize.lg};
    }
  }
`;
