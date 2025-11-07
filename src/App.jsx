import { useState } from 'react'
import Header from './components/layout/Header';
import TabNavigation from './components/navigation/TabNavigation';
import OverviewView from './components/views/OverviewView-supabase';
import AnalysisView from './components/views/AnalysisView';
import InsightsView from './components/views/InsightsView';
import LearnView from './components/views/LearnView';
import DiscoveryView from './components/views/DiscoveryView';

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: '📊' },
    { id: 'analysis', label: 'Análise', icon: '📈' },
    { id: 'insights', label: 'Insights', icon: '💡' },
    { id: 'learn', label: 'Aprenda', icon: '🎓' },
    { id: 'discovery', label: 'Descoberta', icon: '🔍' },
  ];
  
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

