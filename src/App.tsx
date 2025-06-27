// App.tsx - Componente principal da aplicação
// Gerencia o estado global e renderiza a interface principal

import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, AppContainer, MainContainer } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { useRotinas } from './hooks/useRotinas';
import { Header } from './components/Header/';
import { Dashboard } from './components/Dashboard';
import { TarefasDiarias } from './components/TarefasDiarias';
import { RotinasList } from './components/RotinasList';
import RotinaForm from './components/RotinaForm';
import { Filtros, CriarRotina } from './types';

/**
 * Enum para as diferentes visualizações da aplicação
 */
enum Visualizacao {
  DASHBOARD = 'dashboard',
  ROTINAS = 'rotinas',
  NOVA_ROTINA = 'nova-rotina'
}

/**
 * Componente principal da aplicação
 * Gerencia navegação e estado global
 */
function App() {
  // Hook customizado para gerenciar rotinas
  const {
    rotinas,
    rotinasFiltradas,
    filtros,
    estatisticas,
    criarRotina,
    atualizarRotina,
    removerRotina,
    adicionarAtividade,
    atualizarAtividade,
    removerAtividade,
    toggleAtividade,
    setFiltros
  } = useRotinas();

  // Estado da visualização atual
  const [visualizacaoAtual, setVisualizacaoAtual] = useState<Visualizacao>(
    Visualizacao.DASHBOARD
  );

  /**
   * Função para mudar a visualização
   */
  const mudarVisualizacao = (novaVisualizacao: Visualizacao) => {
    setVisualizacaoAtual(novaVisualizacao);
  };

  /**
   * Handler para criação de nova rotina
   * Cria a rotina e volta para a lista
   */
  const handleCriarRotina = async (dadosRotina: CriarRotina) => {
    await criarRotina(dadosRotina);
    setVisualizacaoAtual(Visualizacao.ROTINAS);
  };

  /**
   * Handler para criação de nova rotina via modal
   */
  const handleCriarRotinaModal = (dadosRotina: CriarRotina) => {
    criarRotina(dadosRotina);
  };

  /**
   * Handler para aplicar filtros
   */
  const handleFiltros = (novosFiltros: Filtros) => {
    setFiltros(novosFiltros);
  };

  /**
   * Renderiza o conteúdo baseado na visualização atual
   */
  const renderizarConteudo = () => {
    switch (visualizacaoAtual) {
      case Visualizacao.DASHBOARD:
        return (
          <>
            <Dashboard
              estatisticas={estatisticas}
            />
            <TarefasDiarias 
              rotinas={rotinas} 
              onToggleAtividade={toggleAtividade}
            />
          </>
        );

      case Visualizacao.ROTINAS:
        return (
          <RotinasList
            rotinas={rotinasFiltradas}
            filtros={filtros}
            onFiltrar={handleFiltros}
            onEditarRotina={atualizarRotina}
            onRemoverRotina={removerRotina}
            onAdicionarAtividade={adicionarAtividade}
            onEditarAtividade={atualizarAtividade}
            onRemoverAtividade={removerAtividade}
            onToggleAtividade={toggleAtividade}
            onNovaRotina={() => mudarVisualizacao(Visualizacao.NOVA_ROTINA)}
            onCriarRotina={handleCriarRotinaModal}
          />
        );

      case Visualizacao.NOVA_ROTINA:
        return (
          <RotinaForm
            onSubmit={handleCriarRotina}
            onCancelar={() => mudarVisualizacao(Visualizacao.ROTINAS)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContainer>
        {/* Cabeçalho da aplicação com navegação */}
        <Header
          titulo="Gerenciador de Rotinas"
          onDashboard={() => mudarVisualizacao(Visualizacao.DASHBOARD)}
          onMinhasRotinas={() => mudarVisualizacao(Visualizacao.ROTINAS)}
          visualizacaoAtual={visualizacaoAtual}
        />

        {/* Conteúdo principal */}
        <MainContainer>
          {renderizarConteudo()}
        </MainContainer>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
