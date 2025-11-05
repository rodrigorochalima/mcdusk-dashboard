import React, { useState } from 'react';
import { Search, BookOpen, Video, FileText, ArrowRight } from 'lucide-react';
import '../../styles/learn.css';

const LearnView = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedTerm, setExpandedTerm] = useState(null);
  
  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'strategy', name: 'Estratégia' },
    { id: 'stocks', name: 'Ações' },
    { id: 'fiis', name: 'FIIs' },
    { id: 'international', name: 'Internacional' },
    { id: 'planning', name: 'Planejamento' },
    { id: 'fundamentals', name: 'Fundamentos' }
  ];
  
  const articles = [
    {
      id: 1,
      title: 'Como diversificar sua carteira de investimentos',
      summary: 'Aprenda a importância da diversificação e como implementá-la em sua estratégia de investimentos.',
      category: 'strategy',
      readTime: '5 min',
      image: '📊',
      featured: true,
      url: 'https://www.xpi.com.br/investimentos/diversificacao-de-investimentos/'
    },
    {
      id: 2,
      title: 'Entendendo os Fundos Imobiliários',
      summary: 'Um guia completo sobre como funcionam os FIIs e como escolher os melhores para seu perfil.',
      category: 'fiis',
      readTime: '8 min',
      image: '🏢',
      featured: false,
      url: 'https://www.suno.com.br/guias/fundos-imobiliarios/'
    },
    {
      id: 3,
      title: 'Renda Fixa vs. Renda Variável',
      summary: 'Conheça as diferenças entre estas classes de ativos e quando investir em cada uma delas.',
      category: 'fundamentals',
      readTime: '6 min',
      image: '📈',
      featured: false,
      url: 'https://www.btgpactual.com/btg-insights/posts/renda-fixa-x-renda-variavel-qual-a-diferenca-e-onde-investir'
    },
    {
      id: 4,
      title: 'Investindo no exterior: por que e como começar',
      summary: 'Descubra as vantagens de investir em ativos internacionais e as melhores formas de fazer isso.',
      category: 'international',
      readTime: '7 min',
      image: '🌎',
      featured: true,
      url: 'https://www.infomoney.com.br/guias/investir-no-exterior/'
    }
  ];
  
  const videos = [
    {
      id: 1,
      title: 'Como ler um relatório financeiro',
      duration: '15:24',
      thumbnail: '📊',
      category: 'fundamentals',
      url: 'https://www.youtube.com/watch?v=1-g73ty98A8'
    },
    {
      id: 2,
      title: 'Estratégias de alocação de ativos',
      duration: '12:08',
      thumbnail: '📈',
      category: 'strategy',
      url: 'https://www.youtube.com/watch?v=ZgX_2_x-xXw'
    }
  ];
  
  const glossaryTerms = [
    { 
      term: 'Dividend Yield', 
      definition: 'Relação entre os dividendos pagos por ação e o preço da ação.',
      category: 'fundamentals',
      url: 'https://www.suno.com.br/artigos/dividend-yield/'
    },
    { 
      term: 'LTV', 
      definition: 'Loan to Value - Relação entre o valor do empréstimo e o valor do imóvel.',
      category: 'fiis',
      url: 'https://www.suno.com.br/artigos/loan-to-value-ltv/'
    },
    { 
      term: 'P/L', 
      definition: 'Preço/Lucro - Indicador que mostra quanto tempo levaria para o investidor recuperar o valor investido.',
      category: 'stocks',
      url: 'https://www.suno.com.br/artigos/preco-lucro/'
    },
    { 
      term: 'EBITDA', 
      definition: 'Lucro antes de juros, impostos, depreciação e amortização. Indicador de desempenho operacional.',
      category: 'fundamentals',
      url: 'https://www.suno.com.br/artigos/ebitda/'
    }
  ];

  const handleLinkClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredVideos = videos.filter(video => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredGlossary = glossaryTerms.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="learn-container">
      <div className="learn-header">
        <div className="search-bar">
          <Search size={20} />
          <input 
            type="text" 
            placeholder="Buscar conteúdo..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="category-filters">
          {categories.map(category => (
            <button 
              key={category.id}
              className={selectedCategory === category.id ? 'active' : ''}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Artigos */}
      <div className="card">
        <div className="card-header">
          <h2><BookOpen size={20} /> Artigos</h2>
        </div>
        <div className="card-content">
          <div className="articles-grid">
            {filteredArticles.map(article => (
              <div key={article.id} className="article-card" onClick={() => handleLinkClick(article.url)}>
                <div className="article-image">{article.image}</div>
                <div className="article-content">
                  <h3>{article.title}</h3>
                  <p>{article.summary}</p>
                  <div className="article-meta">
                    <span className="read-time">{article.readTime} de leitura</span>
                    {article.featured && <span className="featured-tag">Destaque</span>}
                  </div>
                  <button className="read-more-btn">Ler artigo <ArrowRight size={16} /></button>
                </div>
              </div>
            ))}
            {filteredArticles.length === 0 && (
              <div className="no-results">Nenhum artigo encontrado para os filtros selecionados.</div>
            )}
          </div>
        </div>
      </div>

      {/* Vídeos */}
      <div className="card">
        <div className="card-header">
          <h2><Video size={20} /> Vídeos Educativos</h2>
        </div>
        <div className="card-content">
          <div className="videos-grid">
            {filteredVideos.map(video => (
              <div key={video.id} className="video-card" onClick={() => handleLinkClick(video.url)}>
                <div className="video-thumbnail">
                  <div className="thumbnail-icon">{video.thumbnail}</div>
                  <div className="play-button">▶</div>
                  <div className="video-duration">{video.duration}</div>
                </div>
                <h3>{video.title}</h3>
              </div>
            ))}
            {filteredVideos.length === 0 && (
              <div className="no-results">Nenhum vídeo encontrado para os filtros selecionados.</div>
            )}
          </div>
        </div>
      </div>

      {/* Glossário */}
      <div className="card glossary-card">
        <div className="card-header">
          <h2><FileText size={20} /> Glossário de Investimentos</h2>
        </div>
        <div className="card-content">
          {filteredGlossary.map((item, index) => (
            <div 
              key={index} 
              className={`glossary-item ${expandedTerm === index ? 'expanded' : ''}`}
              onClick={() => expandedTerm === index ? setExpandedTerm(null) : setExpandedTerm(index)}
            >
              <h3>{item.term}</h3>
              <p>{item.definition}</p>
              <button className="glossary-link" onClick={(e) => {
                e.stopPropagation();
                handleLinkClick(item.url);
              }}>
                Saiba mais <ArrowRight size={16} />
              </button>
            </div>
          ))}
          {filteredGlossary.length === 0 && (
            <div className="no-results">Nenhum termo encontrado para os filtros selecionados.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearnView;
