import React from 'react';
import { formatDate } from '../../lib/formatters';
import ApiStatusIndicator from './ApiStatusIndicator';

/**
 * Componente de cabeçalho que mantém a identidade visual original
 * @param {Object} props - Propriedades do componente
 * @param {string} props.title - Título do dashboard
 */
const Header = ({ title = "Dashboard de Investimentos" }) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  
  React.useEffect(() => {
    // Atualiza a data a cada minuto
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-header">
      <div className="dashboard-title">
        <span className="dashboard-title-icon">📊</span>
        <span>{title}</span>
      </div>
      <div className="dashboard-date" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <ApiStatusIndicator />
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span className="dashboard-date-icon">🕒</span>
          <span>{formatDate(currentDate)}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
