import React, { useState } from 'react';
import { assetClasses, patrimonyHistory } from '../../data/portfolioData-updated';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { formatCurrency } from '../../lib/formatters';
import AssetDetailModal from '../modals/AssetDetailModal';

// Função para converter "Mês/Ano" em um objeto Date
const parseMonthYear = (monthYearString) => {
  const monthMap = {
    'Jan': 0, 'Fev': 1, 'Mar': 2, 'Abr': 3, 'Mai': 4, 'Jun': 5,
    'Jul': 6, 'Ago': 7, 'Set': 8, 'Out': 9, 'Nov': 10, 'Dez': 11
  };
  const [monthStr, yearStr] = monthYearString.split('/');
  const year = parseInt(yearStr, 10) + 2000; // Assume anos 20xx
  const month = monthMap[monthStr];
  return new Date(year, month, 1);
};

const AnalysisView = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('all');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // Dados para o gráfico de pizza
  const pieData = assetClasses.map(assetClass => ({
    name: assetClass.title,
    value: assetClass.value
  }));
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Obter todos os ativos para Top/Bottom
  const allAssets = assetClasses.flatMap(assetClass => 
    assetClass.assets.map(asset => ({ ...asset, assetClass: assetClass.title }))
  );

  // Ordenar ativos por variação
  const sortedAssets = [...allAssets].sort((a, b) => b.change - a.change);
  const top5 = sortedAssets.slice(0, 5);
  const bottom5 = sortedAssets.slice(-5).reverse();

  // CORREÇÃO: Ordenar o histórico de patrimônio cronologicamente
  const sortedPatrimonyHistory = [...patrimonyHistory].sort((a, b) => {
    return parseMonthYear(a.month) - parseMonthYear(b.month);
  });

  const filterPatrimonyData = () => {
    const totalMonths = sortedPatrimonyHistory.length;
    switch (selectedTimeRange) {
      case '1m':
        return sortedPatrimonyHistory.slice(Math.max(totalMonths - 2, 0));
      case '6m':
        return sortedPatrimonyHistory.slice(Math.max(totalMonths - 6, 0));
      case '1y':
        return sortedPatrimonyHistory.slice(Math.max(totalMonths - 12, 0));
      case 'all':
      default:
        return sortedPatrimonyHistory;
    }
  };
  
  const filteredPatrimonyData = filterPatrimonyData();

  const CustomLineTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          <p className="tooltip-value">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  const handleAssetClick = (asset) => {
    setSelectedAsset(asset);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAsset(null);
  };

  const handleSaveAsset = (updatedAsset) => {
    console.log('Asset saved:', updatedAsset);
    // Aqui você pode implementar a lógica para salvar o ativo atualizado
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '8px', 
        padding: '15px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <h2>Evolução do Patrimônio</h2>
        <div style={{ marginBottom: '15px' }}>
          <button 
            style={{ 
              padding: '8px 15px', 
              marginRight: '10px', 
              borderRadius: '20px',
              border: 'none',
              backgroundColor: selectedTimeRange === '1m' ? '#4285f4' : '#f0f0f0',
              color: selectedTimeRange === '1m' ? 'white' : 'black',
              cursor: 'pointer'
            }} 
            onClick={() => setSelectedTimeRange('1m')}
          >
            1M
          </button>
          <button 
            style={{ 
              padding: '8px 15px', 
              marginRight: '10px', 
              borderRadius: '20px',
              border: 'none',
              backgroundColor: selectedTimeRange === '6m' ? '#4285f4' : '#f0f0f0',
              color: selectedTimeRange === '6m' ? 'white' : 'black',
              cursor: 'pointer'
            }} 
            onClick={() => setSelectedTimeRange('6m')}
          >
            6M
          </button>
          <button 
            style={{ 
              padding: '8px 15px', 
              marginRight: '10px', 
              borderRadius: '20px',
              border: 'none',
              backgroundColor: selectedTimeRange === '1y' ? '#4285f4' : '#f0f0f0',
              color: selectedTimeRange === '1y' ? 'white' : 'black',
              cursor: 'pointer'
            }} 
            onClick={() => setSelectedTimeRange('1y')}
          >
            1A
          </button>
          <button 
            style={{ 
              padding: '8px 15px', 
              marginRight: '10px', 
              borderRadius: '20px',
              border: 'none',
              backgroundColor: selectedTimeRange === 'all' ? '#4285f4' : '#f0f0f0',
              color: selectedTimeRange === 'all' ? 'white' : 'black',
              cursor: 'pointer'
            }} 
            onClick={() => setSelectedTimeRange('all')}
          >
            Tudo
          </button>
        </div>
        <div style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredPatrimonyData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={(value) => `R$${(value / 1000)}k`} tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomLineTooltip />} />
              <Line type="monotone" dataKey="value" stroke="#0052FF" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '8px', 
        padding: '15px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <h2>Distribuição por Classe de Ativos</h2>
        <div style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie 
                data={pieData} 
                cx="50%" 
                cy="50%" 
                innerRadius={60} 
                outerRadius={100} 
                fill="#8884d8" 
                paddingAngle={5} 
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '8px', 
        padding: '15px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <h2>Top/Bottom Ativos</h2>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <h3>Top 5 Ativos</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {top5.map((asset, index) => (
                <li 
                  key={index} 
                  style={{ 
                    padding: '10px', 
                    marginBottom: '5px', 
                    backgroundColor: '#f9f9f9',
                    borderRadius: '5px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleAssetClick(asset)}
                >
                  <span>{asset.symbol}</span>
                  <span style={{ color: asset.change >= 0 ? '#4caf50' : '#f44336' }}>
                    {asset.change >= 0 ? '▲' : '▼'} {Math.abs(asset.change).toFixed(1)}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ flex: 1 }}>
            <h3>Bottom 5 Ativos</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {bottom5.map((asset, index) => (
                <li 
                  key={index} 
                  style={{ 
                    padding: '10px', 
                    marginBottom: '5px', 
                    backgroundColor: '#f9f9f9',
                    borderRadius: '5px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleAssetClick(asset)}
                >
                  <span>{asset.symbol}</span>
                  <span style={{ color: asset.change >= 0 ? '#4caf50' : '#f44336' }}>
                    {asset.change >= 0 ? '▲' : '▼'} {Math.abs(asset.change).toFixed(1)}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '8px', 
        padding: '15px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <h2>Estratégias de Investimento</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
          <div style={{ flex: '1 1 300px', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '5px' }}>
            <h3>Warren Buffett</h3>
            <p>Estratégia baseada em qualidade e valor, com foco em empresas com vantagens competitivas duradouras.</p>
            <ul>
              <li>Qualidade forte (F-Score ≥7)</li>
              <li>Valuation atrativo (EV/EBIT e P/B baixos)</li>
              <li>Tendência não contra (Preço ≥MM200)</li>
            </ul>
          </div>
          <div style={{ flex: '1 1 300px', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '5px' }}>
            <h3>Diagrama do Cerrado</h3>
            <p>Análise de quadrantes de qualidade e valuation, com ajustes para momentum e tendência.</p>
            <ul>
              <li>Quadrantes de Qualidade × Valuation</li>
              <li>Ajuste para Momentum e MM200</li>
            </ul>
          </div>
          <div style={{ flex: '1 1 300px', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '5px' }}>
            <h3>Método Arca</h3>
            <p>Foco em momentum e tendência, com ajustes para valuations extremos.</p>
            <ul>
              <li>Momentum e tendência como guias</li>
              <li>Ajuste para valuations extremos</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal de detalhes do ativo */}
      {showModal && selectedAsset && (
        <AssetDetailModal 
          asset={selectedAsset} 
          onClose={handleCloseModal}
          onSaveAsset={handleSaveAsset}
        />
      )}
    </div>
  );
};

export default AnalysisView;
