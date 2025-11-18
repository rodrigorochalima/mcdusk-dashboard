import React from 'react';
import { formatDate } from '../../lib/formatters';
import ApiStatusIndicator from './ApiStatusIndicator';
import { supabase } from '../../lib/supabaseClient';

/**
 * Componente de cabeçalho que mantém a identidade visual original
 * @param {Object} props - Propriedades do componente
 * @param {string} props.title - Título do dashboard
 */
const Header = ({ title = "Dashboard de Investimentos" }) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [loggingOut, setLoggingOut] = React.useState(false);
  
  React.useEffect(() => {
    // Atualiza a data a cada minuto
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
      console.log('🚪 Fazendo logout...');
      
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      console.log('✅ Logout realizado com sucesso!');
      // O App.jsx vai detectar a mudança de autenticação automaticamente
    } catch (error) {
      console.error('❌ Erro ao fazer logout:', error);
      alert('Erro ao fazer logout. Tente novamente.');
    } finally {
      setLoggingOut(false);
    }
  };

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
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          style={{
            padding: '6px 12px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loggingOut ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            opacity: loggingOut ? 0.6 : 1,
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            if (!loggingOut) {
              e.target.style.backgroundColor = '#dc2626';
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#ef4444';
          }}
        >
          {loggingOut ? 'Saindo...' : '🚪 Sair'}
        </button>
      </div>
    </div>
  );
};

export default Header;

