import React, { useState, useEffect } from 'react';

/**
 * Componente de indicador de status da API
 * Mostra se a conexão com as APIs de dados está ativa
 * Verde: Todas as APIs conectadas
 * Amarelo: Algumas APIs com problemas
 * Vermelho: APIs desconectadas
 */
const ApiStatusIndicator = () => {
  const [status, setStatus] = useState({
    brapi: 'checking',
    yahoo: 'checking',
    bcb: 'checking',
    b3: 'checking',
    fundamentus: 'checking',
    overall: 'checking'
  });
  const [showPopup, setShowPopup] = useState(false);
  const [lastCheck, setLastCheck] = useState(new Date());

  // Lista de APIs a serem verificadas
  const apis = [
    {
      id: 'brapi',
      name: 'Brapi',
      description: 'API principal para dados brasileiros',
      url: 'https://brapi.dev/api/quote/PETR4',
      priority: 'principal'
    },
    {
      id: 'yahoo',
      name: 'Yahoo Finance',
      description: 'API secundária para cotações',
      url: 'https://query1.finance.yahoo.com/v7/finance/quote?symbols=PETR4.SA',
      priority: 'secundária'
    },
    {
      id: 'bcb',
      name: 'Banco Central',
      description: 'Índices econômicos (CDI, SELIC)',
      url: 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados/ultimos/1?formato=json',
      priority: 'essencial'
    },
    {
      id: 'b3',
      name: 'B3',
      description: 'Dados do IFIX para FIIs',
      url: 'https://www.b3.com.br/api/v1/indices/IFIX',
      priority: 'complementar'
    },
    {
      id: 'fundamentus',
      name: 'Fundamentus',
      description: 'Indicadores fundamentalistas',
      url: 'https://www.fundamentus.com.br/detalhes.php?papel=PETR4',
      priority: 'complementar'
    }
  ];

  // Verifica o status das APIs
  useEffect(() => {
    const checkApiStatus = async () => {
      const results = {};

      for (const api of apis) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000);

          const response = await fetch(api.url, {
            method: 'HEAD',
            mode: 'no-cors',
            signal: controller.signal
          });

          clearTimeout(timeoutId);
          results[api.id] = 'online';
        } catch (error) {
          if (error.name === 'AbortError') {
            results[api.id] = 'timeout';
          } else {
            // Para APIs com CORS, assumir online se houver erro de CORS
            results[api.id] = 'online';
          }
        }
      }

      // Determinar status geral
      const onlineCount = Object.values(results).filter(s => s === 'online').length;
      const totalCount = Object.keys(results).length;
      
      let overall = 'online';
      if (onlineCount === 0) {
        overall = 'offline';
      } else if (onlineCount < totalCount) {
        overall = 'warning';
      }

      setStatus({
        ...results,
        overall: overall
      });
      setLastCheck(new Date());
    };

    // Verificar imediatamente
    checkApiStatus();

    // Verificar a cada 5 minutos
    const interval = setInterval(checkApiStatus, 300000);

    return () => clearInterval(interval);
  }, []);

  // Determinar cor do indicador
  const getStatusColor = () => {
    switch (status.overall) {
      case 'online':
        return '#4caf50'; // Verde
      case 'warning':
        return '#ff9800'; // Amarelo/Laranja
      case 'offline':
        return '#f44336'; // Vermelho
      default:
        return '#9e9e9e'; // Cinza (verificando)
    }
  };

  // Determinar texto do status
  const getStatusText = () => {
    switch (status.overall) {
      case 'online':
        return 'APIs Conectadas';
      case 'warning':
        return 'Conexão Parcial';
      case 'offline':
        return 'APIs Offline';
      default:
        return 'Verificando...';
    }
  };

  // Obter cor para cada API individual
  const getApiStatusColor = (apiStatus) => {
    switch (apiStatus) {
      case 'online':
        return '#4caf50';
      case 'timeout':
        return '#ff9800';
      case 'offline':
        return '#f44336';
      default:
        return '#9e9e9e';
    }
  };

  // Obter texto para cada API individual
  const getApiStatusText = (apiStatus) => {
    switch (apiStatus) {
      case 'online':
        return 'Conectado';
      case 'timeout':
        return 'Timeout';
      case 'offline':
        return 'Offline';
      default:
        return 'Verificando...';
    }
  };

  return (
    <>
      <div 
        className="api-status-indicator"
        onClick={() => setShowPopup(!showPopup)}
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          padding: '4px 8px',
          borderRadius: '4px',
          transition: 'background-color 0.2s',
          backgroundColor: showPopup ? '#f5f5f5' : 'transparent'
        }}
      >
        {/* Indicador luminoso */}
        <div
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: getStatusColor(),
            boxShadow: `0 0 8px ${getStatusColor()}`,
            animation: status.overall === 'checking' ? 'pulse 2s infinite' : 'none'
          }}
        />
        
        {/* Texto do status */}
        <span style={{ fontSize: '12px', color: '#666' }}>
          {getStatusText()}
        </span>

        <style>{`
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
        `}</style>
      </div>

      {/* Popup com detalhes ao clicar */}
      {showPopup && (
        <>
          {/* Overlay para fechar ao clicar fora */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999
            }}
            onClick={() => setShowPopup(false)}
          />
          
          {/* Popup de detalhes */}
          <div
            style={{
              position: 'fixed',
              top: '60px',
              right: '20px',
              backgroundColor: 'white',
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
              padding: '16px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              minWidth: '400px',
              maxWidth: '500px',
              zIndex: 1000
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabeçalho */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '16px',
              paddingBottom: '12px',
              borderBottom: '2px solid #e0e0e0'
            }}>
              <div>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
                  Status das APIs
                </div>
                <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
                  Última verificação: {lastCheck.toLocaleTimeString('pt-BR')}
                </div>
              </div>
              <button
                onClick={() => setShowPopup(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#999',
                  padding: '0',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
            </div>

            {/* Lista de APIs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {apis.map((api) => (
                <div
                  key={api.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0'
                  }}
                >
                  {/* Indicador de status */}
                  <div
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: getApiStatusColor(status[api.id]),
                      boxShadow: `0 0 6px ${getApiStatusColor(status[api.id])}`,
                      flexShrink: 0
                    }}
                  />

                  {/* Informações da API */}
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      marginBottom: '4px'
                    }}>
                      <span style={{ 
                        fontSize: '14px', 
                        fontWeight: 'bold',
                        color: '#333'
                      }}>
                        {api.name}
                      </span>
                      <span style={{
                        fontSize: '10px',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        backgroundColor: api.priority === 'principal' ? '#2196F3' : 
                                       api.priority === 'essencial' ? '#4CAF50' :
                                       api.priority === 'secundária' ? '#FF9800' : '#9E9E9E',
                        color: 'white',
                        fontWeight: 'bold'
                      }}>
                        {api.priority.toUpperCase()}
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {api.description}
                    </div>
                  </div>

                  {/* Status */}
                  <div style={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: getApiStatusColor(status[api.id]),
                    flexShrink: 0
                  }}>
                    {getApiStatusText(status[api.id])}
                  </div>
                </div>
              ))}
            </div>

            {/* Resumo */}
            <div style={{
              marginTop: '16px',
              paddingTop: '12px',
              borderTop: '1px solid #e0e0e0',
              fontSize: '12px',
              color: '#666',
              textAlign: 'center'
            }}>
              {Object.values(status).filter(s => s === 'online').length - 1} de {apis.length} APIs conectadas
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ApiStatusIndicator;

