import styled from 'styled-components';
import { theme } from '../../styles/theme';

//Estilização moderna e minimalista do Header

export const HeaderContainer = styled.header`
  background: #1e3a8a;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  padding: ${theme.spacing.xl} 0;
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all ${theme.transitions.fast} ease;
`;

export const HeaderContent = styled.div`
  width: 100%;
  padding: 0 ${theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0 ${theme.spacing.lg};
    flex-direction: row;
    gap: ${theme.spacing.md};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 0 ${theme.spacing.md};
    flex-direction: column;
    gap: ${theme.spacing.sm};
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
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  margin: 0;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  letter-spacing: -0.02em;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize.xl};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.fontSize.lg};
  }
`;

export const NavigationSection = styled.nav`
  display: flex;
  gap: ${theme.spacing.xs};
  align-items: center;
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
  background: ${props => props.active 
    ? `linear-gradient(135deg, #ffffff, #f8fafc)`
    : 'transparent'
  };
  border: 1px solid ${props => props.active 
    ? 'transparent' 
    : 'rgba(255, 255, 255, 0.3)'
  };
  color: ${props => props.active 
    ? '#1e3a8a'
    : '#ffffff'
  };
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: 6px;
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
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
      ? `linear-gradient(135deg, #ffffff, #f8fafc)`
      : 'rgba(255, 255, 255, 0.1)'
    };
    border-color: ${props => props.active 
      ? 'transparent' 
      : 'rgba(255, 255, 255, 0.5)'
    };
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
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
