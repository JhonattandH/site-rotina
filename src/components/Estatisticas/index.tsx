import React, { useMemo } from 'react';
import { Rotina, Categoria, Prioridade, DiaSemana } from '../../types';
import {
  Container,
  Header,
  Title as StyledTitle,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  ChartsGrid,
  ChartCard,
  ChartTitle,
  ChartContainer,
  BarChart,
  Bar,
  Legend,
  LegendItem,
  LegendColor,
  LegendLabel,
  EmptyState,
  CompactMetricsList,
  CompactMetricItem,
  CompactMetricHeader,
  CompactMetricName,
  CompactMetricValue,
  CompactProgressBar,
  CompactProgressFill
} from './styles';

interface EstatisticasProps {
  rotinas: Rotina[];
}

export const Estatisticas: React.FC<EstatisticasProps> = ({ rotinas }) => {
  // Dados calculados para os gráficos
  const dadosEstatisticas = useMemo(() => {
    // Estatísticas gerais
    const totalRotinas = rotinas.length;
    const rotinasAtivas = rotinas.filter(r => r.ativa).length;
    const todasAtividades = rotinas.flatMap(r => r.atividades);
    const totalAtividades = todasAtividades.length;
    const atividadesConcluidas = todasAtividades.filter(a => a.concluida).length;
    const percentualConclusao = totalAtividades > 0 ? Math.round((atividadesConcluidas / totalAtividades) * 100) : 0;

    // Atividades por categoria
    const atividadesPorCategoria = Object.values(Categoria).reduce((acc, categoria) => {
      acc[categoria] = todasAtividades.filter(a => a.categoria === categoria).length;
      return acc;
    }, {} as Record<Categoria, number>);

    // Atividades por prioridade
    const atividadesPorPrioridade = Object.values(Prioridade).reduce((acc, prioridade) => {
      acc[prioridade] = todasAtividades.filter(a => a.prioridade === prioridade).length;
      return acc;
    }, {} as Record<Prioridade, number>);

    // Distribuição de horários (por período do dia)
    const periodos = {
      'Madrugada (00h-05h)': 0,
      'Manhã (06h-11h)': 0,
      'Tarde (12h-17h)': 0,
      'Noite (18h-23h)': 0
    };

    todasAtividades.forEach(atividade => {
      const hora = parseInt(atividade.horarioInicio.split(':')[0]);
      if (hora >= 0 && hora <= 5) periodos['Madrugada (00h-05h)']++;
      else if (hora >= 6 && hora <= 11) periodos['Manhã (06h-11h)']++;
      else if (hora >= 12 && hora <= 17) periodos['Tarde (12h-17h)']++;
      else if (hora >= 18 && hora <= 23) periodos['Noite (18h-23h)']++;
    });

    // Rotinas por dia da semana
    const rotinasPorDia: Record<string, number> = {
      'Dom': 0,
      'Seg': 0,
      'Ter': 0,
      'Qua': 0,
      'Qui': 0,
      'Sex': 0,
      'Sáb': 0
    };

    rotinas.forEach(rotina => {
      rotina.diasSemana.forEach(dia => {
        switch (dia) {
          case DiaSemana.DOMINGO: rotinasPorDia['Dom']++; break;
          case DiaSemana.SEGUNDA: rotinasPorDia['Seg']++; break;
          case DiaSemana.TERCA: rotinasPorDia['Ter']++; break;
          case DiaSemana.QUARTA: rotinasPorDia['Qua']++; break;
          case DiaSemana.QUINTA: rotinasPorDia['Qui']++; break;
          case DiaSemana.SEXTA: rotinasPorDia['Sex']++; break;
          case DiaSemana.SABADO: rotinasPorDia['Sáb']++; break;
        }
      });
    });

    // Taxa de conclusão por categoria
    const conclusaoPorCategoria = Object.values(Categoria).reduce((acc, categoria) => {
      const atividadesDaCategoria = todasAtividades.filter(a => a.categoria === categoria);
      const concluidasDaCategoria = atividadesDaCategoria.filter(a => a.concluida).length;
      acc[categoria] = atividadesDaCategoria.length > 0 
        ? Math.round((concluidasDaCategoria / atividadesDaCategoria.length) * 100) 
        : 0;
      return acc;
    }, {} as Record<Categoria, number>);

    // Tempo médio por atividade
    const tempoTotal = todasAtividades.reduce((total, atividade) => total + (atividade.duracao || 0), 0);
    const tempoMedio = totalAtividades > 0 ? Math.round(tempoTotal / totalAtividades) : 0;

    return {
      totalRotinas,
      rotinasAtivas,
      totalAtividades,
      atividadesConcluidas,
      percentualConclusao,
      atividadesPorCategoria,
      atividadesPorPrioridade,
      periodos,
      rotinasPorDia,
      conclusaoPorCategoria,
      tempoMedio,
      tempoTotal
    };
  }, [rotinas]);

  // Cores para os gráficos
  const coresCategorias = {
    [Categoria.TRABALHO]: '#3b82f6',
    [Categoria.PESSOAL]: '#10b981',
    [Categoria.SAUDE]: '#ef4444',
    [Categoria.ESTUDO]: '#f59e0b',
    [Categoria.LAZER]: '#8b5cf6'
  };

  const coresPrioridades = {
    [Prioridade.ALTA]: '#ef4444',
    [Prioridade.MEDIA]: '#f59e0b',
    [Prioridade.BAIXA]: '#10b981'
  };

  const nomesCategorias = {
    [Categoria.TRABALHO]: 'Trabalho',
    [Categoria.PESSOAL]: 'Pessoal',
    [Categoria.SAUDE]: 'Saúde',
    [Categoria.ESTUDO]: 'Estudo',
    [Categoria.LAZER]: 'Lazer'
  };

  const nomesPrioridades = {
    [Prioridade.ALTA]: 'Alta',
    [Prioridade.MEDIA]: 'Média',
    [Prioridade.BAIXA]: 'Baixa'
  };

  if (rotinas.length === 0) {
    return (
      <Container>
        <Header>
          <StyledTitle>Estatísticas</StyledTitle>
        </Header>
        <EmptyState>
          <h3>Nenhuma estatística disponível</h3>
          <p>Crie suas primeiras rotinas para visualizar estatísticas detalhadas sobre suas atividades.</p>
        </EmptyState>
      </Container>
    );
  }

  const maxRotinasPorDia = Math.max(...Object.values(dadosEstatisticas.rotinasPorDia));
  const maxAtividadesPorCategoria = Math.max(...Object.values(dadosEstatisticas.atividadesPorCategoria));

  return (
    <Container>
      <Header>
        <StyledTitle>Estatísticas</StyledTitle>
      </Header>

      {/* Cards de estatísticas resumidas */}
      <StatsGrid>
        <StatCard>
          <StatValue>{dadosEstatisticas.totalRotinas}</StatValue>
          <StatLabel>Total de Rotinas</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatValue>{dadosEstatisticas.rotinasAtivas}</StatValue>
          <StatLabel>Rotinas Ativas</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatValue>{dadosEstatisticas.totalAtividades}</StatValue>
          <StatLabel>Total de Atividades</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatValue>{dadosEstatisticas.percentualConclusao}%</StatValue>
          <StatLabel>Taxa de Conclusão</StatLabel>
        </StatCard>

        <StatCard>
          <StatValue>{dadosEstatisticas.tempoMedio}min</StatValue>
          <StatLabel>Tempo Médio por Atividade</StatLabel>
        </StatCard>

        <StatCard>
          <StatValue>{Math.round(dadosEstatisticas.tempoTotal / 60)}h</StatValue>
          <StatLabel>Tempo Total de Atividades</StatLabel>
        </StatCard>
      </StatsGrid>

      {/* Grid de gráficos */}
      <ChartsGrid>
        {/* Atividades por Categoria */}
        <ChartCard>
          <ChartTitle>Atividades por Categoria</ChartTitle>
          <ChartContainer>
            <BarChart>
              {Object.entries(dadosEstatisticas.atividadesPorCategoria).map(([categoria, quantidade]) => (
                <Bar 
                  key={categoria}
                  height={maxAtividadesPorCategoria > 0 ? (quantidade / maxAtividadesPorCategoria) * 100 : 0}
                  color={coresCategorias[categoria as Categoria]}
                  title={`${nomesCategorias[categoria as Categoria]}: ${quantidade}`}
                />
              ))}
            </BarChart>
            <Legend>
              {Object.entries(dadosEstatisticas.atividadesPorCategoria).map(([categoria, quantidade]) => (
                <LegendItem key={categoria}>
                  <LegendColor color={coresCategorias[categoria as Categoria]} />
                  <LegendLabel>{nomesCategorias[categoria as Categoria]} ({quantidade})</LegendLabel>
                </LegendItem>
              ))}
            </Legend>
          </ChartContainer>
        </ChartCard>

        {/* Atividades por Prioridade */}
        <ChartCard>
          <ChartTitle>Atividades por Prioridade</ChartTitle>
          <ChartContainer>
            <BarChart>
              {Object.entries(dadosEstatisticas.atividadesPorPrioridade).map(([prioridade, quantidade]) => (
                <Bar 
                  key={prioridade}
                  height={maxAtividadesPorCategoria > 0 ? (quantidade / maxAtividadesPorCategoria) * 100 : 0}
                  color={coresPrioridades[prioridade as Prioridade]}
                  title={`${nomesPrioridades[prioridade as Prioridade]}: ${quantidade}`}
                />
              ))}
            </BarChart>
            <Legend>
              {Object.entries(dadosEstatisticas.atividadesPorPrioridade).map(([prioridade, quantidade]) => (
                <LegendItem key={prioridade}>
                  <LegendColor color={coresPrioridades[prioridade as Prioridade]} />
                  <LegendLabel>{nomesPrioridades[prioridade as Prioridade]} ({quantidade})</LegendLabel>
                </LegendItem>
              ))}
            </Legend>
          </ChartContainer>
        </ChartCard>

        {/* Distribuição de Horários */}
        <ChartCard>
          <ChartTitle>Atividades por Período do Dia</ChartTitle>
          <ChartContainer>
            <CompactMetricsList>
              {Object.entries(dadosEstatisticas.periodos).map(([periodo, quantidade]) => (
                <CompactMetricItem key={periodo}>
                  <CompactMetricHeader>
                    <CompactMetricName>{periodo}</CompactMetricName>
                    <CompactMetricValue>{quantidade}</CompactMetricValue>
                  </CompactMetricHeader>
                  <CompactProgressBar>
                    <CompactProgressFill 
                      width={dadosEstatisticas.totalAtividades > 0 ? (quantidade / dadosEstatisticas.totalAtividades) * 100 : 0}
                    />
                  </CompactProgressBar>
                </CompactMetricItem>
              ))}
            </CompactMetricsList>
          </ChartContainer>
        </ChartCard>

        {/* Rotinas por Dia da Semana */}
        <ChartCard>
          <ChartTitle>Rotinas por Dia da Semana</ChartTitle>
          <ChartContainer>
            <BarChart>
              {Object.entries(dadosEstatisticas.rotinasPorDia).map(([dia, quantidade]) => (
                <Bar 
                  key={dia}
                  height={maxRotinasPorDia > 0 ? (quantidade / maxRotinasPorDia) * 100 : 0}
                  color="#10b981"
                  title={`${dia}: ${quantidade}`}
                />
              ))}
            </BarChart>
            <Legend>
              {Object.entries(dadosEstatisticas.rotinasPorDia).map(([dia, quantidade]) => (
                <LegendItem key={dia}>
                  <LegendColor color="#10b981" />
                  <LegendLabel>{dia} ({quantidade})</LegendLabel>
                </LegendItem>
              ))}
            </Legend>
          </ChartContainer>
        </ChartCard>

        {/* Taxa de Conclusão por Categoria */}
        <ChartCard>
          <ChartTitle>Taxa de Conclusão por Categoria</ChartTitle>
          <ChartContainer>
            <CompactMetricsList>
              {Object.entries(dadosEstatisticas.conclusaoPorCategoria).map(([categoria, taxa]) => (
                <CompactMetricItem key={categoria}>
                  <CompactMetricHeader>
                    <CompactMetricName>{nomesCategorias[categoria as Categoria]}</CompactMetricName>
                    <CompactMetricValue>{taxa}%</CompactMetricValue>
                  </CompactMetricHeader>
                  <CompactProgressBar>
                    <CompactProgressFill width={taxa} color={coresCategorias[categoria as Categoria]} />
                  </CompactProgressBar>
                </CompactMetricItem>
              ))}
            </CompactMetricsList>
          </ChartContainer>
        </ChartCard>
      </ChartsGrid>
    </Container>
  );
};
