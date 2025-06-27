import React from 'react';
import {
    HeaderContainer,
    HeaderContent,
    TitleSection,
    Title,
    NavigationSection,
    NavButton
} from './styles';

//Arquivo do Header da página

interface HeaderProps {
  titulo: string;
  onDashboard?: () => void;
  onMinhasRotinas?: () => void;
  onNovaRotina?: () => void;
  visualizacaoAtual?: string;
}

export const Header: React.FC<HeaderProps> = ({
  titulo,
  onDashboard,
  onMinhasRotinas,
  onNovaRotina,
  visualizacaoAtual
}) => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <TitleSection>
          <Title>{titulo}</Title>
        </TitleSection>
        
        <NavigationSection>
          {onDashboard && (
            <NavButton
              onClick={onDashboard}
              active={visualizacaoAtual === 'dashboard'}
            >
              Dashboard
            </NavButton>
          )}
          
          {onMinhasRotinas && (
            <NavButton
              onClick={onMinhasRotinas}
              active={visualizacaoAtual === 'rotinas'}
            >
              Rotinas
            </NavButton>
          )}
          
          {onNovaRotina && (
            <NavButton
              onClick={onNovaRotina}
              active={visualizacaoAtual === 'nova-rotina'}
            >
              Nova
            </NavButton>
          )}
        </NavigationSection>
      </HeaderContent>
    </HeaderContainer>
  );
};
