// components/RotinasList.tsx - Lista de rotinas com filtros
// Exibe todas as rotinas com opções de filtro e ações

import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { Card, FlexContainer, GridContainer } from '../styles/GlobalStyles';
import { Button } from './UI/Button';
import { Input } from './UI/Input';
import { Rotina, Atividade, Filtros, Categoria, Prioridade } from '../types';

/**
 * Props do componente RotinasList
 */
interface RotinasListProps {
  rotinas: Rotina[];
  filtros: Filtros;
  onFiltrar: (filtros: Filtros) => void;
  onEditarRotina: (id: string, dados: Partial<Rotina>) => void;
  onRemoverRotina: (id: string) => void;
  onAdicionarAtividade: (rotinaId: string, atividade: any) => void;
  onEditarAtividade: (rotinaId: string, atividadeId: string, dados: Partial<Atividade>) => void;
  onRemoverAtividade: (rotinaId: string, atividadeId: string) => void;
  onToggleAtividade: (rotinaId: string, atividadeId: string) => void;
  onNovaRotina: () => void;
}

/**
 * Container de filtros
 */
const FiltrosContainer = styled(Card)`
  margin-bottom: ${theme.spacing.xl};
  background: ${theme.colors.backgroundSecondary};
`;

/**
 * Grid de filtros
 */
const FiltrosGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr auto;
  gap: ${theme.spacing.md};
  align-items: end;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

/**
 * Select estilizado
 */
const Select = styled.select`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-family: ${theme.typography.fontFamily.primary};
  font-size: ${theme.typography.fontSize.base};
  background-color: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text};
  transition: all ${theme.transitions.fast} ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px ${theme.colors.primary}20;
  }
`;

/**
 * Card de rotina individual - Quadrado
 */
const RotinaCard = styled(Card)`
  border-left: 4px solid ${theme.colors.primary};
  position: relative;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

/**
 * Cabeçalho da rotina
 */
const RotinaHeader = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  
  > div:first-child {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

/**
 * Título da rotina
 */
const RotinaTitulo = styled.h3`
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.text};
  margin: 0 0 ${theme.spacing.xs} 0;
`;

/**
 * Descrição da rotina
 */
const RotinaDescricao = styled.p`
  color: ${theme.colors.textSecondary};
  margin: 0;
`;

/**
 * Metadados da rotina
 */
const RotinaMetadata = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textSecondary};
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
  
  > div {
    display: flex;
    gap: ${theme.spacing.xs};
    align-items: center;
  }
`;

/**
 * Botões de ação da rotina
 */
const AcoesRotina = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.sm};
`;

/**
 * Estado vazio
 */
const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing['4xl']};
  color: ${theme.colors.textSecondary};
  
  h3 {
    font-size: ${theme.typography.fontSize['2xl']};
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.text};
  }
`;

/**
 * Componente RotinasList
 * Lista completa de rotinas com filtros e ações
 */
export const RotinasList: React.FC<RotinasListProps> = ({
  rotinas,
  filtros,
  onFiltrar,
  onEditarRotina,
  onRemoverRotina,
  onToggleAtividade,
  onNovaRotina
}) => {
  const [busca, setBusca] = useState(filtros.texto || '');
  const [categoria, setCategoria] = useState(filtros.categoria || '');
  const [prioridade, setPrioridade] = useState(filtros.prioridade || '');

  /**
   * Aplica os filtros quando algum campo muda
   */
  const aplicarFiltros = () => {
    onFiltrar({
      texto: busca,
      categoria: categoria as Categoria || undefined,
      prioridade: prioridade as Prioridade || undefined
    });
  };

  return (
    <div>
      {/* Cabeçalho */}
      <FlexContainer justify="space-between" align="center" style={{ marginBottom: theme.spacing.xl }}>
        <h2 style={{ fontSize: theme.typography.fontSize['3xl'], margin: 0 }}>
          Minhas Rotinas
        </h2>
        <Button onClick={onNovaRotina}>
          Nova Rotina
        </Button>
      </FlexContainer>

      {/* Filtros */}
      <FiltrosContainer>
        <h3 style={{ marginBottom: theme.spacing.md }}>Filtros</h3>
        <FiltrosGrid>
          <Input
            placeholder="Buscar rotinas..."
            value={busca}
            onChange={setBusca}
          />
          
          <div>
            <label style={{ fontSize: theme.typography.fontSize.sm, marginBottom: theme.spacing.xs, display: 'block' }}>
              Categoria
            </label>
            <Select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              <option value="">Todas</option>
              <option value={Categoria.TRABALHO}>Trabalho</option>
              <option value={Categoria.PESSOAL}>Pessoal</option>
              <option value={Categoria.SAUDE}>Saúde</option>
              <option value={Categoria.ESTUDO}>Estudo</option>
              <option value={Categoria.LAZER}>Lazer</option>
            </Select>
          </div>
          
          <div>
            <label style={{ fontSize: theme.typography.fontSize.sm, marginBottom: theme.spacing.xs, display: 'block' }}>
              Prioridade
            </label>
            <Select value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
              <option value="">Todas</option>
              <option value={Prioridade.ALTA}>Alta</option>
              <option value={Prioridade.MEDIA}>Média</option>
              <option value={Prioridade.BAIXA}>Baixa</option>
            </Select>
          </div>
          
          <Button onClick={aplicarFiltros}>
            Filtrar
          </Button>
        </FiltrosGrid>
      </FiltrosContainer>

      {/* Lista de Rotinas */}
      {rotinas.length > 0 ? (
        <GridContainer>
          {rotinas.map((rotina) => (
            <RotinaCard key={rotina.id}>
              <RotinaHeader>
                <div>
                  <RotinaTitulo>{rotina.nome}</RotinaTitulo>
                  {rotina.descricao && (
                    <RotinaDescricao>{rotina.descricao}</RotinaDescricao>
                  )}
                  <RotinaMetadata>
                    <div>
                      <span>{rotina.atividades.length} atividade{rotina.atividades.length !== 1 ? 's' : ''}</span>
                    </div>
                    <div>
                      <span>{rotina.ativa ? 'Ativa' : 'Inativa'}</span>
                    </div>
                  </RotinaMetadata>
                </div>
              </RotinaHeader>
              <AcoesRotina>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onRemoverRotina(rotina.id)}
                >
                  Remover
                </Button>
              </AcoesRotina>
            </RotinaCard>
          ))}
        </GridContainer>
      ) : (
        <EmptyState>
          <h3>Nenhuma rotina encontrada</h3>
          <p>Tente ajustar os filtros ou crie uma nova rotina.</p>
          <Button onClick={onNovaRotina}>
            Criar Nova Rotina
          </Button>
        </EmptyState>
      )}
    </div>
  );
};
