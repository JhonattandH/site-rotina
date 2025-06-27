import React, { useState } from 'react';
import { CriarRotina, CriarAtividade, Prioridade, Categoria } from '../../types';
import {
  FormContainer,
  FormTitle,
  FormGroup,
  Label,
  Input,
  Textarea,
  Select,
  AtividadesSection,
  AtividadeCard,
  NovaAtividadeForm,
  Row,
  Button,
  ButtonContainer,
  ErrorMessage,
  RemoveButton
} from './styles';

interface RotinaFormProps {
  onSubmit: (rotina: CriarRotina) => Promise<void>;
  onCancelar: () => void;
}

export const RotinaForm: React.FC<RotinaFormProps> = ({ onSubmit, onCancelar }) => {
  const [salvando, setSalvando] = useState(false);
  const [erros, setErros] = useState<Record<string, string>>({});
  
  const [rotina, setRotina] = useState<CriarRotina>({
    nome: '',
    descricao: '',
    atividades: [],
    cor: '#3b82f6'
  });

  const [novaAtividade, setNovaAtividade] = useState<CriarAtividade>({
    titulo: '',
    descricao: '',
    horarioInicio: '08:00',
    duracao: 30,
    prioridade: Prioridade.MEDIA,
    categoria: Categoria.PESSOAL
  });

  const validarFormulario = (): boolean => {
    const novosErros: Record<string, string> = {};

    if (!rotina.nome.trim()) {
      novosErros.nome = 'Nome da rotina é obrigatório';
    }

    if (rotina.atividades.length === 0) {
      novosErros.atividades = 'Adicione pelo menos uma atividade';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const adicionarAtividade = () => {
    if (!novaAtividade.titulo.trim()) return;

    setRotina(prev => ({
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
  };

  const removerAtividade = (index: number) => {
    setRotina(prev => ({
      ...prev,
      atividades: prev.atividades.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validarFormulario()) return;

    setSalvando(true);
    try {
      await onSubmit(rotina);
    } catch (error) {
      console.error('Erro ao criar rotina:', error);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Nova Rotina</FormTitle>
      
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Nome da Rotina *</Label>
          <Input
            type="text"
            placeholder="Ex: Rotina Matinal, Treino Semanal..."
            value={rotina.nome}
            onChange={(e) => setRotina(prev => ({ ...prev, nome: e.target.value }))}
          />
          {erros.nome && <ErrorMessage>{erros.nome}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Descrição</Label>
          <Textarea
            placeholder="Descreva o objetivo desta rotina..."
            value={rotina.descricao || ''}
            onChange={(e) => setRotina(prev => ({ ...prev, descricao: e.target.value }))}
          />
        </FormGroup>

        <FormGroup>
          <Label>Cor da Rotina</Label>
          <Input
            type="color"
            value={rotina.cor}
            onChange={(e) => setRotina(prev => ({ ...prev, cor: e.target.value }))}
          />
        </FormGroup>

        <FormGroup>
          <AtividadesSection>
            <h3>Atividades da Rotina</h3>
            
            {rotina.atividades.map((atividade, index) => (
              <AtividadeCard key={index}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 0.5rem 0' }}>{atividade.titulo}</h4>
                  <div style={{ fontSize: '0.875rem', color: '#3b82f6' }}>
                    {atividade.horarioInicio} - {atividade.duracao}min • {atividade.categoria} • {atividade.prioridade}
                  </div>
                  {atividade.descricao && (
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0.25rem 0 0 0' }}>
                      {atividade.descricao}
                    </p>
                  )}
                </div>
                <RemoveButton onClick={() => removerAtividade(index)}>
                  ✕
                </RemoveButton>
              </AtividadeCard>
            ))}

            <NovaAtividadeForm>
              <FormGroup>
                <Label>Título da Atividade *</Label>
                <Input
                  type="text"
                  placeholder="Ex: Meditar, Fazer exercícios..."
                  value={novaAtividade.titulo}
                  onChange={(e) => setNovaAtividade(prev => ({ ...prev, titulo: e.target.value }))}
                />
              </FormGroup>

              <Row>
                <FormGroup>
                  <Label>Categoria</Label>
                  <Select
                    value={novaAtividade.categoria}
                    onChange={(e) => setNovaAtividade(prev => ({ 
                      ...prev, 
                      categoria: e.target.value as Categoria 
                    }))}
                  >
                    <option value={Categoria.PESSOAL}>Pessoal</option>
                    <option value={Categoria.TRABALHO}>Trabalho</option>
                    <option value={Categoria.SAUDE}>Saúde</option>
                    <option value={Categoria.ESTUDO}>Estudo</option>
                    <option value={Categoria.LAZER}>Lazer</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label>Prioridade</Label>
                  <Select
                    value={novaAtividade.prioridade}
                    onChange={(e) => setNovaAtividade(prev => ({ 
                      ...prev, 
                      prioridade: e.target.value as Prioridade 
                    }))}
                  >
                    <option value={Prioridade.BAIXA}>Baixa</option>
                    <option value={Prioridade.MEDIA}>Média</option>
                    <option value={Prioridade.ALTA}>Alta</option>
                  </Select>
                </FormGroup>
              </Row>

              <Row>
                <FormGroup>
                  <Label>Horário de Início</Label>
                  <Input
                    type="time"
                    value={novaAtividade.horarioInicio}
                    onChange={(e) => setNovaAtividade(prev => ({ 
                      ...prev, 
                      horarioInicio: e.target.value 
                    }))}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Duração (minutos)</Label>
                  <Input
                    type="number"
                    min="1"
                    max="480"
                    value={novaAtividade.duracao}
                    onChange={(e) => setNovaAtividade(prev => ({ 
                      ...prev, 
                      duracao: parseInt(e.target.value) || 1 
                    }))}
                  />
                </FormGroup>
              </Row>

              <FormGroup>
                <Label>Descrição (Opcional)</Label>
                <Textarea
                  placeholder="Detalhes sobre como realizar esta atividade..."
                  value={novaAtividade.descricao || ''}
                  onChange={(e) => setNovaAtividade(prev => ({ 
                    ...prev, 
                    descricao: e.target.value 
                  }))}
                />
              </FormGroup>

              <Button
                type="button"
                variant="outline"
                onClick={adicionarAtividade}
                disabled={!novaAtividade.titulo.trim()}
              >
                ➕ Adicionar Atividade
              </Button>
            </NovaAtividadeForm>

            {erros.atividades && <ErrorMessage>{erros.atividades}</ErrorMessage>}
          </AtividadesSection>
        </FormGroup>

        <ButtonContainer>
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
            disabled={salvando}
          >
            {salvando ? 'Criando...' : 'Criar Rotina'}
          </Button>
        </ButtonContainer>
      </form>
    </FormContainer>
  );
};

export default RotinaForm;
