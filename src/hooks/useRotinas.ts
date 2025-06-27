// hooks/useRotinas.ts - Hook personalizado para gerenciar rotinas
// Centraliza toda a lógica de estado das rotinas

import { useState, useCallback, useMemo } from 'react';
import { Rotina, Atividade, CriarRotina, CriarAtividade, Filtros, Estatisticas, Prioridade, Categoria, TipoOrdenacao, ModoVisualizacao, DiaSemana } from '../types';
import { useLocalStorage } from './useLocalStorage';

/**
 * Rotinas de exemplo para demonstração
 */
const rotinasExemplo: Rotina[] = [
  {
    id: 'exemplo-1',
    nome: '🌅 Rotina Matinal',
    descricao: 'Uma rotina energizante para começar o dia com o pé direito',
    atividades: [
      {
        id: 'ativ-1-1',
        titulo: 'Acordar às 6:00h',
        descricao: 'Levantar cedo para aproveitar melhor o dia',
        concluida: false,
        horarioInicio: '06:00',
        duracao: 5,
        tempoEstimado: 5,
        prioridade: Prioridade.ALTA,
        categoria: Categoria.PESSOAL
      },
      {
        id: 'ativ-1-2',
        titulo: 'Beber um copo d\'água',
        descricao: 'Hidratar o corpo logo ao acordar',
        concluida: false,
        horarioInicio: '06:05',
        duracao: 2,
        tempoEstimado: 2,
        prioridade: Prioridade.ALTA,
        categoria: Categoria.SAUDE
      },
      {
        id: 'ativ-1-3',
        titulo: 'Fazer alongamento',
        descricao: '10 minutos de alongamento suave',
        concluida: false,
        horarioInicio: '06:10',
        duracao: 10,
        tempoEstimado: 10,
        prioridade: Prioridade.MEDIA,
        categoria: Categoria.SAUDE
      },
      {
        id: 'ativ-1-4',
        titulo: 'Meditar 15 minutos',
        descricao: 'Momento de mindfulness e tranquilidade',
        concluida: false,
        horarioInicio: '06:20',
        duracao: 15,
        tempoEstimado: 15,
        prioridade: Prioridade.MEDIA,
        categoria: Categoria.PESSOAL
      },
      {
        id: 'ativ-1-5',
        titulo: 'Tomar café da manhã',
        descricao: 'Refeição nutritiva e balanceada',
        concluida: false,
        horarioInicio: '06:35',
        duracao: 20,
        tempoEstimado: 20,
        prioridade: Prioridade.ALTA,
        categoria: Categoria.SAUDE
      }
    ],
    dataInicio: new Date('2024-01-01'),
    cor: '#4ade80',
    ativa: true,
    diasSemana: [DiaSemana.SEGUNDA, DiaSemana.TERCA, DiaSemana.QUARTA, DiaSemana.QUINTA, DiaSemana.SEXTA, DiaSemana.SABADO, DiaSemana.DOMINGO]
  },
  {
    id: 'exemplo-2',
    nome: '💼 Rotina de Trabalho',
    descricao: 'Organização e produtividade no ambiente profissional',
    atividades: [
      {
        id: 'ativ-2-1',
        titulo: 'Revisar agenda do dia',
        descricao: 'Verificar compromissos e prioridades',
        concluida: false,
        horarioInicio: '08:00',
        duracao: 10,
        tempoEstimado: 10,
        prioridade: Prioridade.ALTA,
        categoria: Categoria.TRABALHO
      },
      {
        id: 'ativ-2-2',
        titulo: 'Responder e-mails importantes',
        descricao: 'Tratar comunicações urgentes',
        concluida: false,
        horarioInicio: '08:10',
        duracao: 30,
        tempoEstimado: 30,
        prioridade: Prioridade.ALTA,
        categoria: Categoria.TRABALHO
      },
      {
        id: 'ativ-2-3',
        titulo: 'Trabalhar em projeto principal',
        descricao: 'Foco na tarefa mais importante do dia',
        concluida: false,
        horarioInicio: '09:00',
        duracao: 120,
        tempoEstimado: 120,
        prioridade: Prioridade.ALTA,
        categoria: Categoria.TRABALHO
      }
    ],
    dataInicio: new Date('2024-01-01'),
    cor: '#3b82f6',
    ativa: true,
    diasSemana: [DiaSemana.SEGUNDA, DiaSemana.TERCA, DiaSemana.QUARTA, DiaSemana.QUINTA, DiaSemana.SEXTA]
  }
];

/**
 * Hook personalizado para gerenciar todas as operações com rotinas
 * Centraliza o estado e fornece métodos para manipular rotinas e atividades
 */
export function useRotinas() {
  // Estado das rotinas persistido no localStorage com exemplos iniciais
  const [rotinas, setRotinas] = useLocalStorage<Rotina[]>('rotinas', rotinasExemplo);
  
  // Estado dos filtros ativos
  const [filtros, setFiltros] = useState<Filtros>({
    ordenacao: TipoOrdenacao.NOME,
    direcaoOrdenacao: 'asc',
    modoVisualizacao: ModoVisualizacao.CARDS
  });
  
  // Estado da rotina selecionada
  const [rotinaSelecionada, setRotinaSelecionada] = useState<string | null>(null);

  /**
   * Função para gerar um ID único
   * Usa timestamp + número aleatório para garantir unicidade
   */
  const gerarId = useCallback((): string => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  /**
   * Cria uma nova rotina
   */
  const criarRotina = useCallback((dadosRotina: CriarRotina) => {
    // Converte as atividades de CriarAtividade para Atividade
    const atividades: Atividade[] = dadosRotina.atividades.map(dadosAtividade => ({
      id: gerarId(),
      titulo: dadosAtividade.titulo,
      descricao: dadosAtividade.descricao,
      concluida: false,
      horarioInicio: dadosAtividade.horarioInicio,
      duracao: dadosAtividade.duracao,
      tempoEstimado: dadosAtividade.tempoEstimado || dadosAtividade.duracao, // Compatibilidade
      prioridade: dadosAtividade.prioridade,
      categoria: dadosAtividade.categoria
    }));

    const novaRotina: Rotina = {
      id: gerarId(),
      nome: dadosRotina.nome,
      descricao: dadosRotina.descricao,
      atividades: atividades,
      dataInicio: dadosRotina.dataInicio,
      dataFim: dadosRotina.dataFim,
      cor: dadosRotina.cor,
      ativa: true,
      diasSemana: dadosRotina.diasSemana
    };

    setRotinas(prev => [...prev, novaRotina]);
    return novaRotina.id;
  }, [setRotinas, gerarId]);

  /**
   * Atualiza uma rotina existente
   */
  const atualizarRotina = useCallback((id: string, dadosAtualizados: Partial<Rotina>) => {
    setRotinas(prev => 
      prev.map(rotina => 
        rotina.id === id 
          ? { ...rotina, ...dadosAtualizados }
          : rotina
      )
    );
  }, [setRotinas]);

  /**
   * Remove uma rotina
   */
  const removerRotina = useCallback((id: string) => {
    setRotinas(prev => prev.filter(rotina => rotina.id !== id));
    
    // Se a rotina removida estava selecionada, limpa a seleção
    if (rotinaSelecionada === id) {
      setRotinaSelecionada(null);
    }
  }, [setRotinas, rotinaSelecionada]);

  /**
   * Adiciona uma atividade a uma rotina
   */
  const adicionarAtividade = useCallback((rotinaId: string, dadosAtividade: CriarAtividade) => {
    const novaAtividade: Atividade = {
      id: gerarId(),
      titulo: dadosAtividade.titulo,
      descricao: dadosAtividade.descricao,
      concluida: false,
      horarioInicio: dadosAtividade.horarioInicio,
      duracao: dadosAtividade.duracao,
      tempoEstimado: dadosAtividade.tempoEstimado || dadosAtividade.duracao, // Compatibilidade
      prioridade: dadosAtividade.prioridade,
      categoria: dadosAtividade.categoria
    };

    setRotinas(prev =>
      prev.map(rotina =>
        rotina.id === rotinaId
          ? { ...rotina, atividades: [...rotina.atividades, novaAtividade] }
          : rotina
      )
    );

    return novaAtividade.id;
  }, [setRotinas, gerarId]);

  /**
   * Atualiza uma atividade
   */
  const atualizarAtividade = useCallback((rotinaId: string, atividadeId: string, dadosAtualizados: Partial<Atividade>) => {
    setRotinas(prev =>
      prev.map(rotina =>
        rotina.id === rotinaId
          ? {
              ...rotina,
              atividades: rotina.atividades.map(atividade =>
                atividade.id === atividadeId
                  ? { ...atividade, ...dadosAtualizados }
                  : atividade
              )
            }
          : rotina
      )
    );
  }, [setRotinas]);

  /**
   * Remove uma atividade
   */
  const removerAtividade = useCallback((rotinaId: string, atividadeId: string) => {
    setRotinas(prev =>
      prev.map(rotina =>
        rotina.id === rotinaId
          ? {
              ...rotina,
              atividades: rotina.atividades.filter(atividade => atividade.id !== atividadeId)
            }
          : rotina
      )
    );
  }, [setRotinas]);

  /**
   * Marca/desmarca uma atividade como concluída
   */
  const toggleAtividade = useCallback((rotinaId: string, atividadeId: string) => {
    setRotinas(prev =>
      prev.map(rotina =>
        rotina.id === rotinaId
          ? {
              ...rotina,
              atividades: rotina.atividades.map(atividade =>
                atividade.id === atividadeId
                  ? { ...atividade, concluida: !atividade.concluida }
                  : atividade
              )
            }
          : rotina
      )
    );
  }, [setRotinas]);

  /**
   * Rotinas filtradas e ordenadas baseadas nos filtros ativos
   */
  const rotinasFiltradas = useMemo(() => {
    let rotinasProcessadas = rotinas.filter(rotina => {
      // Filtro por texto (busca no nome e descrição)
      if (filtros.texto) {
        const texto = filtros.texto.toLowerCase();
        const matchNome = rotina.nome.toLowerCase().includes(texto);
        const matchDescricao = rotina.descricao?.toLowerCase().includes(texto) || false;
        const matchAtividades = rotina.atividades.some(atividade => 
          atividade.titulo.toLowerCase().includes(texto)
        );
        
        if (!matchNome && !matchDescricao && !matchAtividades) {
          return false;
        }
      }

      // Filtro por status ativo
      if (filtros.ativa !== undefined && rotina.ativa !== filtros.ativa) {
        return false;
      }

      // Filtros baseados nas atividades
      if (filtros.categoria || filtros.prioridade || filtros.concluida !== undefined) {
        const temAtividadeComFiltro = rotina.atividades.some(atividade => {
          if (filtros.categoria && atividade.categoria !== filtros.categoria) {
            return false;
          }
          if (filtros.prioridade && atividade.prioridade !== filtros.prioridade) {
            return false;
          }
          if (filtros.concluida !== undefined && atividade.concluida !== filtros.concluida) {
            return false;
          }
          return true;
        });

        if (!temAtividadeComFiltro) {
          return false;
        }
      }

      return true;
    });

    // Aplicar ordenação
    const ordenacao = filtros.ordenacao || TipoOrdenacao.NOME;
    const direcao = filtros.direcaoOrdenacao || 'asc';

    rotinasProcessadas.sort((a, b) => {
      let resultado = 0;

      switch (ordenacao) {
        case TipoOrdenacao.NOME:
          resultado = a.nome.localeCompare(b.nome);
          break;
        
        case TipoOrdenacao.DATA_CRIACAO:
          const dataA = a.dataInicio || new Date(0);
          const dataB = b.dataInicio || new Date(0);
          resultado = dataA.getTime() - dataB.getTime();
          break;
        
        case TipoOrdenacao.PROGRESSO:
          const progressoA = a.atividades.length > 0 
            ? (a.atividades.filter(ativ => ativ.concluida).length / a.atividades.length) * 100 
            : 0;
          const progressoB = b.atividades.length > 0 
            ? (b.atividades.filter(ativ => ativ.concluida).length / b.atividades.length) * 100 
            : 0;
          resultado = progressoA - progressoB;
          break;
        
        case TipoOrdenacao.CATEGORIA:
          // Pega a primeira categoria das atividades para ordenação
          const catA = a.atividades[0]?.categoria || '';
          const catB = b.atividades[0]?.categoria || '';
          resultado = catA.localeCompare(catB);
          break;
        
        case TipoOrdenacao.TOTAL_ATIVIDADES:
          resultado = a.atividades.length - b.atividades.length;
          break;
        
        default:
          resultado = 0;
      }

      return direcao === 'asc' ? resultado : -resultado;
    });

    return rotinasProcessadas;
  }, [rotinas, filtros]);

  /**
   * Estatísticas calculadas
   */
  const estatisticas = useMemo((): Estatisticas => {
    const totalRotinas = rotinas.length;
    const rotinasAtivas = rotinas.filter(r => r.ativa).length;
    
    const todasAtividades = rotinas.flatMap(r => r.atividades);
    const totalAtividades = todasAtividades.length;
    const atividadesConcluidas = todasAtividades.filter(a => a.concluida).length;
    
    const tempoTotalEstimado = todasAtividades.reduce((total, atividade) => 
      total + (atividade.tempoEstimado || 0), 0
    );
    
    const tempoTotalConcluido = todasAtividades
      .filter(a => a.concluida)
      .reduce((total, atividade) => total + (atividade.tempoEstimado || 0), 0);
    
    const percentualConclusao = totalAtividades > 0 
      ? Math.round((atividadesConcluidas / totalAtividades) * 100)
      : 0;

    return {
      totalRotinas,
      rotinasAtivas,
      totalAtividades,
      atividadesConcluidas,
      tempoTotalEstimado,
      tempoTotalConcluido,
      percentualConclusao
    };
  }, [rotinas]);

  /**
   * Busca uma rotina por ID
   */
  const buscarRotina = useCallback((id: string): Rotina | undefined => {
    return rotinas.find(rotina => rotina.id === id);
  }, [rotinas]);

  /**
   * Busca uma atividade por ID dentro de uma rotina
   */
  const buscarAtividade = useCallback((rotinaId: string, atividadeId: string): Atividade | undefined => {
    const rotina = buscarRotina(rotinaId);
    return rotina?.atividades.find(atividade => atividade.id === atividadeId);
  }, [buscarRotina]);

  return {
    // Estado
    rotinas,
    rotinasFiltradas,
    filtros,
    rotinaSelecionada,
    estatisticas,
    
    // Ações de rotinas
    criarRotina,
    atualizarRotina,
    removerRotina,
    
    // Ações de atividades
    adicionarAtividade,
    atualizarAtividade,
    removerAtividade,
    toggleAtividade,
    
    // Seleção e filtros
    setRotinaSelecionada,
    setFiltros,
    
    // Utilitários
    buscarRotina,
    buscarAtividade
  };
}
