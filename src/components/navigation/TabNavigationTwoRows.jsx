import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Componente de navegação por abas em duas linhas
 * @param {Object} props - Propriedades do componente
 * @param {Array} props.tabs - Lista de abas
 * @param {string} props.activeTab - ID da aba ativa
 */
const TabNavigationTwoRows = ({ tabs, activeTab }) => {
  // Dividir as abas em duas linhas
  const firstRowTabs = tabs.slice(0, 4);
  const secondRowTabs = tabs.slice(4);
  
  // Cores para cada aba
  const tabColors = {
    overview: 'blue',
    analysis: 'orange',
    insights: 'purple',
    learn: 'green',
    discovery: 'red',
    retirement: 'teal',
    guru: 'indigo',
    promotions: 'amber'
  };
  
  const renderTabRow = (rowTabs) => (
    <div className="tab-row">
      {rowTabs.map((tab) => (
        <Link
          key={tab.id}
          to={`/${tab.id}`}
          className={`tab tab-${tabColors[tab.id]} ${activeTab === tab.id ? 'active' : ''}`}
          style={{ textDecoration: 'none' }}
        >
          <div className="tab-content">
            <div className="tab-icon">{tab.icon}</div>
            <div className="tab-label">{tab.label}</div>
          </div>
          <div className={`tab-indicator tab-indicator-${tabColors[tab.id]}`}></div>
        </Link>
      ))}
    </div>
  );
  
  return (
    <div className="tab-navigation-two-rows">
      {renderTabRow(firstRowTabs)}
      {renderTabRow(secondRowTabs)}
    </div>
  );
};

export default TabNavigationTwoRows;
