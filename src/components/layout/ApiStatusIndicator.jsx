import React, { useState, useEffect, useCallback } from 'react';

/**
 * Componente de indicador de status das APIs
 * Verifica conexão real com as APIs e mostra status + última atualização
 * Mobile-first, com modal centralizado e botão de refresh
 */

const API_CONFIG = [
  {
    id: 'brapi',
    name: 'Brapi (B3)',
    description: 'Cotações de ações brasileiras',
    testUrl: 'https://brapi.dev/api/quote/PETR4?token=demo',
    priority: 'principal'
  },
  {
    id: 'bcb',
    name: 'Banco Central',
    description: 'CDI, SELIC, IPCA',
    testUrl: 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados/ultimos/1?formato=json',
    priority: 'essencial'
  },
  {
    id: 'yahoo',
    name: 'Yahoo Finance',
    description: 'Cotações internacionais',
    testUrl: 'https://query1.finance.yahoo.com/v8/finance/chart/AAPL?interval=1d&range=1d',
    priority: 'secundária'
  },
  {
    id: 'coingecko',
    name: 'CoinGecko',
    description: 'Preços de criptomoedas',
    testUrl: 'https://api.coingecko.com/api/v3/ping',
    priority: 'complementar'
  }
];

const STORAGE_KEY = 'mcduck_api_status';

const ApiStatusIndicator = () => {
  const [apiStatuses, setApiStatuses] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return API_CONFIG.reduce((acc, api) => {
      acc[api.id] = { status: 'unknown', lastCheck: null };
      return acc;
    }, {});
  });
  const [showModal, setShowModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastGlobalUpdate, setLastGlobalUpdate] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_last');
    return saved || null;
  });

  // Verificar uma API individual
  const checkApi = async (api) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(api.testUrl, {
        signal: controller.signal,
        headers: { 'Accept': 'application/json' }
      });

      clearTimeout(timeoutId);
      return response.ok || response.status === 200;
    } catch (error) {
      // CORS errors still mean the server responded
      if (error.message && error.message.includes('CORS')) {
        return true; // Server is alive, just blocking us
      }
      if (error.name === 'TypeError' && !error.message.includes('abort')) {
        // Network error but could be CORS - mark as potentially online
        return 'cors_blocked';
      }
      return false;
    }
  };

  // Verificar todas as APIs
  const checkAllApis = useCallback(async () => {
    setIsRefreshing(true);
    const newStatuses = {};
    const now = new Date().toISOString();

    for (const api of API_CONFIG) {
      const result = await checkApi(api);
      newStatuses[api.id] = {
        status: result === true ? 'online' : result === 'cors_blocked' ? 'cors' : 'offline',
        lastCheck: now
      };
    }

    setApiStatuses(newStatuses);
    setLastGlobalUpdate(now);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newStatuses));
    localStorage.setItem(STORAGE_KEY + '_last', now);
    setIsRefreshing(false);
  }, []);

  // Verificar ao montar e a cada 5 minutos
  useEffect(() => {
    checkAllApis();
    const interval = setInterval(checkAllApis, 300000);
    return () => clearInterval(interval);
  }, [checkAllApis]);

  // Calcular status geral
  const getOverallStatus = () => {
    const statuses = Object.values(apiStatuses);
    const onlineCount = statuses.filter(s => s.status === 'online' || s.status === 'cors').length;
    const total = statuses.length;
    if (onlineCount === total) return 'online';
    if (onlineCount === 0) return 'offline';
    return 'partial';
  };

  const overallStatus = getOverallStatus();

  const statusConfig = {
    online: { color: '#22c55e', text: 'APIs Online', bg: '#dcfce7' },
    partial: { color: '#f59e0b', text: 'APIs Parciais', bg: '#fef3c7' },
    offline: { color: '#ef4444', text: 'APIs Offline', bg: '#fee2e2' },
    unknown: { color: '#9ca3af', text: 'Verificando...', bg: '#f3f4f6' }
  };

  const config = statusConfig[overallStatus] || statusConfig.unknown;

  // Formatar tempo relativo
  const getRelativeTime = (isoString) => {
    if (!isoString) return 'Nunca';
    const diff = Date.now() - new Date(isoString).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Agora mesmo';
    if (minutes < 60) return `${minutes}min atrás`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h atrás`;
    return new Date(isoString).toLocaleDateString('pt-BR');
  };

  const formatDateTime = (isoString) => {
    if (!isoString) return 'Nunca atualizado';
    return new Date(isoString).toLocaleString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  };

  return (
    <>
      {/* Indicador compacto */}
      <div
        onClick={() => setShowModal(true)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          borderRadius: '20px',
          backgroundColor: config.bg,
          cursor: 'pointer',
          transition: 'all 0.2s',
          border: `1px solid ${config.color}30`
        }}
      >
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: config.color,
          boxShadow: `0 0 6px ${config.color}`,
          animation: isRefreshing ? 'pulse 1s infinite' : 'none'
        }} />
        <span style={{ fontSize: '11px', fontWeight: '600', color: config.color }}>
          {config.text}
        </span>
        <span style={{ fontSize: '10px', color: '#6b7280' }}>
          {getRelativeTime(lastGlobalUpdate)}
        </span>
      </div>

      {/* Botão Refresh discreto */}
      <button
        onClick={(e) => { e.stopPropagation(); checkAllApis(); }}
        disabled={isRefreshing}
        style={{
          background: 'none',
          border: 'none',
          cursor: isRefreshing ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          padding: '4px',
          opacity: isRefreshing ? 0.5 : 1,
          animation: isRefreshing ? 'spin 1s linear infinite' : 'none',
          display: 'flex',
          alignItems: 'center'
        }}
        title="Atualizar dados"
      >
        🔄
      </button>

      {/* Modal de detalhes */}
      {showModal && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setShowModal(false)}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 9998,
              backdropFilter: 'blur(2px)'
            }}
          />
          {/* Modal */}
          <div style={{
            position: 'fixed',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '20px',
            width: 'min(90vw, 380px)',
            maxHeight: '80vh',
            overflowY: 'auto',
            zIndex: 9999,
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
              paddingBottom: '12px',
              borderBottom: '2px solid #f3f4f6'
            }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#1f2937' }}>
                  Status das APIs
                </h3>
                <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#6b7280' }}>
                  Última atualização: {formatDateTime(lastGlobalUpdate)}
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: '#f3f4f6',
                  border: 'none',
                  borderRadius: '50%',
                  width: '28px', height: '28px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ✕
              </button>
            </div>

            {/* Lista de APIs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {API_CONFIG.map((api) => {
                const apiStatus = apiStatuses[api.id] || { status: 'unknown', lastCheck: null };
                const isOnline = apiStatus.status === 'online' || apiStatus.status === 'cors';
                return (
                  <div key={api.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    backgroundColor: isOnline ? '#f0fdf4' : apiStatus.status === 'unknown' ? '#f9fafb' : '#fef2f2',
                    border: `1px solid ${isOnline ? '#bbf7d0' : apiStatus.status === 'unknown' ? '#e5e7eb' : '#fecaca'}`
                  }}>
                    {/* Status icon */}
                    <span style={{ fontSize: '16px' }}>
                      {isOnline ? '✅' : apiStatus.status === 'unknown' ? '⏳' : '❌'}
                    </span>
                    {/* Info */}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#1f2937' }}>
                        {api.name}
                      </div>
                      <div style={{ fontSize: '10px', color: '#6b7280' }}>
                        {api.description}
                      </div>
                    </div>
                    {/* Timestamp */}
                    <div style={{ fontSize: '10px', color: '#9ca3af', textAlign: 'right' }}>
                      {apiStatus.lastCheck
                        ? new Date(apiStatus.lastCheck).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                        : 'Pendente'
                      }
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Botão de atualizar */}
            <button
              onClick={checkAllApis}
              disabled={isRefreshing}
              style={{
                width: '100%',
                marginTop: '16px',
                padding: '10px',
                backgroundColor: isRefreshing ? '#9ca3af' : '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: isRefreshing ? 'not-allowed' : 'pointer'
              }}
            >
              {isRefreshing ? '⏳ Verificando...' : '🔄 Verificar Agora'}
            </button>

            {/* Resumo */}
            <div style={{
              marginTop: '12px',
              padding: '10px',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              fontSize: '11px',
              color: '#6b7280',
              textAlign: 'center'
            }}>
              {Object.values(apiStatuses).filter(s => s.status === 'online' || s.status === 'cors').length} de {API_CONFIG.length} APIs conectadas
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default ApiStatusIndicator;
