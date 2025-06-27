import React, { useState } from 'react';
import styled from 'styled-components';
import { CriarRotina, CriarAtividade, Prioridade, Categoria, DiaSemana } from '../../types';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';

interface Props {
  onSubmit: (rotina: CriarRotina) => Promise<void>;
  onCancelar: () => void;
}

const FormContainer = styled.form`
  max-width: 600px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
`;

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}15;
  }
`;

const FlexContainer = styled.div<{
  direction?: 'row' | 'column';
  gap?: string;
  align?: string;
  justify?: string;
}>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  gap: ${props => props.gap || props.theme.spacing.md};
  align-items: ${props => props.align || 'stretch'};
  justify-content: ${props => props.justify || 'flex-start'};
`;

const AtividadeCard = styled.div`
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.theme.colors.background};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error};
  font-size: 0.875rem;
  margin-top: ${props => props.theme.spacing.xs};
`;

const DiasSemanaContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const DiaButton = styled.button<{ selected: boolean }>`
  padding: 0.75rem 0.5rem;
  border: 2px solid ${props => props.selected ? props.theme.colors.primary : props.theme.colors.border};
  background: ${props => props.selected ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.selected ? 'white' : props.theme.colors.text.primary};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.selected ? props.theme.colors.primaryDark : props.theme.colors.background};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}25;
  }
`;

export const RotinaForm: React.FC<Props> = ({ onSubmit, onCancelar }) => {
  const [dados, setDados] = useState<CriarRotina>({
    nome: '',
    descricao: '',
    atividades: [],
    cor: '#3b82f6',
    diasSemana: [DiaSemana.SEGUNDA, DiaSemana.TERCA, DiaSemana.QUARTA, DiaSemana.QUINTA, DiaSemana.SEXTA]
  });
  
  const [novaAtividade, setNovaAtividade] = useState<CriarAtividade>({
    titulo: '',
    descricao: '',
    horarioInicio: '08:00',
    duracao: 30,
    prioridade: Prioridade.MEDIA,
    categoria: Categoria.PESSOAL
  });
  
  const [erros, setErros] = useState<{
    nome?: string;
    atividades?: string;
    diasSemana?: string;
  }>({});
  
  const [salvando, setSalvando] = useState(false);

  const validarFormulario = (): boolean => {
    const novosErros: typeof erros = {};
    
    if (!dados.nome.trim()) {
      novosErros.nome = 'Nome é obrigatório';
    }
    
    if (dados.atividades.length === 0) {
      novosErros.atividades = 'Adicione pelo menos uma atividade';
    }
    
    if (dados.diasSemana.length === 0) {
      novosErros.diasSemana = 'Selecione pelo menos um dia da semana';
    }
    
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const toggleDiaSemana = (dia: DiaSemana) => {
    setDados(prev => ({
      ...prev,
      diasSemana: prev.diasSemana.includes(dia)
        ? prev.diasSemana.filter(d => d !== dia)
        : [...prev.diasSemana, dia]
    }));
  };

  const getNomeDia = (dia: DiaSemana): string => {
    const nomes = {
      [DiaSemana.DOMINGO]: 'Dom',
      [DiaSemana.SEGUNDA]: 'Seg',
      [DiaSemana.TERCA]: 'Ter',
      [DiaSemana.QUARTA]: 'Qua',
      [DiaSemana.QUINTA]: 'Qui',
      [DiaSemana.SEXTA]: 'Sex',
      [DiaSemana.SABADO]: 'Sáb'
    };
    return nomes[dia];
  };

  const adicionarAtividade = () => {
    if (!novaAtividade.titulo.trim()) return;
    
    setDados(prev => ({
      ...prev,
      atividades: [...prev.atividades, { ...novaAtividade }]
    }));
    
    setNovaAtividade({ 
      titulo: '', 
      descricao: '', 
      horarioInicio: '08:00',
      duracao: 30,
      prioridade: Prioridade.MEDIA,
      categoria: Categoria.PESSOAL
    });
    
    // Limpa erro de atividades se existir
    if (erros.atividades) {
      setErros(prev => ({ ...prev, atividades: undefined }));
    }
  };

  const removerAtividade = (index: number) => {
    setDados(prev => ({
      ...prev,
      atividades: prev.atividades.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validarFormulario()) return;
    
    setSalvando(true);
    try {
      await onSubmit(dados);
    } catch (error) {
      console.error('Erro ao salvar rotina:', error);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="nome">Nome da Rotina</Label>
        <Input
          placeholder="Ex: Rotina Matinal"
          value={dados.nome}
          onChange={(valor: string) => {
            setDados(prev => ({ ...prev, nome: valor }));
            if (erros.nome) {
              setErros(prev => ({ ...prev, nome: undefined }));
            }
          }}
          fullWidth
          error={erros.nome}
        />
        {erros.nome && <ErrorMessage>{erros.nome}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="descricao">Descrição (Opcional)</Label>
        <Textarea
          placeholder="Descreva sua rotina..."
          value={dados.descricao}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
            setDados(prev => ({ ...prev, descricao: e.target.value }))
          }
        />
      </FormGroup>

      <FormGroup>
        <Label>Dias da Semana *</Label>
        <DiasSemanaContainer>
          {Object.values(DiaSemana).filter(dia => typeof dia === 'number').map((dia) => (
            <DiaButton
              key={dia}
              type="button"
              selected={dados.diasSemana.includes(dia as DiaSemana)}
              onClick={() => toggleDiaSemana(dia as DiaSemana)}
            >
              {getNomeDia(dia as DiaSemana)}
            </DiaButton>
          ))}
        </DiasSemanaContainer>
        {erros.diasSemana && <ErrorMessage>{erros.diasSemana}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label>Atividades</Label>
        {dados.atividades.length > 0 && (
          <FlexContainer 
            direction="column" 
            gap="0.5rem"
            style={{ marginBottom: '1rem' }}
          >
            {dados.atividades.map((atividade, index) => (
              <AtividadeCard key={index}>
                <div style={{ flex: 1 }}>
                  <strong>{atividade.titulo}</strong>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removerAtividade(index)}
                >
                  🗑️
                </Button>
              </AtividadeCard>
            ))}
          </FlexContainer>
        )}
        
        <div style={{
          padding: '1rem',
          background: '#f8fafc',
          borderRadius: '0.5rem',
          border: '2px dashed #e2e8f0',
          marginTop: '1rem'
        }}>
          <label style={{ 
            fontWeight: 'bold', 
            marginBottom: '0.5rem', 
            display: 'block' 
          }}>
            ➕ Adicionar Nova Atividade
          </label>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Input
              placeholder="Nome da atividade (ex: Escovar os dentes)"
              value={novaAtividade.titulo}
              onChange={(valor: string) => setNovaAtividade({ ...novaAtividade, titulo: valor })}
              fullWidth
            />
            <Button
              type="button"
              variant="outline"
              onClick={adicionarAtividade}
              disabled={!novaAtividade.titulo.trim()}
            >
              Adicionar
            </Button>
          </div>
        </div>
        {erros.atividades && <ErrorMessage>{erros.atividades}</ErrorMessage>}
      </FormGroup>

      <FlexContainer
        justify="flex-end"
        gap="1rem"
        style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}
      >
        <Button
          type="button"
          variant="ghost"
          onClick={onCancelar}
          disabled={salvando}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          loading={salvando}
          disabled={salvando}
        >
          Criar Rotina
        </Button>
      </FlexContainer>
    </FormContainer>
  );
};

export default RotinaForm;
