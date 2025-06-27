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
  padding: 2rem;
  background: ${({ theme }) => theme.colors.backgroundCard};
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
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
  gap: ${props => props.gap || '1rem'};
  align-items: ${props => props.align || 'stretch'};
  justify-content: ${props => props.justify || 'flex-start'};
`;

const AtividadeCard = styled.div`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.875rem;
  margin-top: 0.25rem;
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
  color: ${props => props.selected ? props.theme.colors.textLight : props.theme.colors.text};
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${props => props.selected ? props.theme.colors.primaryDark : props.theme.colors.backgroundHover};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.25);
  }
`;

const ColorPalette = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 40px);
  gap: 12px;
  justify-content: flex-start;
  align-items: center;
  margin-top: 0.75rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const ColorSphere = styled.button<{ color: string; selected: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid ${props => props.selected ? '#374151' : 'transparent'};
  background: ${props => props.color};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  
  &:hover {
    transform: scale(1.15);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    border-color: #374151;
  }
  
  &:focus {
    outline: none;
    border-color: #374151;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
  }
  
  ${props => props.selected && `
    &:after {
      content: '✓';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-weight: bold;
      font-size: 14px;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    }
  `}
`;

const CustomColorInput = styled.input`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  padding: 0;
  background: none;
  transition: all 0.2s ease;
  
  &::-webkit-color-swatch-wrapper {
    padding: 2px;
    border-radius: 50%;
  }
  
  &::-webkit-color-swatch {
    border: none;
    border-radius: 50%;
  }
  
  &:hover {
    transform: scale(1.15);
    border-color: ${({ theme }) => theme.colors.borderLight};
  }
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.25);
  }
`;

const RotinaForm: React.FC<Props> = ({ onSubmit, onCancelar }) => {
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
    
    if (erros.diasSemana) {
      setErros(prev => ({ ...prev, diasSemana: undefined }));
    }
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
          {[
            DiaSemana.DOMINGO,
            DiaSemana.SEGUNDA,
            DiaSemana.TERCA,
            DiaSemana.QUARTA,
            DiaSemana.QUINTA,
            DiaSemana.SEXTA,
            DiaSemana.SABADO
          ].map((dia) => (
            <DiaButton
              key={dia}
              type="button"
              selected={dados.diasSemana.includes(dia)}
              onClick={() => toggleDiaSemana(dia)}
            >
              {getNomeDia(dia)}
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
                  Remover
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
            Adicionar Nova Atividade
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

      <FormGroup>
        <Label>Cor da Rotina</Label>
        <ColorPalette>
          {[
            '#3b82f6', // Azul
            '#10b981', // Verde
            '#ef4444', // Vermelho
            '#f59e0b', // Laranja
            '#6366f1', // Índigo
            '#7c3aed', // Violeta
            '#e879f9', // Magenta
            '#06b6d4', // Ciano
            '#84cc16', // Lima
            '#f97316', // Laranja escuro
            '#ec4899', // Rosa
            '#8b5cf6'  // Roxo
          ].map(cor => (
            <ColorSphere
              key={cor}
              type="button"
              color={cor}
              selected={dados.cor === cor}
              onClick={() => setDados(prev => ({ ...prev, cor }))}
            />
          ))}
          <CustomColorInput
            type="color"
            value={dados.cor}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDados(prev => ({ ...prev, cor: e.target.value }))}
          />
        </ColorPalette>
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
