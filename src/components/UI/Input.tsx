// components/UI/Input.tsx - Componente de input reutilizável
// Input com diferentes tipos e estados para formulários

import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

/**
 * Props do componente Input
 */
interface InputProps {
  label?: string;                      // Label do input
  placeholder?: string;                // Texto placeholder
  value?: string | number;             // Valor do input
  defaultValue?: string | number;      // Valor padrão
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'date'; // Tipos HTML
  disabled?: boolean;                  // Estado desabilitado
  required?: boolean;                  // Campo obrigatório
  error?: string;                      // Mensagem de erro
  success?: boolean;                   // Estado de sucesso
  fullWidth?: boolean;                 // Largura total
  onChange?: (value: string) => void;  // Callback de mudança
  onBlur?: () => void;                // Callback de blur
  onFocus?: () => void;               // Callback de focus
  className?: string;                  // Classes extras
}

/**
 * Container do input com label e mensagens
 */
const InputContainer = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  width: ${props => props.fullWidth ? '100%' : 'auto'};
`;

/**
 * Label estilizada
 */
const Label = styled.label`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.text};
  
  /* Indica campo obrigatório com asterisco */
  &[data-required="true"]::after {
    content: " *";
    color: ${theme.colors.error};
  }
`;

/**
 * Input estilizado com estados visuais
 */
const StyledInput = styled.input<{
  hasError?: boolean;
  hasSuccess?: boolean;
}>`
  /* Layout básico */
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  height: 38px;
  box-sizing: border-box;
  
  /* Tipografia */
  font-family: ${theme.typography.fontFamily.primary};
  font-size: ${theme.typography.fontSize.base};
  line-height: 1.2;
  
  /* Aparência */
  background-color: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text};
  
  /* Transições */
  transition: all ${theme.transitions.fast} ease;
  
  /* Placeholder */
  &::placeholder {
    color: ${theme.colors.textSecondary};
  }
  
  /* Estado de foco */
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px ${theme.colors.primary}20;
  }
  
  /* Estado desabilitado */
  &:disabled {
    background-color: ${theme.colors.gray[100]};
    color: ${theme.colors.textSecondary};
    cursor: not-allowed;
    opacity: 0.7;
  }
  
  /* Estado de erro */
  ${props => props.hasError && css`
    border-color: ${theme.colors.error};
    
    &:focus {
      border-color: ${theme.colors.error};
      box-shadow: 0 0 0 2px ${theme.colors.error}20;
    }
  `}
  
  /* Estado de sucesso */
  ${props => props.hasSuccess && css`
    border-color: ${theme.colors.success};
    
    &:focus {
      border-color: ${theme.colors.success};
      box-shadow: 0 0 0 2px ${theme.colors.success}20;
    }
  `}
  
  /* Hover quando não está desabilitado */
  &:hover:not(:disabled) {
    border-color: ${theme.colors.borderDark};
  }
`;

/**
 * Mensagem de erro
 */
const ErrorMessage = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.error};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

/**
 * Mensagem de sucesso
 */
const SuccessMessage = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.success};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

/**
 * Componente Input
 * Input reutilizável com label, validação e diferentes estados
 * 
 * @example
 * // Input básico com label
 * <Input 
 *   label="Nome"
 *   placeholder="Digite seu nome"
 *   onChange={setNome}
 * />
 * 
 * @example
 * // Input com erro
 * <Input 
 *   label="Email"
 *   type="email"
 *   error="Email inválido"
 *   required
 * />
 */
export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  defaultValue,
  type = 'text',
  disabled = false,
  required = false,
  error,
  success = false,
  fullWidth = false,
  onChange,
  onBlur,
  onFocus,
  className,
  ...props
}) => {
  /**
   * Handler para mudanças no input
   * Extrai o valor e chama o callback
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <InputContainer fullWidth={fullWidth} className={className}>
      {label && (
        <Label data-required={required}>
          {label}
        </Label>
      )}
      
      <StyledInput
        type={type}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        required={required}
        hasError={!!error}
        hasSuccess={success && !error}
        onChange={handleChange}
        onBlur={onBlur}
        onFocus={onFocus}
        {...props}
      />
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && !error && <SuccessMessage>Campo válido</SuccessMessage>}
    </InputContainer>
  );
};
