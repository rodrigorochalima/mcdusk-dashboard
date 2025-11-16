import { useState, useEffect } from 'react'
import { supabase } from './lib/supabaseClient';
import Header from './components/layout/Header';
import TabNavigation from './components/navigation/TabNavigation';
import OverviewView from './components/views/OverviewView-supabase';
import AnalysisView from './components/views/AnalysisView';
import InsightsView from './components/views/InsightsView';
import LearnView from './components/views/LearnView';
import DiscoveryView from './components/views/DiscoveryView';
import AuthPage from './pages/AuthPage';

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: '📊' },
    { id: 'analysis', label: 'Análise', icon: '📈' },
    { id: 'insights', label: 'Insights', icon: '💡' },
    { id: 'learn', label: 'Aprenda', icon: '🎓' },
    { id: 'discovery', label: 'Descoberta', icon: '🔍' },
  ];

  // Verificar autenticação ao carregar
  useEffect(() => {
    checkUser();

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function checkUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    } catch (error) {
      console.error('Erro ao verificar usuário:', error);
    } finally {
      setLoading(false);
    }
  }
  
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewView />;
      case 'analysis':
        return <AnalysisView />;
      case 'insights':
        return <InsightsView />;
      case 'learn':
        return <LearnView />;
      case 'discovery':
        return <DiscoveryView />;
      default:
        return <OverviewView />;
    }
  };

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Carregando...</h2>
          <p>Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Se não estiver autenticado, mostrar tela de login
  if (!user) {
    return <AuthPage />;
  }

  // Se estiver autenticado, mostrar dashboard
  return (
    <div className="container">
      <Header title="Dashboard de Investimentos" />
      <TabNavigation 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
}

export default App

