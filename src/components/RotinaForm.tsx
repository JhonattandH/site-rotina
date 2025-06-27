import React, { useState } from 'react';
import styled from 'styled-components';
import { CriarRotina, Prioridade, Categoria } from '../types';

interface RotinaFormProps {
  onSubmit: (rotina: CriarRotina) => Promise<void>;
  onCancelar: () => void;
}

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const Button = styled.button<{ variant?: string }>`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  margin-right: 1rem;

  ${props => props.variant === 'secondary' 
    ? 'background: #6b7280; color: white;'
    : 'background: #3b82f6; color: white;'
  }

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const RotinaForm: React.FC<RotinaFormProps> = ({ onSubmit, onCancelar }) => {
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nome.trim()) {
      alert('Nome da rotina é obrigatório');
      return;
    }

    setLoading(true);
    try {
      const novaRotina: CriarRotina = {
        nome: nome.trim(),
        descricao: descricao.trim() || undefined,
        atividades: [
          {
            titulo: 'Primeira atividade',
            horarioInicio: '08:00',
            duracao: 30,
            prioridade: Prioridade.MEDIA,
            categoria: Categoria.PESSOAL
          }
        ],
        cor: '#3b82f6'
      };
      
      await onSubmit(novaRotina);
    } catch (error) {
      console.error('Erro ao criar rotina:', error);
      alert('Erro ao criar rotina');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Nova Rotina</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Nome da Rotina *</Label>
          <Input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Rotina Matinal"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Descrição</Label>
          <Input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descrição da rotina..."
          />
        </FormGroup>

        <div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Criando...' : 'Criar Rotina'}
          </Button>
          <Button 
            type="button" 
            variant="secondary" 
            onClick={onCancelar}
            disabled={loading}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default RotinaForm;
