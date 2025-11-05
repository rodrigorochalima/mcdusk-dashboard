import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatPercentage } from '../../lib/formatters';
import { patrimonyHistory } from '../../data/portfolioData-updated';

/**
 * Componente para exibir o gráfico de performance de um ativo específico
 * Versão aprimorada para corrigir problemas de sobreposição e eixos cronológicos
 * @param {Object} props - Propriedades do componente
 * @param {string} props.symbol - Símbolo do ativo
 * @param {string} props.timeRange - Intervalo de tempo ('1m', '6m', '1y', 'all')
 * @param {boolean} props.isFII - Indica se o ativo é um fundo imobiliário
 * @param {string} props.assetType - Tipo do ativo ('fii', 'stock', 'bdr', 'etf', 'fixed_income', 'crypto', 'other')
 */
const AssetPerformanceChart = ({ symbol, timeRange, isFII, assetType = 'stock' }) => {
  const [chartData, setChartData] = useState([]);
  
  useEffect(() => {
    // Gerar dados históricos para o ativo
    // Em uma implementação real, esses dados viriam de uma API
    const generateAssetData = () => {
      // Data atual - forçando para outubro de 2025
      const now = new Date(2025, 9, 6); // 6 de outubro de 2025
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();
      
      // Determinar o número de meses a serem exibidos com base no timeRange
      let monthsToShow = 12; // Padrão: 1 ano
      
      switch (timeRange) {
        case '1m':
          monthsToShow = 1;
          break;
        case '6m':
          monthsToShow = 6;
          break;
        case '1y':
          monthsToShow = 12;
          break;
        case 'all':
          monthsToShow = 24; // Simulando 2 anos como "desde o início"
          break;
        default:
          monthsToShow = 12;
      }
      
      // Gerar dados para cada mês
      const data = [];
      
      // Meses em português para ordenação correta
      const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      
      for (let i = 0; i < monthsToShow; i++) {
        const date = new Date(currentYear, currentMonth - (monthsToShow - 1) + i);
        const monthIndex = date.getMonth();
        const month = monthNames[monthIndex];
        const year = date.getFullYear();
        const monthLabel = `${month}/${year.toString().slice(2)}`;
        
        // Usar dados reais do patrimonyHistory quando disponíveis
        const historyIndex = patrimonyHistory.length - monthsToShow + i;
        const historyData = historyIndex >= 0 && historyIndex < patrimonyHistory.length 
          ? patrimonyHistory[historyIndex] 
          : null;
        
        // Gerar variação percentual para o ativo baseada no símbolo e tipo
        // Usar uma função determinística para que o mesmo ativo sempre tenha o mesmo padrão
        const seed = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        
        // Ajustar volatilidade com base no tipo de ativo
        let volatilityFactor;
        switch (assetType) {
          case 'crypto':
            volatilityFactor = (seed % 10) + 5; // Alta volatilidade para criptomoedas
            break;
          case 'stock':
            volatilityFactor = (seed % 5) + 2; // Volatilidade média para ações
            break;
          case 'bdr':
            volatilityFactor = (seed % 4) + 2; // Volatilidade média para BDRs
            break;
          case 'fii':
            volatilityFactor = (seed % 3) + 1; // Volatilidade menor para FIIs
            break;
          case 'etf':
            volatilityFactor = (seed % 3) + 1; // Volatilidade menor para ETFs
            break;
          case 'fixed_income':
            volatilityFactor = (seed % 1) + 0.5; // Baixa volatilidade para renda fixa
            break;
          default:
            volatilityFactor = (seed % 5) + 1;
        }
        
        const baseValue = historyData ? historyData.valuePercent * 0.8 : 0;
        const monthlyChange = historyData 
          ? baseValue + ((Math.sin(i / 2) * volatilityFactor) * 0.5)
          : (Math.sin(i / 2) * volatilityFactor) + (i * 0.5);
        
        // Obter valores dos índices
        const portfolioValue = historyData ? historyData.valuePercent : (i * 1.2);
        const ibovValue = historyData ? historyData.ibov : (i * 0.8);
        const itfaValue = historyData ? historyData.iafd : (i * 0.9);
        const cdiValue = historyData ? historyData.cdi : (i * 0.6);
        const fiiValue = historyData ? historyData.fii : (i * 0.7);
        const cryptoValue = historyData ? (historyData.valuePercent * 1.5) : (i * 2);
        
        // Gerar variações diárias para mostrar volatilidade (simulação)
        const dailyVariations = [];
        if (timeRange === '1m') {
          // Apenas para visualização de 1 mês, gerar dados diários
          const daysInMonth = 30;
          for (let day = 1; day <= daysInMonth; day++) {
            // Usar uma função determinística baseada no dia e no símbolo
            const dailySeed = seed + day;
            const dailyVolatility = (dailySeed % 5) / 10; // Volatilidade diária entre 0 e 0.5%
            
            // Gerar valor diário com alguma correlação ao valor mensal
            const baseDaily = baseValue + monthlyChange * (day / daysInMonth);
            const dailyValue = baseDaily + (Math.sin(dailySeed) * dailyVolatility);
            
            dailyVariations.push({
              day,
              value: dailyValue
            });
          }
        }
        
        // Criar ponto de dados base
        const dataPoint = {
          month: monthLabel, // Usar formato consistente Mês/Ano
          monthIndex: monthIndex, // Armazenar índice do mês para ordenação
          year: year, // Armazenar ano para ordenação
          asset: baseValue + monthlyChange,
          portfolio: portfolioValue,
          dailyVariations: dailyVariations // Adicionar variações diárias
        };
        
        // Adicionar índices de referência com base no tipo de ativo
        switch (assetType) {
          case 'stock':
            dataPoint.ibov = ibovValue;
            dataPoint.cdi = cdiValue;
            break;
          case 'bdr':
            dataPoint.sp500 = ibovValue * 1.1; // Simulando S&P 500
            dataPoint.cdi = cdiValue;
            break;
          case 'fii':
            dataPoint.ifix = fiiValue;
            dataPoint.cdi = cdiValue;
            break;
          case 'etf':
            dataPoint.ibov = ibovValue;
            dataPoint.cdi = cdiValue;
            break;
          case 'fixed_income':
            dataPoint.cdi = cdiValue;
            dataPoint.ipca = cdiValue * 0.8; // Simulando IPCA
            break;
          case 'crypto':
            dataPoint.bitcoin = cryptoValue;
            dataPoint.cdi = cdiValue;
            break;
          default:
            dataPoint.ibov = ibovValue;
            dataPoint.cdi = cdiValue;
        }
        
        data.push(dataPoint);
      }
      
      // Ordenar os dados cronologicamente
      return data.sort((a, b) => {
        if (a.year !== b.year) {
          return a.year - b.year;
        }
        return a.monthIndex - b.monthIndex;
      });
    };
    
    setChartData(generateAssetData());
  }, [symbol, timeRange, isFII, assetType]);

  // Formatar o tooltip com informações mais detalhadas
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {entry.name}: {formatPercentage(entry.value)}
            </p>
          ))}
          {timeRange === '1m' && payload[0]?.payload?.dailyVariations && (
            <div className="tooltip-daily">
              <p>Variação diária disponível</p>
            </div>
          )}
        </div>
      );
    }
    return null;
  };
  
  // Determinar quais linhas mostrar com base no tipo de ativo
  const renderLines = () => {
    // Linha do ativo e da carteira sempre são mostradas
    const lines = [
      <Line 
        key="asset"
        type="monotone" 
        dataKey="asset" 
        name={symbol} 
        stroke="#4285f4" 
        strokeWidth={2}
        dot={{ r: 4 }}
        activeDot={{ r: 6 }}
        isAnimationActive={false} // Desativar animação para melhor performance
      />,
      <Line 
        key="portfolio"
        type="monotone" 
        dataKey="portfolio" 
        name="Carteira" 
        stroke="#34a853" 
        strokeWidth={1.5}
        dot={{ r: 3 }}
        activeDot={{ r: 5 }}
        isAnimationActive={false} // Desativar animação para melhor performance
      />
    ];
    
    // Adicionar linhas específicas com base no tipo de ativo
    switch (assetType) {
      case 'stock':
        lines.push(
          <Line 
            key="ibov"
            type="monotone" 
            dataKey="ibov" 
            name="IBOV" 
            stroke="#fbbc05" 
            strokeWidth={1.5}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            isAnimationActive={false}
          />
        );
        break;
      case 'bdr':
        lines.push(
          <Line 
            key="sp500"
            type="monotone" 
            dataKey="sp500" 
            name="S&P 500" 
            stroke="#ea4335" 
            strokeWidth={1.5}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            isAnimationActive={false}
          />
        );
        break;
      case 'fii':
        lines.push(
          <Line 
            key="ifix"
            type="monotone" 
            dataKey="ifix" 
            name="IFIX" 
            stroke="#9c27b0" 
            strokeWidth={1.5}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            isAnimationActive={false}
          />
        );
        break;
      case 'etf':
        lines.push(
          <Line 
            key="ibov"
            type="monotone" 
            dataKey="ibov" 
            name="IBOV" 
            stroke="#fbbc05" 
            strokeWidth={1.5}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            isAnimationActive={false}
          />
        );
        break;
      case 'fixed_income':
        lines.push(
          <Line 
            key="ipca"
            type="monotone" 
            dataKey="ipca" 
            name="IPCA" 
            stroke="#ff9800" 
            strokeWidth={1.5}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            isAnimationActive={false}
          />
        );
        break;
      case 'crypto':
        lines.push(
          <Line 
            key="bitcoin"
            type="monotone" 
            dataKey="bitcoin" 
            name="Bitcoin" 
            stroke="#f57c00" 
            strokeWidth={1.5}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            isAnimationActive={false}
          />
        );
        break;
      default:
        // Não adicionar linhas extras
    }
    
    // CDI é mostrado para todos os tipos de ativos
    lines.push(
      <Line 
        key="cdi"
        type="monotone" 
        dataKey="cdi" 
        name="CDI" 
        stroke="#607d8b" 
        strokeWidth={1.5}
        dot={{ r: 3 }}
        activeDot={{ r: 5 }}
        isAnimationActive={false}
      />
    );
    
    return lines;
  };

  return (
    <div className="asset-performance-chart">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart 
          data={chartData}
          margin={{ top: 10, right: 30, left: 10, bottom: 10 }} // Ajustar margens para evitar sobreposição
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="month" 
            padding={{ left: 10, right: 10 }}
            tick={{ fontSize: 12 }} // Reduzir tamanho da fonte para evitar sobreposição
            tickMargin={10} // Aumentar margem dos ticks para evitar sobreposição
            interval={0} // Mostrar todos os meses
          />
          <YAxis 
            tickFormatter={(value) => `${value.toFixed(1)}%`}
            tick={{ fontSize: 12 }} // Reduzir tamanho da fonte
            width={50} // Aumentar largura do eixo Y para acomodar valores
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: 10 }} />
          {renderLines()}
        </LineChart>
      </ResponsiveContainer>
      
      {/* Exibir gráfico de variação diária quando timeRange for '1m' */}
      {timeRange === '1m' && chartData.length > 0 && chartData[0].dailyVariations && (
        <div className="daily-variations-chart">
          <h4>Variação Diária - {chartData[0].month}</h4>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart 
              data={chartData[0].dailyVariations}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: 10 }}
              />
              <YAxis 
                tickFormatter={(value) => `${value.toFixed(1)}%`}
                tick={{ fontSize: 10 }}
                width={40}
              />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                name={`${symbol} (diário)`} 
                stroke="#4285f4" 
                dot={{ r: 2 }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default AssetPerformanceChart;
