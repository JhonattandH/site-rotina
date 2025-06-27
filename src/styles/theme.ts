// styles/theme.ts - Definições do tema da aplicação
// Centraliza cores, fontes e espaçamentos para manter consistência visual

/**
 * Objeto que define todas as cores do tema
 * Organizadas por categoria para facilitar manutenção
 */
export const theme = {
  colors: {
    // Cores primárias da aplicação - Tons de azul escuro
    primary: '#1e3a8a',           // Azul escuro principal
    primaryLight: '#3b82f6',      // Azul médio
    primaryDark: '#1e40af',       // Azul muito escuro
    
    // Cores secundárias - Tons de cinza
    secondary: '#6b7280',         // Cinza médio
    secondaryLight: '#9ca3af',    // Cinza claro
    secondaryDark: '#374151',     // Cinza escuro
    
    // Cores de status
    success: '#059669',           // Verde escuro para sucesso
    warning: '#d97706',           // Laranja escuro para avisos
    error: '#dc2626',             // Vermelho escuro para erros
    info: '#1d4ed8',              // Azul escuro para informações
    
    // Escalas de cinza escuro
    gray: {
      50: '#18181b',              // Cinza muito escuro
      100: '#27272a',             // Cinza escuro
      200: '#3f3f46',             // Cinza médio escuro
      300: '#52525b',             // Cinza médio
      400: '#71717a',             // Cinza claro
      500: '#a1a1aa',             // Cinza muito claro
      600: '#d4d4d8',             // Cinza clarinho
      700: '#e4e4e7',             // Cinza quase branco
      800: '#f4f4f5',             // Cinza bem claro
      900: '#fafafa'              // Branco acinzentado
    },
    
    // Cores de fundo - Tema escuro
    background: '#0f172a',        // Fundo principal muito escuro
    backgroundSecondary: '#1e293b', // Fundo secundário escuro
    backgroundDark: '#0f172a',    // Fundo escuro
    backgroundCard: '#1e293b',    // Fundo dos cards
    backgroundHover: '#334155',   // Fundo ao passar o mouse
    
    // Cores de texto - Adaptadas para tema escuro
    text: '#f8fafc',              // Texto principal claro
    textSecondary: '#cbd5e1',     // Texto secundário
    textMuted: '#94a3b8',         // Texto esmaecido
    textLight: '#ffffff',         // Texto branco
    textDark: '#1e293b',          // Texto escuro (para fundos claros)
    
    // Cores das bordas - Tons escuros
    border: '#334155',            // Borda principal escura
    borderLight: '#475569',       // Borda clara
    borderDark: '#1e293b',        // Borda escura
    borderSubtle: '#475569'       // Borda sutil
  },
  
  /**
   * Definições de tipografia
   * Tamanhos, pesos e famílias de fonte
   */
  typography: {
    fontFamily: {
      primary: '"Plus Jakarta Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      secondary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: '"Plus Jakarta Sans", sans-serif'
    },
    fontSize: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '0.9375rem', // 15px - Ligeiramente menor para elegância
      lg: '1.0625rem',   // 17px
      xl: '1.1875rem',   // 19px
      '2xl': '1.4375rem',// 23px
      '3xl': '1.75rem',  // 28px
      '4xl': '2.125rem', // 34px
      '5xl': '2.75rem'   // 44px
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
      tight: 1.2,
      normal: 1.6,      // Aumentado para melhor legibilidade
      relaxed: 1.75,
      loose: 2
    },
    letterSpacing: {
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em'
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
