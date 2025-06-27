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
 * Enum para definir os tipos de ordenação das rotinas
 * Permite organizar a exibição das rotinas de diferentes formas
 */
export enum TipoOrdenacao {
  NOME = 'nome',
  DATA_CRIACAO = 'dataCriacao',
  PROGRESSO = 'progresso',
  CATEGORIA = 'categoria',
  TOTAL_ATIVIDADES = 'totalAtividades'
}

/**
 * Enum para definir os modos de visualização das rotinas
 * Permite alternar entre exibição em cards e lista
 */
export enum ModoVisualizacao {
  CARDS = 'cards',
  LISTA = 'lista'
}

/**
 * Enum para definir os dias da semana
 * Facilita o controle de quando uma rotina deve ser executada
 */
export enum DiaSemana {
  DOMINGO = 0,
  SEGUNDA = 1,
  TERCA = 2,
  QUARTA = 3,
  QUINTA = 4,
  SEXTA = 5,
  SABADO = 6
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
  diasSemana: DiaSemana[];       // Dias da semana em que a rotina se aplica
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
  diasSemana: DiaSemana[];       // Dias da semana em que a rotina se aplica
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
  ordenacao?: TipoOrdenacao;     // Tipo de ordenação das rotinas
  direcaoOrdenacao?: 'asc' | 'desc'; // Direção da ordenação
  modoVisualizacao?: ModoVisualizacao; // Modo de exibição (cards ou lista)
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
