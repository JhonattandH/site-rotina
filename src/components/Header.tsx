// components/Header.tsx - Componente do cabeçalho da aplicação
// Exibe título, subtítulo e botões de navegação

import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { Button } from './UI/Button';

/**
 * Props do componente Header
 */
interface HeaderProps {
  titulo: string;
  onDashboard?: () => void;
  onMinhasRotinas?: () => void;
  visualizacaoAtual?: string;
}

/**
 * Container do cabeçalho
 */
const HeaderContainer = styled.header`
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%);
  color: ${theme.colors.textLight};
  padding: ${theme.spacing.lg} 0;
  box-shadow: ${theme.shadows.lg};
  position: relative;
  
  /* Efeito de brilho sutil */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  }
`;

/**
 * Container do conteúdo com largura máxima
 */
const HeaderContent = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0 ${theme.spacing.lg};
    flex-direction: column;
    gap: ${theme.spacing.lg};
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 0 ${theme.spacing.md};
    gap: ${theme.spacing.md};
  }
`;

/**
 * Container do conteúdo textual (título e subtítulo)
 */
const TextContent = styled.div`
  text-align: left;
  
  @media (max-width: ${theme.breakpoints.md}) {
    text-align: center;
  }
`;

/**
 * Container dos botões de navegação
 */
const NavigationButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-wrap: wrap;
    justify-content: center;
    gap: ${theme.spacing.sm};
  }
`;

/**
 * Botão de navegação estilizado para o header
 */
const HeaderButton = styled(Button)<{ active?: boolean }>`
  background-color: ${props => 
    props.active ? 'rgba(255,255,255,0.15)' : 'transparent'
  };
  color: ${theme.colors.textLight};
  border: 1px solid rgba(255,255,255,0.2);
  font-weight: ${theme.typography.fontWeight.medium};
  backdrop-filter: blur(10px);
  transition: all ${theme.transitions.normal} ease;
  
  /* Tamanhos aumentados dos botões */
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  font-size: ${theme.typography.fontSize.lg};
  min-height: 48px;
  min-width: 140px;
  
  &:hover:not(:disabled) {
    background-color: rgba(255,255,255,0.2);
    border-color: rgba(255,255,255,0.4);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  ${props => props.active && `
    background-color: rgba(255,255,255,0.25);
    border-color: rgba(255,255,255,0.4);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  `}
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    font-size: ${theme.typography.fontSize.base};
    min-height: 44px;
    min-width: 120px;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.fontSize.sm};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    min-height: 40px;
    min-width: 100px;
  }
`;

/**
 * Título principal
 */
const Titulo = styled.h1`
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  
  /* Ícone decorativo removido */
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize['2xl']};
    
    &::before {
      font-size: ${theme.typography.fontSize.xl};
    }
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.fontSize.xl};
    
    &::before {
      font-size: ${theme.typography.fontSize.lg};
    }
  }
`;

/**
 * Componente Header
 * Cabeçalho responsivo com título e botões de navegação elegantes
 */
export const Header: React.FC<HeaderProps> = ({ 
  titulo,
  onDashboard,
  onMinhasRotinas,
  visualizacaoAtual
}) => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <TextContent>
          <Titulo>{titulo}</Titulo>
        </TextContent>
        
        <NavigationButtons>
          <HeaderButton
            variant="ghost"
            size="sm"
            active={visualizacaoAtual === 'dashboard'}
            onClick={onDashboard}
          >
            Dashboard
          </HeaderButton>
          
          <HeaderButton
            variant="ghost"
            size="sm"
            active={visualizacaoAtual === 'rotinas'}
            onClick={onMinhasRotinas}
          >
            Minhas Rotinas
          </HeaderButton>
        </NavigationButtons>
      </HeaderContent>
    </HeaderContainer>
  );
};
