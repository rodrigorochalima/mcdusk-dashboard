import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Componente de navegação por abas que mantém a identidade visual original
 * @param {Object} props - Propriedades do componente
 * @param {Array} props.tabs - Array de objetos de abas com {id, label, icon}
 * @param {string} props.activeTab - ID da aba ativa
 * @param {Function} props.onTabChange - Função chamada quando a aba é alterada
 */
const TabNavigation = ({ tabs, activeTab, onTabChange }) => {
  // Função para obter a classe CSS específica para cada aba
  const getTabClass = (tabId) => {
    switch (tabId) {
      case 'overview':
        return 'tab-overview';
      case 'analysis':
        return 'tab-analysis';
      case 'insights':
        return 'tab-insights';
      case 'learn':
        return 'tab-learn';
      case 'discovery':
        return 'tab-discovery';
      default:
        return '';
    }
  };

  return (
    <div className="tabs-container">
      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          className={cn(
            "tab",
            getTabClass(tab.id),
            activeTab === tab.id && "active"
          )}
          onClick={() => onTabChange(tab.id)}
        >
          <div className="tab-number">{index + 1}</div>
          <div className="tab-icon">{tab.icon}</div>
          <div className="tab-label">{tab.label}</div>
        </div>
      ))}
    </div>
  );
};

export default TabNavigation;
