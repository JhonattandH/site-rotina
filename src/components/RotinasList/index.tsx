import React from 'react';
import { Rotina, Atividade, Filtros, Categoria } from '../../types';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';
import {
  FiltrosContainer,
  FiltrosGrid,
  Select,
  RotinasGrid,
  RotinaCard,
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
  onNovaRotina
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

  return (
    <div>
      <HeaderSection>
        <h2>Minhas Rotinas</h2>
        <Button onClick={onNovaRotina}>
          ➕ Nova Rotina
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
          <Button onClick={onNovaRotina}>
            Criar Primeira Rotina
          </Button>
        </EmptyState>
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
                      onClick={() => onRemoverRotina(rotina.id)}
                    >
                      🗑️
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
    </div>
  );
};
