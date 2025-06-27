// styles/theme.ts - Definições do tema da aplicação
// Centraliza cores, fontes e espaçamentos para manter consistência visual

/**
 * Objeto que define todas as cores do tema
 * Organizadas por categoria para facilitar manutenção
 */
export const theme = {
  colors: {
    // Cores primárias da aplicação
    primary: '#6366f1',           // Azul principal
    primaryLight: '#818cf8',      // Azul claro
    primaryDark: '#4338ca',       // Azul escuro
    
    // Cores secundárias
    secondary: '#f59e0b',         // Laranja
    secondaryLight: '#fbbf24',    // Laranja claro
    secondaryDark: '#d97706',     // Laranja escuro
    
    // Cores de status
    success: '#10b981',           // Verde para sucesso
    warning: '#f59e0b',           // Amarelo para avisos
    error: '#ef4444',             // Vermelho para erros
    info: '#3b82f6',              // Azul para informações
    
    // Escalas de cinza
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827'
    },
    
    // Cores de fundo
    background: '#ffffff',
    backgroundSecondary: '#f9fafb',
    backgroundDark: '#1f2937',
    
    // Cores de texto
    text: '#111827',
    textSecondary: '#6b7280',
    textLight: '#ffffff',
    
    // Cores das bordas
    border: '#e5e7eb',
    borderLight: '#f3f4f6',
    borderDark: '#d1d5db'
  },
  
  /**
   * Definições de tipografia
   * Tamanhos, pesos e famílias de fonte
   */
  typography: {
    fontFamily: {
      primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      secondary: '"Poppins", sans-serif'
    },
    fontSize: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem'      // 48px
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2
    }
  },
  
  /**
   * Sistema de espaçamento
   * Baseado em múltiplos de 4px para consistência
   */
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
    '4xl': '6rem',    // 96px
    '5xl': '8rem'     // 128px
  },
  
  /**
   * Definições de border radius
   * Para elementos com cantos arredondados
   */
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    base: '0.25rem',  // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px'    // Totalmente arredondado
  },
  
  /**
   * Sombras para dar profundidade aos elementos
   */
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
  },
  
  /**
   * Breakpoints para responsividade
   * Pontos de quebra para diferentes tamanhos de tela
   */
  breakpoints: {
    sm: '640px',      // Tablets pequenos
    md: '768px',      // Tablets
    lg: '1024px',     // Laptops
    xl: '1280px',     // Desktops
    '2xl': '1536px'   // Telas grandes
  },
  
  /**
   * Durações de transição para animações
   */
  transitions: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms'
  }
};

/**
 * Tipo TypeScript para o tema
 * Garante type safety ao usar o tema
 */
export type Theme = typeof theme;
