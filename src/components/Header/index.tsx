import React from 'react';
import {
    HeaderContainer,
    HeaderContent,
    TitleSection,
    Title,
    Subtitle,
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
          <Subtitle>Organize suas atividades e maximize sua produtividade</Subtitle>
        </TitleSection>
        
        <NavigationSection>
          {onDashboard && (
            <NavButton
              onClick={onDashboard}
              active={visualizacaoAtual === 'dashboard'}
            >
              📊 Dashboard
            </NavButton>
          )}
          
          {onMinhasRotinas && (
            <NavButton
              onClick={onMinhasRotinas}
              active={visualizacaoAtual === 'rotinas'}
            >
              📋 Minhas Rotinas
            </NavButton>
          )}
          
          {onNovaRotina && (
            <NavButton
              onClick={onNovaRotina}
              active={visualizacaoAtual === 'nova-rotina'}
            >
              ➕ Nova Rotina
            </NavButton>
          )}
        </NavigationSection>
      </HeaderContent>
    </HeaderContainer>
  );
};
