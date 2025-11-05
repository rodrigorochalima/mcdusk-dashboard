import React from 'react';
import { 
  totalPatrimony, 
  assetClasses, 
  performance
} from '../../data/portfolioData-updated';
import TotalPatrimonyCard from '../cards/TotalPatrimonyCard';
import AssetClassCard from '../cards/AssetClassCard';
import PerformanceChartCard from '../cards/PerformanceChartCard';

/**
 * Componente de visão geral atualizado com gráfico de performance
 * Versão simplificada para resolver problemas de duplicação
 */
const OverviewViewUpdated = () => {
  return (
    <div className="overview-container">
      {/* Card de Patrimônio Total */}
      <TotalPatrimonyCard patrimony={totalPatrimony} />
      
      {/* Card de Performance com Gráfico */}
      <PerformanceChartCard performance={performance} />
      
      {/* Cards de Classes de Ativos */}
      {assetClasses.map((assetClass) => (
        <AssetClassCard 
          key={assetClass.id} 
          assetClass={assetClass} 
        />
      ))}
    </div>
  );
};

export default OverviewViewUpdated;
