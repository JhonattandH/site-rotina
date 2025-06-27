import styled from 'styled-components';
import { theme } from '../../styles/theme';

//Estilização moderna e minimalista do Header

export const HeaderContainer = styled.header`
  background: ${theme.colors.backgroundCard};
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${theme.colors.border};
  color: ${theme.colors.text};
  padding: ${theme.spacing.xl} 0;
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all ${theme.transitions.fast} ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1);
`;

export const HeaderContent = styled.div`
  width: 100%;
  padding: 0 ${theme.spacing.xl};
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0 ${theme.spacing.lg};
    grid-template-columns: 1fr auto;
    gap: ${theme.spacing.md};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 0 ${theme.spacing.md};
    grid-template-columns: 1fr;
    gap: ${theme.spacing.sm};
    text-align: center;
  }
`;

export const TitleSection = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    justify-content: center;
  }
`;

export const Title = styled.h1`
  font-family: ${theme.typography.fontFamily.display};
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  margin: 0;
  color: ${theme.colors.text};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  letter-spacing: -0.025em;
  line-height: ${theme.typography.lineHeight.tight};

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize['2xl']};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.fontSize.xl};
    text-align: center;
  }
`;

export const NavigationSection = styled.nav`
  display: flex;
  gap: ${theme.spacing.xs};
  align-items: center;
  justify-content: flex-end;
  flex: 0 0 auto;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 100%;
    justify-content: center;
    gap: ${theme.spacing.xs};
  }
`;

export const NavButton = styled.button<{ active?: boolean }>`
  font-family: ${theme.typography.fontFamily.primary};
  background: ${props => props.active 
    ? `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryDark})`
    : 'transparent'
  };
  border: 1px solid ${props => props.active 
    ? 'transparent' 
    : theme.colors.border
  };
  color: ${props => props.active 
    ? theme.colors.textLight
    : theme.colors.textSecondary
  };
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: 8px;
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: all ${theme.transitions.fast} ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  min-width: 110px;
  justify-content: center;
  white-space: nowrap;
  backdrop-filter: blur(10px);

  &:hover {
    background: ${props => props.active 
      ? `linear-gradient(135deg, ${theme.colors.primaryLight}, ${theme.colors.primary})`
      : theme.colors.backgroundHover
    };
    border-color: ${props => props.active 
      ? 'transparent' 
      : theme.colors.borderLight
    };
    color: ${props => props.active 
      ? theme.colors.textLight
      : theme.colors.text
    };
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    min-width: auto;
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    font-size: ${theme.typography.fontSize.xs};
  }
`;

export const DateTimeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.xs};
  
  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: row;
    gap: ${theme.spacing.sm};
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    display: none;
  }
`;

export const DateTimeDisplay = styled.div`
  font-family: ${theme.typography.fontFamily.primary};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textSecondary};
  text-align: center;
  line-height: ${theme.typography.lineHeight.tight};
  
  .date {
    font-weight: ${theme.typography.fontWeight.medium};
    margin-bottom: 2px;
  }
  
  .time {
    font-weight: ${theme.typography.fontWeight.normal};
    font-size: ${theme.typography.fontSize.xs};
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    text-align: left;
    
    .date, .time {
      display: inline;
      margin-right: ${theme.spacing.xs};
    }
  }
`;
