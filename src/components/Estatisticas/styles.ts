import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
  padding: ${theme.spacing.xl};
  min-height: 100vh;
  background: ${theme.colors.background};
`;

export const Header = styled.div`
  margin-bottom: ${theme.spacing['2xl']};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text};
  margin: 0;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing.sm};
  }
`;

export const StatCard = styled.div`
  background: ${theme.colors.backgroundSecondary};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  text-align: center;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

export const StatValue = styled.div`
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.xs};
`;

export const StatLabel = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textSecondary};
  font-weight: ${theme.typography.fontWeight.medium};
`;

export const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing.xl};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

export const ChartCard = styled.div`
  background: ${theme.colors.backgroundSecondary};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  transition: all 0.2s ease;
  overflow: hidden;
  min-height: 350px;
  max-height: 400px;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

export const ChartTitle = styled.h3`
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text};
  margin: 0 0 ${theme.spacing.md} 0;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0;
`;

export const ChartContainer = styled.div`
  height: 250px;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: ${theme.spacing.sm};
  box-sizing: border-box;
  flex: 1;
`;

export const BarChart = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: ${theme.spacing.sm};
  height: 150px;
  margin-bottom: ${theme.spacing.md};
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  padding: 0 ${theme.spacing.sm};
  box-sizing: border-box;
`;

interface BarProps {
  height: number;
  color: string;
}

export const Bar = styled.div<BarProps>`
  width: 30px;
  height: ${props => props.height}%;
  background: ${props => props.color};
  border-radius: ${theme.borderRadius.sm} ${theme.borderRadius.sm} 0 0;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  min-height: 4px;
  max-height: 100%;
  flex-shrink: 0;

  &:hover {
    opacity: 0.8;
    transform: scale(1.05);
  }

  &:hover::after {
    content: attr(title);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: ${theme.colors.backgroundSecondary};
    color: ${theme.colors.text};
    padding: ${theme.spacing.xs};
    border-radius: ${theme.borderRadius.md};
    font-size: ${theme.typography.fontSize.xs};
    white-space: nowrap;
    z-index: 1000;
    border: 1px solid ${theme.colors.border};
    max-width: 150px;
    word-wrap: break-word;
  }
`;

export const PieChart = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: relative;
  margin: 0 auto ${theme.spacing.lg};
`;

export const PieSlice = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

export const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${theme.spacing.sm};
  max-width: 100%;
  overflow: hidden;
  padding: 0 ${theme.spacing.xs};
  box-sizing: border-box;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  flex-shrink: 0;
  max-width: 120px;
  overflow: hidden;
`;

interface LegendColorProps {
  color: string;
}

export const LegendColor = styled.div<LegendColorProps>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.color};
`;

export const LegendLabel = styled.span`
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.textSecondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80px;
`;

export const MetricsList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.sm};
  height: 100%;
  padding: 0 ${theme.spacing.sm};
  box-sizing: border-box;
  overflow: hidden;
  flex: 1;
`;

export const MetricItem = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
  gap: ${theme.spacing.xs};
  overflow: hidden;
  align-items: center;
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.md};
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid ${theme.colors.border};
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

export const MetricName = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  grid-column: 1;
  grid-row: 1;
`;

export const MetricValue = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  grid-column: 2;
  grid-row: 1;
  text-align: right;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: ${theme.colors.border};
  border-radius: ${theme.borderRadius.full};
  overflow: hidden;
  grid-column: 1 / -1;
  grid-row: 2;
`;

interface ProgressFillProps {
  width: number;
  color?: string;
}

export const ProgressFill = styled.div<ProgressFillProps>`
  height: 100%;
  width: ${props => props.width}%;
  background: ${props => props.color || theme.colors.primary};
  border-radius: ${theme.borderRadius.full};
  transition: width 0.5s ease;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing['4xl']};
  color: ${theme.colors.textSecondary};
  
  h3 {
    font-size: ${theme.typography.fontSize['2xl']};
    font-weight: ${theme.typography.fontWeight.semibold};
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.text};
  }
  
  p {
    font-size: ${theme.typography.fontSize.base};
    line-height: 1.6;
    max-width: 500px;
    margin: 0 auto;
  }
`;

// Estilos para layout compacto de métricas
export const CompactMetricsList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.sm};
  height: 100%;
  padding: ${theme.spacing.sm};
  box-sizing: border-box;
  overflow: hidden;
  flex: 1;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const CompactMetricItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${theme.colors.border};
  transition: all 0.2s ease;
  min-height: 60px;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.07);
    transform: translateY(-1px);
  }
`;

export const CompactMetricHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xs};
`;

export const CompactMetricName = styled.div`
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.textSecondary};
  line-height: 1.2;
  flex: 1;
  margin-right: ${theme.spacing.xs};
`;

export const CompactMetricValue = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary};
  white-space: nowrap;
`;

export const CompactProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: ${theme.colors.border};
  border-radius: ${theme.borderRadius.full};
  overflow: hidden;
`;

interface CompactProgressFillProps {
  width: number;
  color?: string;
}

export const CompactProgressFill = styled.div<CompactProgressFillProps>`
  height: 100%;
  width: ${props => props.width}%;
  background: ${props => props.color || theme.colors.primary};
  border-radius: ${theme.borderRadius.full};
  transition: width 0.5s ease;
`;
