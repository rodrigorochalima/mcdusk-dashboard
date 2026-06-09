import React from 'react';
import { formatDate } from '../../lib/formatters';
import ApiStatusIndicator from './ApiStatusIndicator';
import { supabase } from '../../lib/supabaseClient';

/**
 * Componente de cabeçalho mobile-first
 * Layout: Título em cima, API Status + Data + Logout embaixo
 */
const Header = ({ title = "Dashboard de Investimentos" }) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [loggingOut, setLoggingOut] = React.useState(false);
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    if (loggingOut) return;
    const confirmed = window.confirm('Tem certeza que deseja sair?');
    if (!confirmed) return;
    try {
      setLoggingOut(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      alert('Erro ao fazer logout. Tente novamente.');
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="dashboard-header" style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      padding: '12px 16px'
    }}>
      {/* Linha 1: Título */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div className="dashboard-title" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '16px',
          fontWeight: '700'
        }}>
          <span>📊</span>
          <span>{title}</span>
        </div>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          style={{
            padding: '4px 10px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loggingOut ? 'not-allowed' : 'pointer',
            fontSize: '12px',
            fontWeight: '500',
            opacity: loggingOut ? 0.6 : 1
          }}
        >
          {loggingOut ? '...' : '🚪 Sair'}
        </button>
      </div>

      {/* Linha 2: API Status + Data */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexWrap: 'wrap'
      }}>
        <ApiStatusIndicator />
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '12px',
          color: '#6b7280'
        }}>
          <span>🕒</span>
          <span>{formatDate(currentDate)}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
