import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar os componentes necessários do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

/**
 * Componente de gráfico para comparação de ativos
 * Baseado no design do Kinvo conforme solicitado pelo usuário
 */
const ComparadorAtivosChart = ({ 
  ativo = 'WEGE3',
  periodo = 'all',
  indices = ['CDI', 'IBOV', 'IPCA']
}) => {
  // Estado para armazenar os dados do gráfico
  const [chartData, setChartData] = useState(null);
  const [rentabilidades, setRentabilidades] = useState({
    carteira: 0,
    ativo: 0,
    indices: {}
  });
  
  // Cores para as linhas do gráfico (seguindo o padrão do Kinvo)
  const colors = {
    carteira: '#00c3ff', // Azul claro
    ativo: '#4caf50',    // Verde
    CDI: '#f1c40f',      // Amarelo
    IBOV: '#27ae60',     // Verde escuro
    IPCA: '#3498db',     // Azul
    IFIX: '#9b59b6',     // Roxo
    POUPANCA: '#e67e22'  // Laranja
  };
  
  // Função para gerar dados simulados para o gráfico
  const gerarDadosSimulados = () => {
    // Definir o período com base na seleção
    let meses = 12;
    switch (periodo) {
      case '1m': meses = 1; break;
      case '6m': meses = 6; break;
      case '1y': meses = 12; break;
      case 'all': meses = 36; break;
      default: meses = 12;
    }
    
    // Gerar datas para o eixo X
    const datas = [];
    const dataAtual = new Date(2025, 9, 6); // 6 de outubro de 2025
    
    for (let i = meses; i >= 0; i--) {
      const data = new Date(dataAtual);
      data.setMonth(data.getMonth() - i);
      datas.push(data.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' }));
    }
    
    // Gerar valores para cada linha
    const gerarLinha = (volatilidade, tendencia) => {
      let valor = 100;
      const valores = [valor];
      
      for (let i = 1; i <= meses; i++) {
        // Simular variação com base na volatilidade e tendência
        const variacao = (Math.random() - 0.5) * volatilidade + tendencia;
        valor = valor * (1 + variacao / 100);
        valores.push(parseFloat(valor.toFixed(2)));
      }
      
      return valores;
    };
    
    // Gerar dados para cada linha
    const dadosCarteira = gerarLinha(3, 1.2); // Carteira com volatilidade média e tendência positiva
    const dadosAtivo = gerarLinha(5, 0.8);    // Ativo com alta volatilidade e tendência positiva menor
    
    // Gerar dados para os índices selecionados
    const dadosIndices = {};
    indices.forEach(indice => {
      switch (indice) {
        case 'CDI':
          dadosIndices[indice] = gerarLinha(0.5, 0.8); // Baixa volatilidade, tendência positiva estável
          break;
        case 'IBOV':
          dadosIndices[indice] = gerarLinha(4, 0.3); // Alta volatilidade, tendência levemente positiva
          break;
        case 'IPCA':
          dadosIndices[indice] = gerarLinha(0.8, 0.5); // Baixa volatilidade, tendência positiva baixa
          break;
        case 'IFIX':
          dadosIndices[indice] = gerarLinha(2.5, 0.7); // Média volatilidade, tendência positiva média
          break;
        case 'POUPANCA':
          dadosIndices[indice] = gerarLinha(0.1, 0.4); // Volatilidade mínima, tendência positiva baixa
          break;
        default:
          dadosIndices[indice] = gerarLinha(1, 0.5);
      }
    });
    
    // Calcular rentabilidades (último valor - primeiro valor)
    const rentCarteira = ((dadosCarteira[dadosCarteira.length - 1] / dadosCarteira[0]) - 1) * 100;
    const rentAtivo = ((dadosAtivo[dadosAtivo.length - 1] / dadosAtivo[0]) - 1) * 100;
    
    const rentIndices = {};
    indices.forEach(indice => {
      const dados = dadosIndices[indice];
      rentIndices[indice] = ((dados[dados.length - 1] / dados[0]) - 1) * 100;
    });
    
    setRentabilidades({
      carteira: rentCarteira,
      ativo: rentAtivo,
      indices: rentIndices
    });
    
    // Construir o objeto de dados para o Chart.js
    const datasets = [
      {
        label: 'Carteira',
        data: dadosCarteira,
        borderColor: colors.carteira,
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        tension: 0.1
      },
      {
        label: ativo,
        data: dadosAtivo,
        borderColor: colors.ativo,
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        tension: 0.1
      }
    ];
    
    // Adicionar datasets para os índices selecionados
    indices.forEach(indice => {
      datasets.push({
        label: indice,
        data: dadosIndices[indice],
        borderColor: colors[indice],
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        tension: 0.1
      });
    });
    
    return {
      labels: datas,
      datasets
    };
  };
  
  // Gerar dados ao montar o componente ou quando as props mudarem
  useEffect(() => {
    const dados = gerarDadosSimulados();
    setChartData(dados);
  }, [ativo, periodo, indices.join(',')]);
  
  // Opções para o gráfico
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false // Ocultar legenda, pois teremos nossa própria legenda personalizada
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('pt-BR', { 
                style: 'percent', 
                minimumFractionDigits: 2,
                maximumFractionDigits: 2 
              }).format(context.parsed.y / 100);
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 10
          },
          color: '#666'
        }
      },
      y: {
        grid: {
          color: '#e0e0e0',
          borderDash: [5, 5]
        },
        ticks: {
          font: {
            size: 10
          },
          color: '#666',
          callback: function(value) {
            return (value).toFixed(0) + '%';
          }
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };
  
  // Formatar data para exibição
  const formatarData = () => {
    const data = new Date();
    return data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };
  
  // Formatar rentabilidade para exibição
  const formatarRentabilidade = (valor) => {
    return valor >= 0 ? 
      <span className="rentabilidade positiva">{valor.toFixed(2)}%</span> : 
      <span className="rentabilidade negativa">{valor.toFixed(2)}%</span>;
  };
  
  // Determinar o período de exibição
  const getPeriodoTexto = () => {
    switch (periodo) {
      case '1m': return 'Último mês';
      case '6m': return 'Últimos 6 meses';
      case '1y': return 'Último ano';
      case 'all': return 'De 01.2022 até 11.2025';
      default: return 'Último ano';
    }
  };
  
  return (
    <div className="comparador-ativos">
      <div className="comparador-header">
        <h3>Carteira x Ativo</h3>
      </div>
      
      <div className="comparador-periodo">
        <span>{getPeriodoTexto()}</span>
      </div>
      
      <div className="comparador-chart">
        {chartData && (
          <Line data={chartData} options={options} height={300} />
        )}
      </div>
      
      <div className="comparador-info">
        <div className="comparador-data">
          <span>Data</span>
          <span className="valor-destaque">{formatarData()}</span>
        </div>
        
        <div className="comparador-rentabilidade">
          <span>Rent. Carteira</span>
          {formatarRentabilidade(rentabilidades.carteira)}
        </div>
        
        <div className="comparador-rentabilidade">
          <span>Rent. Ativo</span>
          {formatarRentabilidade(rentabilidades.ativo)}
        </div>
      </div>
      
      <div className="comparador-indices">
        {indices.map(indice => (
          <div key={indice} className="comparador-indice">
            <span>{indice}</span>
            {rentabilidades.indices[indice] !== undefined ? 
              formatarRentabilidade(rentabilidades.indices[indice]) : 
              <span>-</span>
            }
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .comparador-ativos {
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        .comparador-header {
          padding: 16px;
          border-bottom: 1px solid #f0f0f0;
        }
        
        .comparador-header h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: #333;
        }
        
        .comparador-periodo {
          padding: 12px 16px;
          background-color: #f9f9f9;
          text-align: center;
          font-size: 14px;
          color: #666;
        }
        
        .comparador-chart {
          height: 300px;
          padding: 16px;
          background-color: #f9f9f9;
        }
        
        .comparador-info {
          display: flex;
          padding: 16px;
          border-bottom: 1px solid #f0f0f0;
        }
        
        .comparador-data {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .comparador-rentabilidade {
          flex: 1;
          display: flex;
          flex-direction: column;
          text-align: center;
        }
        
        .comparador-indices {
          display: flex;
          padding: 16px;
          border-top: 1px solid #f0f0f0;
        }
        
        .comparador-indice {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .comparador-ativos span {
          font-size: 12px;
          color: #666;
          margin-bottom: 4px;
        }
        
        .valor-destaque {
          font-size: 16px !important;
          font-weight: 600;
          color: #333 !important;
        }
        
        .rentabilidade {
          font-size: 16px;
          font-weight: 600;
        }
        
        .positiva {
          color: #00c3ff;
        }
        
        .negativa {
          color: #ff5252;
        }
      `}</style>
    </div>
  );
};

export default ComparadorAtivosChart;
