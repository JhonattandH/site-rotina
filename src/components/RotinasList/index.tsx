import React, { useState } from 'react';
import { Rotina, Atividade, Filtros, Categoria, TipoOrdenacao, ModoVisualizacao } from '../../types';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';
import { RotinaEditModal } from '../RotinaEditModal';
import {
  FiltrosContainer,
  FiltrosGrid,
  Select,
  RotinasGrid,
  RotinasLista,
  RotinaCard,
  RotinaListItem,
  RotinaListInfo,
  RotinaListContent,
  RotinaListProgress,
  RotinaListActions,
  RotinaHeader,
  RotinaTitulo,
  RotinaDescricao,
  RotinaActions,
  AtividadesList,
  AtividadeItem,
  AtividadeInfo,
  Checkbox,
  AtividadeTitulo,
  AtividadeHorario,
  ProgressBar,
  ProgressFill,
  ProgressText,
  EmptyState,
  HeaderSection
} from './styles';

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
  onCriarRotina?: (dadosRotina: { nome: string; descricao?: string; atividades: Atividade[]; cor: string }) => void;
}

export const RotinasList: React.FC<RotinasListProps> = ({
  rotinas,
  filtros,
  onFiltrar,
  onEditarRotina,
  onRemoverRotina,
  onAdicionarAtividade,
  onEditarAtividade,
  onRemoverAtividade,
  onToggleAtividade,
  onNovaRotina,
  onCriarRotina
}) => {
  const handleFiltroChange = (campo: keyof Filtros, valor: any) => {
    onFiltrar({
      ...filtros,
      [campo]: valor === '' ? undefined : valor
    });
  };

  const calcularProgresso = (atividades: Atividade[]) => {
    if (atividades.length === 0) return 0;
    const concluidas = atividades.filter(a => a.concluida).length;
    return Math.round((concluidas / atividades.length) * 100);
  };

  const [selectedRotina, setSelectedRotina] = useState<Rotina | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const handleEditarRotina = (rotinaId: string) => {
    const rotina = rotinas.find(r => r.id === rotinaId);
    if (rotina) {
      setSelectedRotina(rotina);
      setIsCreatingNew(false);
      setIsModalOpen(true);
    }
  };

  const handleNovaRotina = () => {
    setSelectedRotina(null);
    setIsCreatingNew(true);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRotina(null);
    setIsCreatingNew(false);
  };

  const handleSaveRotina = (rotinaEditada: Rotina) => {
    if (isCreatingNew && onCriarRotina) {
      // Para nova rotina, usa a função de criação
      onCriarRotina({
        nome: rotinaEditada.nome,
        descricao: rotinaEditada.descricao,
        atividades: rotinaEditada.atividades,
        cor: rotinaEditada.cor
      });
    } else {
      // Para rotina existente, usa a função de edição
      onEditarRotina(rotinaEditada.id, rotinaEditada);
    }
  };

  return (
    <div>
      <HeaderSection>
        <h2>Minhas Rotinas</h2>
        <Button onClick={handleNovaRotina}>
          Nova Rotina
        </Button>
      </HeaderSection>

      <FiltrosContainer>
        <FiltrosGrid>
          <div>
            <label>Buscar rotina</label>
            <Input
              placeholder="Digite o nome da rotina..."
              value={filtros.texto || ''}
              onChange={(valor: string) => handleFiltroChange('texto', valor)}
              fullWidth
            />
          </div>

          <div>
            <label>Categoria</label>
            <Select
              value={filtros.categoria || ''}
              onChange={(e) => handleFiltroChange('categoria', e.target.value)}
            >
              <option value="">Todas</option>
              <option value={Categoria.TRABALHO}>Trabalho</option>
              <option value={Categoria.PESSOAL}>Pessoal</option>
              <option value={Categoria.SAUDE}>Saúde</option>
              <option value={Categoria.ESTUDO}>Estudo</option>
              <option value={Categoria.LAZER}>Lazer</option>
            </Select>
          </div>

          <div>
            <label>Status</label>
            <Select
              value={filtros.ativa !== undefined ? (filtros.ativa ? 'true' : 'false') : ''}
              onChange={(e) => handleFiltroChange('ativa', e.target.value === '' ? undefined : e.target.value === 'true')}
            >
              <option value="">Todas</option>
              <option value="true">Ativas</option>
              <option value="false">Inativas</option>
            </Select>
          </div>

          <div>
            <label>Ordenar por</label>
            <Select
              value={filtros.ordenacao || TipoOrdenacao.NOME}
              onChange={(e) => handleFiltroChange('ordenacao', e.target.value)}
            >
              <option value={TipoOrdenacao.NOME}>Nome</option>
              <option value={TipoOrdenacao.DATA_CRIACAO}>Data de Criação</option>
              <option value={TipoOrdenacao.PROGRESSO}>Progresso</option>
              <option value={TipoOrdenacao.CATEGORIA}>Categoria</option>
              <option value={TipoOrdenacao.TOTAL_ATIVIDADES}>Total de Atividades</option>
            </Select>
          </div>

          <Button
            variant="outline"
            onClick={() => handleFiltroChange('direcaoOrdenacao', filtros.direcaoOrdenacao === 'asc' ? 'desc' : 'asc')}
          >
            {filtros.direcaoOrdenacao === 'asc' ? '↑' : '↓'}
          </Button>

          <div style={{ minWidth: '100px' }}>
            <Button
              variant="outline"
              onClick={() => handleFiltroChange('modoVisualizacao', 
                filtros.modoVisualizacao === ModoVisualizacao.LISTA ? ModoVisualizacao.CARDS : ModoVisualizacao.LISTA
              )}
              fullWidth
            >
              {filtros.modoVisualizacao === ModoVisualizacao.LISTA ? 'Cards' : 'Lista'}
            </Button>
          </div>

          <Button
            variant="outline"
            onClick={() => onFiltrar({})}
          >
            Limpar
          </Button>
        </FiltrosGrid>
      </FiltrosContainer>

      {rotinas.length === 0 ? (
        <EmptyState>
          <h3>Nenhuma rotina encontrada</h3>
          <p>
            {Object.keys(filtros).length > 0
              ? 'Tente ajustar os filtros para encontrar suas rotinas.'
              : 'Comece criando sua primeira rotina para organizar suas atividades!'}
          </p>
          <Button onClick={handleNovaRotina}>
            Criar Primeira Rotina
          </Button>
        </EmptyState>
      ) : filtros.modoVisualizacao === ModoVisualizacao.LISTA ? (
        <RotinasLista>
          {rotinas.map((rotina) => {
            const progresso = calcularProgresso(rotina.atividades);
            const atividadesConcluidas = rotina.atividades.filter(a => a.concluida).length;
            
            return (
              <RotinaListItem key={rotina.id} cor={rotina.cor}>
                <RotinaListInfo>
                  <RotinaListContent>
                    <RotinaTitulo>{rotina.nome}</RotinaTitulo>
                    {rotina.descricao && (
                      <RotinaDescricao>{rotina.descricao}</RotinaDescricao>
                    )}
                  </RotinaListContent>
                  
                  <RotinaListProgress>
                    <ProgressBar>
                      <ProgressFill percentage={progresso} cor={rotina.cor} />
                    </ProgressBar>
                    <ProgressText>
                      {atividadesConcluidas} de {rotina.atividades.length} atividades ({progresso}%)
                    </ProgressText>
                  </RotinaListProgress>
                  
                  <RotinaListActions>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditarRotina(rotina.id)}
                    >
                      Editar
                    </Button>
                  </RotinaListActions>
                </RotinaListInfo>
              </RotinaListItem>
            );
          })}
        </RotinasLista>
      ) : (
        <RotinasGrid>
          {rotinas.map((rotina) => {
            const progresso = calcularProgresso(rotina.atividades);
            
            return (
              <RotinaCard key={rotina.id} cor={rotina.cor}>
                <RotinaHeader>
                  <div>
                    <RotinaTitulo>{rotina.nome}</RotinaTitulo>
                    {rotina.descricao && (
                      <RotinaDescricao>{rotina.descricao}</RotinaDescricao>
                    )}
                  </div>
                  <RotinaActions>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditarRotina(rotina.id)}
                    >
                      Editar
                    </Button>
                  </RotinaActions>
                </RotinaHeader>

                <ProgressBar>
                  <ProgressFill percentage={progresso} cor={rotina.cor} />
                </ProgressBar>
                <ProgressText>
                  {rotina.atividades.filter(a => a.concluida).length} de {rotina.atividades.length} atividades concluídas ({progresso}%)
                </ProgressText>

                <AtividadesList>
                  {rotina.atividades.slice(0, 5).map((atividade) => (
                    <AtividadeItem key={atividade.id} concluida={atividade.concluida}>
                      <AtividadeInfo>
                        <Checkbox
                          type="checkbox"
                          checked={atividade.concluida}
                          onChange={() => onToggleAtividade(rotina.id, atividade.id)}
                        />
                        <AtividadeTitulo concluida={atividade.concluida}>
                          {atividade.titulo}
                        </AtividadeTitulo>
                      </AtividadeInfo>
                      <AtividadeHorario>
                        {atividade.horarioInicio}
                      </AtividadeHorario>
                    </AtividadeItem>
                  ))}
                  
                  {rotina.atividades.length > 5 && (
                    <div style={{ textAlign: 'center', padding: '8px', color: '#6b7280', fontSize: '0.875rem' }}>
                      +{rotina.atividades.length - 5} mais atividades...
                    </div>
                  )}
                </AtividadesList>
              </RotinaCard>
            );
          })}
        </RotinasGrid>
      )}

      {(selectedRotina || isCreatingNew) && (
        <RotinaEditModal
          rotina={selectedRotina}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveRotina}
          onRemoveAtividade={onRemoverAtividade}
          onToggleAtividade={onToggleAtividade}
          isNewRotina={isCreatingNew}
        />
      )}
    </div>
  );
};
