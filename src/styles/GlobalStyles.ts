// styles/GlobalStyles.ts - Estilos globais da aplicação
// Define reset CSS e estilos base que se aplicam a toda aplicação

import styled, { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

/**
 * Estilos globais aplicados a toda aplicação
 * Inclui reset CSS e configurações base
 */
export const GlobalStyles = createGlobalStyle`
  /* Reset CSS básico para consistência entre navegadores */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Configurações do elemento html */
  html {
    font-size: 16px; /* Base para rem calculations */
    scroll-behavior: smooth; /* Scroll suave */
  }

  /* Configurações do body */
  body {
    font-family: ${theme.typography.fontFamily.primary};
    font-size: ${theme.typography.fontSize.base};
    font-weight: ${theme.typography.fontWeight.normal};
    line-height: ${theme.typography.lineHeight.normal};
    color: ${theme.colors.text};
    background-color: ${theme.colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Estilos para headings */
  h1, h2, h3, h4, h5, h6 {
    font-weight: ${theme.typography.fontWeight.semibold};
    line-height: ${theme.typography.lineHeight.tight};
    margin-bottom: ${theme.spacing.md};
  }

  h1 { font-size: ${theme.typography.fontSize['4xl']}; }
  h2 { font-size: ${theme.typography.fontSize['3xl']}; }
  h3 { font-size: ${theme.typography.fontSize['2xl']}; }
  h4 { font-size: ${theme.typography.fontSize.xl}; }
  h5 { font-size: ${theme.typography.fontSize.lg}; }
  h6 { font-size: ${theme.typography.fontSize.base}; }

  /* Estilos para parágrafos */
  p {
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.textSecondary};
  }

  /* Estilos para links */
  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: color ${theme.transitions.fast} ease;

    &:hover {
      color: ${theme.colors.primaryDark};
      text-decoration: underline;
    }
  }

  /* Estilos para listas */
  ul, ol {
    margin-bottom: ${theme.spacing.md};
    padding-left: ${theme.spacing.lg};
  }

  li {
    margin-bottom: ${theme.spacing.xs};
  }

  /* Estilos para inputs e botões */
  button, input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  /* Remove outline padrão e adiciona foco personalizado */
  button:focus,
  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${theme.colors.primary}40; /* 40 = 25% opacity */
  }

  /* Estilos para botões */
  button {
    cursor: pointer;
    border: none;
    background: none;
    transition: all ${theme.transitions.fast} ease;
  }

  /* Disable user select em elementos interativos */
  button, 
  [role="button"] {
    user-select: none;
  }

  /* Estilos para scrollbar personalizada (Webkit) */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.gray[100]};
    border-radius: ${theme.borderRadius.base};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.gray[300]};
    border-radius: ${theme.borderRadius.base};
    
    &:hover {
      background: ${theme.colors.gray[400]};
    }
  }

  /* Utilitários para acessibilidade */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Classe para texto truncado */
  .truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Classes para responsividade - ocultar em telas pequenas */
  @media (max-width: ${theme.breakpoints.md}) {
    .hidden-mobile {
      display: none !important;
    }
  }

  /* Classes para responsividade - ocultar em telas grandes */
  @media (min-width: ${theme.breakpoints.md}) {
    .hidden-desktop {
      display: none !important;
    }
  }
`;

/**
 * Container principal da aplicação
 * Centraliza o conteúdo e define largura máxima
 */
export const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${theme.colors.backgroundSecondary};
`;

/**
 * Container para o conteúdo principal
 * Com padding responsivo e largura máxima
 */
export const MainContainer = styled.main`
  max-width: 1600px;
  margin: 0 auto;
  padding: ${theme.spacing.lg} ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.md} ${theme.spacing.lg};
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.md} ${theme.spacing.md};
  }
`;

/**
 * Grid container responsivo
 * Para layout de cards e componentes
 */
export const GridContainer = styled.div<{ columns?: number }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

/**
 * Flex container com propriedades comuns
 */
export const FlexContainer = styled.div<{
  direction?: 'row' | 'column';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  gap?: string;
  wrap?: boolean;
}>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.align || 'stretch'};
  gap: ${props => props.gap || '0'};
  flex-wrap: ${props => props.wrap ? 'wrap' : 'nowrap'};
`;

/**
 * Card base para componentes
 */
export const Card = styled.div`
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.base};
  border: 1px solid ${theme.colors.border};
  transition: all ${theme.transitions.fast} ease;

  &:hover {
    box-shadow: ${theme.shadows.md};
    transform: translateY(-2px);
  }
`;
