import { useState, useEffect } from 'react'
import { supabase } from './lib/supabaseClient';
import AuthPage from './components/auth/AuthPage';
import Header from './components/layout/Header';
import TabNavigation from './components/navigation/TabNavigation';
import OverviewView from './components/views/OverviewView';
import AnalysisView from './components/views/AnalysisView';
import InsightsView from './components/views/InsightsView';
import LearnView from './components/views/LearnView';
import DiscoveryView from './components/views/DiscoveryView';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: '📊' },
    { id: 'analysis', label: 'Análise', icon: '📈' },
    { id: 'insights', label: 'Insights', icon: '💡' },
    { id: 'learn', label: 'Aprenda', icon: '🎓' },
    { id: 'discovery', label: 'Descoberta', icon: '🔍' },
  ];

  // Verificar autenticação ao carregar
  useEffect(() => {
    checkAuth();

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function checkAuth() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleAuthSuccess = (authenticatedUser) => {
    setUser(authenticatedUser);
  };
  
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

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se não estiver autenticado, mostrar tela de login
  if (!user) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
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

