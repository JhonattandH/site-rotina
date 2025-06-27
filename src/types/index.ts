// types/index.ts - Definições de tipos TypeScript
// Este arquivo centraliza todos os tipos usados na aplicação

/**
 * Enum para definir as prioridades das atividades
 * Facilita a manutenção e garante consistência
 */
export enum Prioridade {
  BAIXA = 'baixa',
  MEDIA = 'media',
  ALTA = 'alta'
}

/**
 * Enum para definir as categorias das atividades
 * Permite organizar as rotinas por tipo
 */
export enum Categoria {
  TRABALHO = 'trabalho',
  PESSOAL = 'pessoal',
  SAUDE = 'saude',
  ESTUDO = 'estudo',
  LAZER = 'lazer'
}

/**
 * Interface que define a estrutura de uma Atividade
 * Representa uma tarefa individual dentro de uma rotina
 */
export interface Atividade {
  id: string;                    // Identificador único da atividade
  titulo: string;                // Nome da atividade
  descricao?: string;            // Descrição opcional detalhada
  concluida: boolean;            // Status de conclusão
  horarioInicio: string;         // Horário de início (formato HH:mm)
  duracao: number;               // Duração em minutos
  tempoEstimado?: number;        // Tempo estimado em minutos (deprecated - usar duracao)
  prioridade: Prioridade;        // Nível de prioridade
  categoria: Categoria;          // Categoria da atividade
}

/**
 * Interface que define a estrutura de uma Rotina
 * Uma rotina é um conjunto de atividades agrupadas
 */
export interface Rotina {
  id: string;                    // Identificador único da rotina
  nome: string;                  // Nome da rotina
  descricao?: string;            // Descrição opcional
  atividades: Atividade[];       // Lista de atividades da rotina
  dataInicio?: Date;             // Data de início da rotina
  dataFim?: Date;                // Data de término da rotina
  cor: string;                   // Cor para identificação visual
  ativa: boolean;                // Se a rotina está ativa
}

/**
 * Interface para formulário de criação de atividade
 * Remove campos que são gerados automaticamente
 */
export interface CriarAtividade {
  titulo: string;
  descricao?: string;
  horarioInicio: string;         // Horário de início (formato HH:mm)
  duracao: number;               // Duração em minutos
  tempoEstimado?: number;        // Mantido para compatibilidade
  prioridade: Prioridade;
  categoria: Categoria;
}

/**
 * Interface para formulário de criação de rotina
 * Remove campos que são gerados automaticamente
 */
export interface CriarRotina {
  nome: string;
  descricao?: string;
  atividades: CriarAtividade[];
  dataInicio?: Date;
  dataFim?: Date;
  cor: string;
}

/**
 * Interface para filtros de pesquisa
 * Permite filtrar rotinas e atividades
 */
export interface Filtros {
  categoria?: Categoria;
  prioridade?: Prioridade;
  concluida?: boolean;
  ativa?: boolean;
  texto?: string;                // Busca por texto livre
}

/**
 * Interface para estatísticas do usuário
 * Mostra progresso e métricas
 */
export interface Estatisticas {
  totalRotinas: number;
  rotinasAtivas: number;
  totalAtividades: number;
  atividadesConcluidas: number;
  tempoTotalEstimado: number;
  tempoTotalConcluido: number;
  percentualConclusao: number;
}
