import React, { useState, useEffect } from 'react';
import { getOportunidadesInvestimento } from '../core/fetchers';
import CardAtivo from './CardAtivo';

/**
 * Componente OportunidadesPanel para exibir oportunidades fora da carteira
 * Implementação conforme especificações do documento
 * @param {Object} props - Propriedades do componente
 * @param {Array} props.carteira - Lista de ativos na carteira
 */
const OportunidadesPanel = ({ carteira }) => {
  const [oportunidades, setOportunidades] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  
  // Carregar oportunidades
  useEffect(() => {
    const carregarOportunidades = async () => {
      try {
        setCarregando(true);
        
        // Obter oportunidades de investimento
        const dadosOportunidades = await getOportunidadesInvestimento();
        
        // Filtrar ativos que já estão na carteira
        const tickersCarteira = carteira.map(ativo => ativo.ticker);
        const oportunidadesFiltradas = dadosOportunidades.filter(
          oportunidade => !tickersCarteira.includes(oportunidade.ticker)
        );
        
        setOportunidades(oportunidadesFiltradas);
        setCarregando(false);
      } catch (error) {
        console.error('Erro ao carregar oportunidades:', error);
        setErro('Não foi possível carregar as oportunidades de investimento. Tente novamente mais tarde.');
        setCarregando(false);
      }
    };
    
    carregarOportunidades();
  }, [carteira]);
  
  return (
    <div className="m-panel-opportunities-container">
      <h2 className="m-panel-section-title">Oportunidades de Investimento</h2>
      
      {carregando ? (
        <div className="m-panel-loading">Carregando oportunidades...</div>
      ) : erro ? (
        <div className="m-panel-error">{erro}</div>
      ) : oportunidades.length === 0 ? (
        <div className="m-panel-empty">
          Não encontramos oportunidades fora da sua carteira no momento.
        </div>
      ) : (
        <div className="m-panel-opportunities-grid">
          {oportunidades.map((oportunidade, index) => (
            <div key={index} className="m-panel-opportunity-item">
              <CardAtivo ativo={oportunidade} />
              <div className="m-panel-opportunity-reason">
                <strong>Motivo:</strong> {oportunidade.motivo}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OportunidadesPanel;
