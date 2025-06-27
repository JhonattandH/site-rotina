import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const ChecklistContainer = styled.div`
  margin-top: ${theme.spacing.xl};
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
  border: 1px solid rgba(0, 0, 0, 0.06);
`;

export const SectionTitle = styled.h2`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  font-family: 'Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
  color: ${theme.colors.text};
  margin: 0 0 ${theme.spacing.lg} 0;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  letter-spacing: -0.02em;
`;

export const ProgressBar = styled.div`
  position: relative;
  background: rgba(0, 0, 0, 0.05);
  border-radius: ${theme.borderRadius.full};
  height: 18px;
  margin-bottom: ${theme.spacing.lg};
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ progress: number }>`
  background: linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary});
  height: 100%;
  border-radius: ${theme.borderRadius.full};
  width: ${props => props.progress}%;
  transition: width ${theme.transitions.normal} ease;
`;

export const ProgressText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.text};
  z-index: 2;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
`;

export const TimelineContainer = styled.div`
  position: relative;
`;

export const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

export const TaskCard = styled.div<{ concluida: boolean; rotinaCor?: string }>`
  background: ${props => props.concluida ? 'rgba(34, 197, 94, 0.03)' : '#ffffff'};
  border: 1px solid ${props => props.concluida ? 'rgba(34, 197, 94, 0.2)' : 'rgba(0, 0, 0, 0.06)'};
  border-radius: 12px;
  padding: 16px 20px 16px 70px;
  position: relative;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  box-shadow: ${props => props.concluida 
    ? '0 1px 3px rgba(34, 197, 94, 0.1)' 
    : '0 1px 3px rgba(0, 0, 0, 0.05)'
  };
  min-height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.concluida 
      ? '0 8px 25px rgba(34, 197, 94, 0.15)' 
      : '0 8px 25px rgba(0, 0, 0, 0.08)'
    };
    border-color: ${props => props.concluida 
      ? 'rgba(34, 197, 94, 0.3)' 
      : 'rgba(30, 58, 138, 0.2)'
    };
    border-left: 4px solid ${props => props.rotinaCor || '#1e3a8a'};
    padding-left: 67px;
  }

  ${props => props.concluida && `
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(34, 197, 94, 0.05), transparent);
      border-radius: 12px;
      pointer-events: none;
    }
  `}
`;

export const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  width: 100%;
`;

export const TaskTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  flex: 1;
  min-width: 0;
`;

export const TaskBadges = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  flex-shrink: 0;
`;

export const TaskTime = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  white-space: nowrap;
  line-height: 1.2;
  background: rgba(30, 58, 138, 0.05);
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid rgba(30, 58, 138, 0.1);
  flex-shrink: 0;
  align-self: center;
`;

export const TaskDuration = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #1e3a8a;
  background: rgba(30, 58, 138, 0.08);
  padding: 6px 12px;
  border-radius: 8px;
  line-height: 1.2;
  white-space: nowrap;
  border: 1px solid rgba(30, 58, 138, 0.12);
  min-height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const TaskTitle = styled.h3<{ concluida: boolean }>`
  font-size: 18px;
  font-weight: 600;
  font-family: 'Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
  color: ${props => props.concluida ? '#6b7280' : '#111827'};
  margin: 0;
  text-decoration: ${props => props.concluida ? 'line-through' : 'none'};
  line-height: 1.4;
  letter-spacing: -0.02em;
  transition: color 0.2s ease;
  flex-shrink: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
`;

export const TaskCategory = styled.span`
  font-size: 12px;
  color: #6b7280;
  background: #f3f4f6;
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: 500;
  text-transform: capitalize;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: 1px solid #e5e7eb;
  min-height: 28px;
  line-height: 1.2;
`;

export const TaskPriority = styled.span<{ prioridade: string }>`
  font-size: 12px;
  color: ${props => {
    switch (props.prioridade) {
      case 'alta': return '#dc2626';
      case 'media': return '#d97706';
      case 'baixa': return '#059669';
      default: return '#6b7280';
    }
  }};
  background: ${props => {
    switch (props.prioridade) {
      case 'alta': return '#fef2f2';
      case 'media': return '#fffbeb';
      case 'baixa': return '#ecfdf5';
      default: return '#f3f4f6';
    }
  }};
  border: 1px solid ${props => {
    switch (props.prioridade) {
      case 'alta': return '#fecaca';
      case 'media': return '#fed7aa';
      case 'baixa': return '#bbf7d0';
      default: return '#e5e7eb';
    }
  }};
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: 500;
  text-transform: capitalize;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 28px;
  line-height: 1.2;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl} ${theme.spacing.lg};
  color: ${theme.colors.textSecondary};
  
  > div:first-child {
    font-size: ${theme.typography.fontSize.lg};
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.text};
    margin-bottom: ${theme.spacing.xs};
  }
  
  > p {
    margin: 0;
    font-size: ${theme.typography.fontSize.sm};
    line-height: 1.5;
  }
`;

export const TaskActions = styled.div`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: row;
  gap: 4px;
  width: auto;
  height: auto;
  justify-content: center;
  align-items: center;
`;

export const TaskActionButton = styled.button<{ variant: 'complete' | 'incomplete' }>`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid ${props => props.variant === 'complete' ? '#22c55e' : '#8b5cf6'};
  background: transparent;
  color: ${props => props.variant === 'complete' ? '#22c55e' : '#8b5cf6'};
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;
