import React, { useState, useEffect } from 'react';
import {
    HeaderContainer,
    HeaderContent,
    TitleSection,
    Title,
    DateTimeSection,
    DateTimeDisplay,
    NavigationSection,
    NavButton
} from './styles';

//Arquivo do Header da página

interface HeaderProps {
  titulo: string;
  onDashboard?: () => void;
  onMinhasRotinas?: () => void;
  onNovaRotina?: () => void;
  onEstatisticas?: () => void;
  visualizacaoAtual?: string;
}

export const Header: React.FC<HeaderProps> = ({
  titulo,
  onDashboard,
  onMinhasRotinas,
  onNovaRotina,
  onEstatisticas,
  visualizacaoAtual
}) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Atualiza a cada segundo

    return () => clearInterval(interval);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <TitleSection>
          <Title>{titulo}</Title>
        </TitleSection>
        
        <DateTimeSection>
          <DateTimeDisplay>
            <div className="date">{formatDate(currentDateTime)}</div>
            <div className="time">{formatTime(currentDateTime)}</div>
          </DateTimeDisplay>
        </DateTimeSection>
        
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
          
          {onEstatisticas && (
            <NavButton
              onClick={onEstatisticas}
              active={visualizacaoAtual === 'estatisticas'}
            >
              Estatísticas
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
