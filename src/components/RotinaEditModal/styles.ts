import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${theme.spacing.md};
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      backdrop-filter: blur(0px);
    }
    to {
      opacity: 1;
      backdrop-filter: blur(4px);
    }
  }
`;

export const ModalContainer = styled.div`
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  max-width: 700px;
  width: 100%;
  max-height: 85vh;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: slideIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (max-width: 768px) {
    max-width: 95vw;
    max-height: 90vh;
    margin: ${theme.spacing.sm};
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.border};
  background: linear-gradient(135deg, ${theme.colors.backgroundSecondary} 0%, rgba(255, 255, 255, 0.02) 100%);
  backdrop-filter: blur(10px);
`;

export const ModalTitle = styled.h2`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text};
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: ${theme.typography.fontSize.lg};
  cursor: pointer;
  color: ${theme.colors.textSecondary};
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.sm};
  transition: all ${theme.transitions.fast} ease;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    transform: scale(1.1);
  }
`;

export const ModalContent = styled.div`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  flex: 1;
  overflow-y: auto;
  
  /* Scrollbar personalizada */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.textSecondary};
  }
`;

export const FormSection = styled.div`
  margin-bottom: ${theme.spacing.lg};

  &:last-child {
    margin-bottom: 0;
  }

  h3 {
    font-size: ${theme.typography.fontSize.lg};
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.text};
    margin: 0 0 ${theme.spacing.md} 0;
    padding-bottom: ${theme.spacing.xs};
    border-bottom: 1px solid ${theme.colors.border};
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
  }
`;

export const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.sm};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  display: block;
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.textSecondary};
  margin-bottom: ${theme.spacing.xs};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 60px;
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text};
  background: ${theme.colors.background};
  resize: vertical;
  transition: all ${theme.transitions.fast} ease;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  &::placeholder {
    color: ${theme.colors.textSecondary};
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text};
  background: ${theme.colors.background};
  cursor: pointer;
  font-family: inherit;
  transition: all ${theme.transitions.fast} ease;
  height: 38px;
  line-height: 1.2;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

export const ColorPicker = styled.input`
  width: 38px;
  height: 38px;
  padding: 0;
  border: 2px solid ${theme.colors.border};
  border-radius: 50%;
  cursor: pointer;
  transition: all ${theme.transitions.fast} ease;
  box-sizing: border-box;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: none;
  flex-shrink: 0;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
    border: none;
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  &::-moz-color-swatch {
    border: none;
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    transform: scale(1.05);
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`;

export const TimeInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text};
  background: ${theme.colors.background};
  cursor: pointer;
  font-family: inherit;
  transition: all ${theme.transitions.fast} ease;
  height: 38px;
  line-height: 1.2;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

export const AtividadesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  
  /* Scrollbar personalizada apenas se necessário */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border-radius: 2px;
  }
`;

export const AtividadeCard = styled.div<{ concluida: boolean }>`
  background: ${props => props.concluida ? 'rgba(34, 197, 94, 0.05)' : theme.colors.backgroundSecondary};
  border: 1px solid ${props => props.concluida ? 'rgba(34, 197, 94, 0.2)' : theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.sm};
  transition: all ${theme.transitions.fast} ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => props.concluida ? 'linear-gradient(90deg, #22c55e, #16a34a)' : 'transparent'};
    transition: all ${theme.transitions.fast} ease;
  }

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.concluida ? 'rgba(34, 197, 94, 0.4)' : theme.colors.primary};
    transform: translateY(-1px);
  }
`;

export const AtividadeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.sm};
`;

export const AtividadeActions = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
  flex-shrink: 0;
  margin-left: auto;
`;

export const ErrorMessage = styled.div`
  color: ${theme.colors.error};
  font-size: 0.875rem;
  margin-bottom: ${theme.spacing.sm};
  text-align: center;
`;

export const DiasSemanaContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const DiaButton = styled.button<{ selected: boolean }>`
  padding: 0.5rem 0.25rem;
  border: 2px solid ${props => props.selected ? '#3b82f6' : '#e5e7eb'};
  background: ${props => props.selected ? '#3b82f6' : 'transparent'};
  color: ${props => props.selected ? 'white' : '#374151'};
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #3b82f6;
    background: ${props => props.selected ? '#1d4ed8' : '#f3f4f6'};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
  }
`;

export const ColorPalette = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const ColorSphere = styled.button<{ color: string; selected: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 3px solid ${props => props.selected ? '#374151' : 'transparent'};
  background: ${props => props.color};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  &:focus {
    outline: none;
    border-color: #374151;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
  }
`;

export const CustomColorInput = styled.input`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 3px solid transparent;
  cursor: pointer;
  padding: 0;
  background: none;
  
  &::-webkit-color-swatch-wrapper {
    padding: 0;
    border-radius: 50%;
  }
  
  &::-webkit-color-swatch {
    border: none;
    border-radius: 50%;
  }
  
  &:hover {
    transform: scale(1.1);
  }
  
  &:focus {
    outline: none;
    border-color: #374151;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.border};
  background: linear-gradient(135deg, ${theme.colors.backgroundSecondary} 0%, rgba(255, 255, 255, 0.02) 100%);
  backdrop-filter: blur(10px);
  
  .buttons {
    display: flex;
    justify-content: flex-end;
    gap: ${theme.spacing.sm};
  }
`;
