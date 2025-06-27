// components/UI/Button.tsx - Componente de botão reutilizável
// Botão com diferentes variantes e estados, seguindo design system

import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

/**
 * Props do componente Button
 * Define todas as propriedades que o botão pode receber
 */
interface ButtonProps {
  children: React.ReactNode;           // Conteúdo do botão
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';  // Variantes visuais
  size?: 'sm' | 'md' | 'lg';          // Tamanhos disponíveis
  disabled?: boolean;                  // Estado desabilitado
  loading?: boolean;                   // Estado de carregamento
  fullWidth?: boolean;                 // Ocupa toda a largura
  onClick?: () => void;               // Função de clique
  type?: 'button' | 'submit' | 'reset'; // Tipo HTML do botão
  className?: string;                  // Classes CSS extras
}

/**
 * Estilos base do botão
 * Define propriedades comuns a todas as variantes
 */
const BaseButton = styled.button<ButtonProps>`
  /* Layout e estrutura */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  
  /* Tipografia */
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.medium};
  text-decoration: none;
  white-space: nowrap;
  
  /* Bordas e cantos */
  border: 1px solid transparent;
  border-radius: ${theme.borderRadius.md};
  
  /* Transições suaves */
  transition: all ${theme.transitions.fast} ease;
  
  /* Remove estilos padrão do botão */
  background: none;
  cursor: pointer;
  
  /* Estados de foco para acessibilidade */
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${theme.colors.primary}40;
  }
  
  /* Estado desabilitado */
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  /* Largura total quando especificado */
  ${props => props.fullWidth && css`
    width: 100%;
  `}
  
  /* Tamanhos dos botões */
  ${props => {
    switch (props.size) {
      case 'sm':
        return css`
          padding: ${theme.spacing.xs} ${theme.spacing.sm};
          font-size: ${theme.typography.fontSize.sm};
          height: 32px;
        `;
      case 'lg':
        return css`
          padding: ${theme.spacing.sm} ${theme.spacing.lg};
          font-size: ${theme.typography.fontSize.lg};
          height: 48px;
        `;
      default: // 'md'
        return css`
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: ${theme.typography.fontSize.base};
          height: 40px;
        `;
    }
  }}
  
  /* Variantes de estilo */
  ${props => {
    switch (props.variant) {
      case 'primary':
        return css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.textLight};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primaryDark};
            transform: translateY(-1px);
            box-shadow: ${theme.shadows.md};
          }
          
          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
        
      case 'secondary':
        return css`
          background-color: ${theme.colors.secondary};
          color: ${theme.colors.textLight};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.secondaryDark};
            transform: translateY(-1px);
            box-shadow: ${theme.shadows.md};
          }
          
          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
        
      case 'outline':
        return css`
          background-color: transparent;
          color: ${theme.colors.primary};
          border-color: ${theme.colors.primary};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary};
            color: ${theme.colors.textLight};
            transform: translateY(-1px);
          }
          
          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
        
      case 'ghost':
        return css`
          background-color: transparent;
          color: ${theme.colors.textSecondary};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.gray[100]};
            color: ${theme.colors.text};
          }
          
          &:active:not(:disabled) {
            background-color: ${theme.colors.gray[200]};
          }
        `;
        
      default:
        return css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.textLight};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primaryDark};
          }
        `;
    }
  }}
`;

/**
 * Componente de loading (spinner)
 * Exibido quando o botão está em estado de carregamento
 */
const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

/**
 * Componente Button
 * Botão reutilizável com múltiplas variantes e estados
 * 
 * @example
 * // Botão primário básico
 * <Button onClick={handleClick}>Clique aqui</Button>
 * 
 * @example
 * // Botão secundário grande
 * <Button variant="secondary" size="lg">Botão grande</Button>
 * 
 * @example
 * // Botão com loading
 * <Button loading={isLoading}>Salvando...</Button>
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className,
  ...props
}) => {
  return (
    <BaseButton
      variant={variant}
      size={size}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      onClick={onClick}
      type={type}
      className={className}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {loading ? 'Carregando...' : children}
    </BaseButton>
  );
};
