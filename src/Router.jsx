import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './routes';
import Header from './components/layout/Header';
import TabNavigationTwoRows from './components/navigation/TabNavigationTwoRows';

/**
 * Componente de roteamento para a aplicação
 * Usa React Router para gerenciar as rotas
 */
const Router = () => {
  // Criar tabs a partir das rotas
  const tabs = Object.keys(routes).map(key => ({
    id: key,
    label: routes[key].label,
    icon: routes[key].icon
  }));

  return (
    <BrowserRouter>
      <div className="container">
        <Header title="Dashboard de Investimentos" />
        <Routes>
          {Object.keys(routes).map(key => {
            const Component = routes[key].component;
            return (
              <Route 
                key={key} 
                path={`/${key}`} 
                element={
                  <>
                    <TabNavigationTwoRows 
                      tabs={tabs} 
                      activeTab={key} 
                    />
                    <div className="content">
                      <Component />
                    </div>
                  </>
                } 
              />
            );
          })}
          <Route path="/" element={<Navigate to="/overview" replace />} />
          <Route path="*" element={<Navigate to="/overview" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Router;
