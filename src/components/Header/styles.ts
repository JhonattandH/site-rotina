import styled from 'styled-components';
import { theme } from '../../styles/theme';

//Estilização do Header da página

export const HeaderContainer = styled.header`
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%);
  color: ${theme.colors.textLight};
  padding: ${theme.spacing.lg} 0;
  box-shadow: ${theme.shadows.lg};
  position: relative;
  
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

export const HeaderContent = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.xs};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${theme.spacing.md};
    text-align: center;
  }
`;

export const TitleSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: ${theme.breakpoints.md}) {
    align-items: center;
  }
`;

export const Title = styled.h1`
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  margin: 0 0 ${theme.spacing.xs} 0;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  
  &::before {
    content: "⚡";
    font-size: ${theme.typography.fontSize['2xl']};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize['2xl']};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.fontSize.xl};
  }
`;

export const Subtitle = styled.p`
  font-size: ${theme.typography.fontSize.base};
  opacity: 0.9;
  margin: 0;
  font-weight: ${theme.typography.fontWeight.medium};

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.fontSize.sm};
  }
`;

export const NavigationSection = styled.nav`
  display: flex;
  gap: ${theme.spacing.sm};
  align-items: center;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-wrap: wrap;
    justify-content: center;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 100%;
    flex-direction: column;
    gap: ${theme.spacing.xs};
  }
`;

export const NavButton = styled.button<{ active?: boolean }>`
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: ${theme.colors.textLight};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${theme.transitions.fast} ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  min-width: 120px;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 100%;
    min-width: auto;
  }
`;
