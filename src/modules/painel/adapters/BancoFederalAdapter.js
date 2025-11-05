/**
 * Adaptador para interligação com sistemas existentes
 * Implementação conforme especificações do documento
 */

import { getCotacoes } from '../core/fetchers';

/**
 * Adaptador para o Banco Federal
 */
class BancoFederalAdapter {
  constructor() {
    this.carteira = [];
    this.sincronizado = false;
    this.alteracoesNaoSincronizadas = [];
  }
  
  /**
   * Inicializa o adaptador
   * @returns {Promise<boolean>} - Se a inicialização foi bem-sucedida
   */
  async inicializar() {
    try {
      // Tentar carregar a carteira do sistema existente
      const carteiraExistente = await this._carregarCarteiraExistente();
      
      if (carteiraExistente) {
        this.carteira = carteiraExistente;
        this.sincronizado = true;
        return true;
      } else {
        // Se não conseguir carregar, usar dados locais
        this._carregarCarteiraLocal();
        this.sincronizado = false;
        return false;
      }
    } catch (error) {
      console.error('Erro ao inicializar adaptador:', error);
      this._carregarCarteiraLocal();
      this.sincronizado = false;
      return false;
    }
  }
  
  /**
   * Carrega a carteira do sistema existente
   * @returns {Promise<Array<Object>|null>} - Carteira carregada ou null
   * @private
   */
  async _carregarCarteiraExistente() {
    try {
      // Simulação de carregamento do sistema existente
      // Em um ambiente real, isso seria uma chamada à API do sistema
      
      // Simular falha na conexão
      if (Math.random() < 0.3) {
        throw new Error('Falha na conexão com o sistema existente');
      }
      
      // Simular carteira do sistema existente
      const carteiraSimulada = [
        { ticker: 'PGCO34', classe: 'BDR', quantidade: 5, preco_atual: 363.85, custo_medio: 350.00, data_compra: '2024-02-15' },
        { ticker: 'B3SA3', classe: 'Ação Brasil', quantidade: 100, preco_atual: 51.40, custo_medio: 45.20, data_compra: '2024-01-10' },
        { ticker: 'CXSE3', classe: 'Ação Brasil', quantidade: 80, preco_atual: 11.40, custo_medio: 12.50, data_compra: '2023-11-05' },
        { ticker: 'WEGE3', classe: 'Ação Brasil', quantidade: 30, preco_atual: 242.80, custo_medio: 220.00, data_compra: '2023-09-20' },
        { ticker: 'AMZO34', classe: 'BDR', quantidade: 5, preco_atual: 2629.50, custo_medio: 2500.00, data_compra: '2024-03-01' },
        { ticker: 'CSCO34', classe: 'BDR', quantidade: 12, preco_atual: 555.17, custo_medio: 540.00, data_compra: '2024-02-28' },
        { ticker: 'ABCB34', classe: 'BDR', quantidade: 15, preco_atual: 595.00, custo_medio: 600.00, data_compra: '2023-12-15' },
        { ticker: 'JPMC34', classe: 'BDR', quantidade: 10, preco_atual: 1578.00, custo_medio: 1500.00, data_compra: '2023-10-10' },
        { ticker: 'CPLE6', classe: 'Ação Brasil', quantidade: 200, preco_atual: 39.25, custo_medio: 38.00, data_compra: '2024-01-20' },
        { ticker: 'VIVT3', classe: 'Ação Brasil', quantidade: 60, preco_atual: 112.80, custo_medio: 110.00, data_compra: '2023-11-15' },
        { ticker: 'BOAC34', classe: 'BDR', quantidade: 10, preco_atual: 354.50, custo_medio: 340.00, data_compra: '2024-03-05' },
        { ticker: 'NASD11', classe: 'ETF', quantidade: 50, preco_atual: 128.50, custo_medio: 125.00, data_compra: '2023-12-01' },
        { ticker: 'IVVB11', classe: 'ETF', quantidade: 60, preco_atual: 181.30, custo_medio: 175.00, data_compra: '2024-01-05' },
        { ticker: 'QBTC11', classe: 'ETF', quantidade: 100, preco_atual: 587.19, custo_medio: 550.00, data_compra: '2023-09-10' },
        { ticker: 'KDIF11', classe: 'FII', quantidade: 1, preco_atual: 103.21, custo_medio: 102.00, data_compra: '2024-02-20' },
        { ticker: 'AREA11', classe: 'FII', quantidade: 10, preco_atual: 87.01, custo_medio: 88.00, data_compra: '2023-11-25' },
        { ticker: 'PVBI11', classe: 'FII', quantidade: 120, preco_atual: 104.995, custo_medio: 100.00, data_compra: '2023-10-15' },
        { ticker: 'HGCR11', classe: 'FII', quantidade: 180, preco_atual: 102.745, custo_medio: 105.00, data_compra: '2024-01-25' },
        { ticker: 'RZTR11', classe: 'FII', quantidade: 75, preco_atual: 103.362, custo_medio: 100.00, data_compra: '2023-12-10' },
        { ticker: 'VISC11', classe: 'FII', quantidade: 50, preco_atual: 79.00, custo_medio: 80.00, data_compra: '2024-02-05' },
        { ticker: 'CPTS11', classe: 'FII', quantidade: 850, preco_atual: 99.942, custo_medio: 95.00, data_compra: '2023-09-05' },
        { ticker: 'KNCR11', classe: 'FII', quantidade: 110, preco_atual: 104.125, custo_medio: 102.00, data_compra: '2023-10-20' },
        { ticker: 'BTLG11', classe: 'FII', quantidade: 25, preco_atual: 107.3384, custo_medio: 105.00, data_compra: '2024-03-10' },
        { ticker: 'HGLG11', classe: 'FII', quantidade: 30, preco_atual: 110.213, custo_medio: 108.00, data_compra: '2023-11-30' },
        { ticker: 'VILG11', classe: 'FII', quantidade: 25, preco_atual: 91.35, custo_medio: 90.00, data_compra: '2024-01-15' },
        { ticker: 'BTC', classe: 'Cripto', quantidade: 1, preco_atual: 58717.98, custo_medio: 55000.00, data_compra: '2023-12-20' }
      ];
      
      // Buscar cotações atualizadas
      const tickers = carteiraSimulada.map(ativo => ativo.ticker);
      const cotacoes = await getCotacoes(tickers);
      
      // Atualizar preços atuais
      const carteiraAtualizada = carteiraSimulada.map(ativo => {
        const cotacao = cotacoes.find(c => c.ticker === ativo.ticker);
        return {
          ...ativo,
          preco_atual: cotacao ? cotacao.preco_atual : ativo.preco_atual
        };
      });
      
      return carteiraAtualizada;
    } catch (error) {
      console.error('Erro ao carregar carteira existente:', error);
      return null;
    }
  }
  
  /**
   * Carrega a carteira local
   * @private
   */
  _carregarCarteiraLocal() {
    // Carteira local de fallback
    this.carteira = [
      { ticker: 'PGCO34', classe: 'BDR', quantidade: 5, preco_atual: 363.85, custo_medio: 350.00, data_compra: '2024-02-15' },
      { ticker: 'B3SA3', classe: 'Ação Brasil', quantidade: 100, preco_atual: 51.40, custo_medio: 45.20, data_compra: '2024-01-10' },
      { ticker: 'WEGE3', classe: 'Ação Brasil', quantidade: 30, preco_atual: 242.80, custo_medio: 220.00, data_compra: '2023-09-20' },
      { ticker: 'JPMC34', classe: 'BDR', quantidade: 10, preco_atual: 1578.00, custo_medio: 1500.00, data_compra: '2023-10-10' },
      { ticker: 'IVVB11', classe: 'ETF', quantidade: 60, preco_atual: 181.30, custo_medio: 175.00, data_compra: '2024-01-05' },
      { ticker: 'HGCR11', classe: 'FII', quantidade: 180, preco_atual: 102.745, custo_medio: 105.00, data_compra: '2024-01-25' },
      { ticker: 'BTC', classe: 'Cripto', quantidade: 1, preco_atual: 58717.98, custo_medio: 55000.00, data_compra: '2023-12-20' }
    ];
  }
  
  /**
   * Obtém a carteira
   * @returns {Array<Object>} - Carteira
   */
  getCarteira() {
    return this.carteira;
  }
  
  /**
   * Adiciona um ativo à carteira
   * @param {Object} ativo - Ativo a ser adicionado
   * @returns {Promise<boolean>} - Se a operação foi bem-sucedida
   */
  async addAtivo(ativo) {
    try {
      // Verificar se o ativo já existe
      const index = this.carteira.findIndex(a => a.ticker === ativo.ticker);
      
      if (index !== -1) {
        // Atualizar quantidade se já existir
        this.carteira[index].quantidade += ativo.quantidade;
        
        // Recalcular custo médio
        const valorAnterior = this.carteira[index].quantidade * this.carteira[index].custo_medio;
        const valorNovo = ativo.quantidade * ativo.custo_medio;
        const quantidadeTotal = this.carteira[index].quantidade + ativo.quantidade;
        this.carteira[index].custo_medio = (valorAnterior + valorNovo) / quantidadeTotal;
      } else {
        // Adicionar novo ativo
        this.carteira.push(ativo);
      }
      
      // Registrar alteração
      this.alteracoesNaoSincronizadas.push({
        tipo: 'add',
        ativo,
        timestamp: Date.now()
      });
      
      // Tentar sincronizar com o sistema existente
      if (this.sincronizado) {
        await this._sincronizarAlteracoes();
      }
      
      return true;
    } catch (error) {
      console.error('Erro ao adicionar ativo:', error);
      return false;
    }
  }
  
  /**
   * Edita um ativo da carteira
   * @param {string} ticker - Ticker do ativo a ser editado
   * @param {Object} dados - Dados a serem atualizados
   * @returns {Promise<boolean>} - Se a operação foi bem-sucedida
   */
  async editAtivo(ticker, dados) {
    try {
      // Encontrar o ativo
      const index = this.carteira.findIndex(a => a.ticker === ticker);
      
      if (index === -1) {
        throw new Error(`Ativo ${ticker} não encontrado na carteira`);
      }
      
      // Guardar dados antigos para registro
      const dadosAntigos = { ...this.carteira[index] };
      
      // Atualizar dados
      this.carteira[index] = {
        ...this.carteira[index],
        ...dados
      };
      
      // Registrar alteração
      this.alteracoesNaoSincronizadas.push({
        tipo: 'edit',
        ticker,
        dadosAntigos,
        dadosNovos: dados,
        timestamp: Date.now()
      });
      
      // Tentar sincronizar com o sistema existente
      if (this.sincronizado) {
        await this._sincronizarAlteracoes();
      }
      
      return true;
    } catch (error) {
      console.error('Erro ao editar ativo:', error);
      return false;
    }
  }
  
  /**
   * Remove um ativo da carteira
   * @param {string} ticker - Ticker do ativo a ser removido
   * @returns {Promise<boolean>} - Se a operação foi bem-sucedida
   */
  async removeAtivo(ticker) {
    try {
      // Encontrar o ativo
      const index = this.carteira.findIndex(a => a.ticker === ticker);
      
      if (index === -1) {
        throw new Error(`Ativo ${ticker} não encontrado na carteira`);
      }
      
      // Guardar dados para registro
      const ativoRemovido = { ...this.carteira[index] };
      
      // Remover ativo
      this.carteira.splice(index, 1);
      
      // Registrar alteração
      this.alteracoesNaoSincronizadas.push({
        tipo: 'remove',
        ticker,
        ativo: ativoRemovido,
        timestamp: Date.now()
      });
      
      // Tentar sincronizar com o sistema existente
      if (this.sincronizado) {
        await this._sincronizarAlteracoes();
      }
      
      return true;
    } catch (error) {
      console.error('Erro ao remover ativo:', error);
      return false;
    }
  }
  
  /**
   * Sincroniza alterações com o sistema existente
   * @returns {Promise<boolean>} - Se a sincronização foi bem-sucedida
   * @private
   */
  async _sincronizarAlteracoes() {
    try {
      // Verificar se há alterações para sincronizar
      if (this.alteracoesNaoSincronizadas.length === 0) {
        return true;
      }
      
      // Simulação de sincronização com o sistema existente
      // Em um ambiente real, isso seria uma chamada à API do sistema
      
      // Simular falha na sincronização
      if (Math.random() < 0.2) {
        throw new Error('Falha na sincronização com o sistema existente');
      }
      
      // Simular sucesso na sincronização
      this.alteracoesNaoSincronizadas = [];
      return true;
    } catch (error) {
      console.error('Erro ao sincronizar alterações:', error);
      this.sincronizado = false;
      return false;
    }
  }
  
  /**
   * Verifica se há alterações não sincronizadas
   * @returns {boolean} - Se há alterações não sincronizadas
   */
  temAlteracoesNaoSincronizadas() {
    return this.alteracoesNaoSincronizadas.length > 0;
  }
  
  /**
   * Obtém o status de sincronização
   * @returns {boolean} - Se está sincronizado com o sistema existente
   */
  estaSincronizado() {
    return this.sincronizado;
  }
}

export default BancoFederalAdapter;
