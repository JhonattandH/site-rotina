import React, { useState, useEffect } from 'react';
import { Rotina, Atividade, Prioridade, Categoria, DiaSemana } from '../../types';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalContent,
  FormSection,
  FormGroup,
  Label,
  Textarea,
  Select,
  AtividadesList,
  AtividadeCard,
  AtividadeHeader,
  AtividadeActions,
  ModalFooter,
  ColorPicker,
  TimeInput,
  ErrorMessage
} from './styles';

interface RotinaEditModalProps {
  rotina: Rotina | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (rotina: Rotina) => void;
  onRemoveAtividade: (rotinaId: string, atividadeId: string) => void;
  onToggleAtividade: (rotinaId: string, atividadeId: string) => void;
  isNewRotina?: boolean;
}

export const RotinaEditModal: React.FC<RotinaEditModalProps> = ({
  rotina,
  isOpen,
  onClose,
  onSave,
  onRemoveAtividade,
  onToggleAtividade,
  isNewRotina = false
}) => {
  const [editedRotina, setEditedRotina] = useState<Rotina | null>(null);
  const [erro, setErro] = useState<string>('');

  useEffect(() => {
    if (rotina) {
      const rotinaEditada = { ...rotina };
      
      // Se é uma nova rotina e não tem atividades, adiciona uma atividade inicial
      if (isNewRotina && rotinaEditada.atividades.length === 0) {
        const atividadeInicial: Atividade = {
          id: Date.now().toString(),
          titulo: '',
          concluida: false,
          prioridade: Prioridade.MEDIA,
          categoria: Categoria.PESSOAL,
          horarioInicio: '08:00',
          duracao: 30
        };
        rotinaEditada.atividades = [atividadeInicial];
      }
      
      setEditedRotina(rotinaEditada);
    } else if (isNewRotina) {
      // Cria uma nova rotina vazia com uma atividade inicial
      const novaRotina: Rotina = {
        id: Date.now().toString(),
        nome: '',
        descricao: '',
        ativa: true,
        cor: '#3b82f6',
        diasSemana: [DiaSemana.SEGUNDA, DiaSemana.TERCA, DiaSemana.QUARTA, DiaSemana.QUINTA, DiaSemana.SEXTA],
        atividades: [{
          id: Date.now().toString(),
          titulo: '',
          concluida: false,
          prioridade: Prioridade.MEDIA,
          categoria: Categoria.PESSOAL,
          horarioInicio: '08:00',
          duracao: 30
        }]
      };
      setEditedRotina(novaRotina);
    }
  }, [rotina, isNewRotina]);

  if (!isOpen || !editedRotina) return null;

  const handleSave = () => {
    if (!editedRotina) return;
    
    // Validação: nova rotina deve ter pelo menos uma atividade com título
    if (isNewRotina) {
      const atividadesComTitulo = editedRotina.atividades.filter(atividade => atividade.titulo.trim());
      if (atividadesComTitulo.length === 0) {
        setErro('Preencha o título de pelo menos uma atividade');
        return;
      }
    }
    
    setErro('');
    
    // Remove atividades vazias antes de salvar
    const rotinaParaSalvar = {
      ...editedRotina,
      atividades: editedRotina.atividades.filter(atividade => atividade.titulo.trim())
    };
    
    onSave(rotinaParaSalvar);
    onClose();
  };

  const handleAtividadeChange = (atividadeId: string, field: keyof Atividade, value: any) => {
    setEditedRotina(prev => {
      if (!prev) return null;
      return {
        ...prev,
        atividades: prev.atividades.map(atividade =>
          atividade.id === atividadeId
            ? { ...atividade, [field]: value }
            : atividade
        )
      };
    });
    
    // Limpa erro quando usuário começa a preencher título
    if (field === 'titulo' && value.trim() && erro) {
      setErro('');
    }
  };

  const handleAdicionarAtividade = () => {
    const novaAtividade: Atividade = {
      id: Date.now().toString(),
      titulo: 'Nova Atividade',
      concluida: false,
      prioridade: Prioridade.MEDIA,
      categoria: Categoria.PESSOAL,
      horarioInicio: '08:00',
      duracao: 30
    };

    setEditedRotina(prev => {
      if (!prev) return null;
      return {
        ...prev,
        atividades: [...prev.atividades, novaAtividade]
      };
    });
  };

  const handleRemoverAtividade = (atividadeId: string) => {
    setEditedRotina(prev => {
      if (!prev) return null;
      
      // Para nova rotina, não permite remover se for a última atividade
      if (isNewRotina && prev.atividades.length <= 1) {
        setErro('Uma nova rotina deve ter pelo menos uma atividade');
        return prev;
      }
      
      setErro(''); // Limpa erro se houver
      return {
        ...prev,
        atividades: prev.atividades.filter(atividade => atividade.id !== atividadeId)
      };
    });
  };

  const handleToggleAtividade = (atividadeId: string) => {
    setEditedRotina(prev => {
      if (!prev) return null;
      return {
        ...prev,
        atividades: prev.atividades.map(atividade =>
          atividade.id === atividadeId
            ? { ...atividade, concluida: !atividade.concluida }
            : atividade
        )
      };
    });
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{isNewRotina ? 'Nova Rotina' : 'Configurar Rotina'}</ModalTitle>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </ModalHeader>

        <ModalContent>
          <FormSection>
            <h3>Configurações da Rotina</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 80px', gap: '12px', alignItems: 'end' }}>
              <FormGroup>
                <Label>Nome da Rotina</Label>
                <Input
                  value={editedRotina.nome}
                  onChange={(value: string) => setEditedRotina(prev => prev ? { ...prev, nome: value } : null)}
                  placeholder="Nome da rotina"
                  fullWidth
                />
              </FormGroup>

              <FormGroup>
                <Label>Status</Label>
                <Select
                  value={editedRotina.ativa ? 'ativa' : 'inativa'}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setEditedRotina(prev => prev ? { ...prev, ativa: e.target.value === 'ativa' } : null)
                  }
                >
                  <option value="ativa">Ativa</option>
                  <option value="inativa">Inativa</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Cor</Label>
                <ColorPicker
                  type="color"
                  value={editedRotina.cor}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEditedRotina(prev => prev ? { ...prev, cor: e.target.value } : null)
                  }
                />
              </FormGroup>
            </div>

            {editedRotina.descricao !== undefined && (
              <FormGroup style={{ marginTop: '12px' }}>
                <Label>Descrição</Label>
                <Textarea
                  value={editedRotina.descricao || ''}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
                    setEditedRotina(prev => prev ? { ...prev, descricao: e.target.value } : null)
                  }
                  placeholder="Descrição opcional da rotina"
                />
              </FormGroup>
            )}
          </FormSection>

          <FormSection>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3>Atividades ({editedRotina.atividades.length})</h3>
              <Button 
                variant="primary" 
                size="sm" 
                onClick={handleAdicionarAtividade}
              >
                Nova Atividade
              </Button>
            </div>
            
            <AtividadesList>
              {editedRotina.atividades.map((atividade) => (
                <AtividadeCard key={atividade.id} concluida={atividade.concluida}>
                  <AtividadeHeader>
                    <div style={{ flex: 1 }}>
                      <Input
                        value={atividade.titulo}
                        onChange={(value: string) => handleAtividadeChange(atividade.id, 'titulo', value)}
                        placeholder={isNewRotina && !atividade.titulo ? "Digite o título da atividade" : "Título da atividade"}
                      />
                    </div>
                    <AtividadeActions>
                      <Button
                        variant={atividade.concluida ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => handleToggleAtividade(atividade.id)}
                      >
                        {atividade.concluida ? 'OK' : 'Pendente'}
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemoverAtividade(atividade.id)}
                      >
                        Remover
                      </Button>
                    </AtividadeActions>
                  </AtividadeHeader>

                  <div style={{ display: 'grid', gridTemplateColumns: '100px 80px 1fr 120px', gap: '8px' }}>
                    <div>
                      <Label>Horário</Label>
                      <TimeInput
                        type="time"
                        value={atividade.horarioInicio}
                        onChange={(e) => handleAtividadeChange(atividade.id, 'horarioInicio', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label>Duração</Label>
                      <Input
                        type="number"
                        value={atividade.duracao.toString()}
                        onChange={(value: string) => handleAtividadeChange(atividade.id, 'duracao', parseInt(value) || 0)}
                        placeholder="30"
                      />
                    </div>

                    <div>
                      <Label>Categoria</Label>
                      <Select
                        value={atividade.categoria}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                          handleAtividadeChange(atividade.id, 'categoria', e.target.value as Categoria)
                        }
                      >
                        <option value={Categoria.PESSOAL}>Pessoal</option>
                        <option value={Categoria.TRABALHO}>Trabalho</option>
                        <option value={Categoria.SAUDE}>Saúde</option>
                        <option value={Categoria.ESTUDO}>Estudo</option>
                        <option value={Categoria.LAZER}>Lazer</option>
                      </Select>
                    </div>

                    <div>
                      <Label>Prioridade</Label>
                      <Select
                        value={atividade.prioridade}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                          handleAtividadeChange(atividade.id, 'prioridade', e.target.value as Prioridade)
                        }
                      >
                        <option value={Prioridade.BAIXA}>Baixa</option>
                        <option value={Prioridade.MEDIA}>Média</option>
                        <option value={Prioridade.ALTA}>Alta</option>
                      </Select>
                    </div>
                  </div>
                </AtividadeCard>
              ))}
            </AtividadesList>
          </FormSection>
        </ModalContent>

        <ModalFooter>
          {erro && <ErrorMessage>{erro}</ErrorMessage>}
          <div className="buttons">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Salvar
            </Button>
          </div>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};
