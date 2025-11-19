import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';
import { routes } from './routes';
import Header from './components/layout/Header';
import TabNavigationTwoRows from './components/navigation/TabNavigationTwoRows';
import AuthPage from './components/auth/AuthPage';

/**
 * Componente de roteamento para a aplicação
 * Usa React Router para gerenciar as rotas
 * Adiciona verificação de autenticação
 */
const Router = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Criar tabs a partir das rotas
  const tabs = Object.keys(routes).map(key => ({
    id: key,
    label: routes[key].label,
    icon: routes[key].icon
  }));

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

  // Loading state
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 50%, #FFE082 100%)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid #FFE082',
            borderTop: '4px solid #FF8F00',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }} />
          <p style={{ color: '#666666', fontSize: '16px' }}>Carregando...</p>
        </div>
      </div>
    );
  }

  // Se não estiver autenticado, mostrar tela de login
  if (!user) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  // Se estiver autenticado, mostrar dashboard original
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

