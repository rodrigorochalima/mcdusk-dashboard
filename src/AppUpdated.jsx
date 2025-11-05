import { useState } from 'react'
import Header from './components/layout/Header';
import TabNavigationTwoRows from './components/navigation/TabNavigationTwoRows';
import { routes } from './routes';

/**
 * Componente principal da aplicação atualizado
 * Usa o sistema de rotas para renderizar os componentes
 * Usa a navegação em duas linhas
 */
function AppUpdated() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const tabs = Object.keys(routes).map(key => ({
    id: key,
    label: routes[key].label,
    icon: routes[key].icon
  }));
  
  const renderContent = () => {
    const route = routes[activeTab] || routes.overview;
    const Component = route.component;
    return <Component />;
  };
  
  return (
    <div className="container">
      <Header title="Dashboard de Investimentos" />
      <TabNavigationTwoRows 
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

export default AppUpdated
