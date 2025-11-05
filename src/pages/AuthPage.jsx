import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import { promptMigration } from '../utils/migrateToSupabase';

export default function AuthPage() {
  const [mode, setMode] = useState('login'); // 'login' ou 'signup'

  // Verificar se já está autenticado
  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      console.log('✅ Usuário já autenticado, redirecionando...');
      
      // Verificar se há dados para migrar
      await promptMigration();
      
      // Redirecionar para dashboard
      window.location.href = '/';
    }
  }

  async function handleAuthSuccess(user) {
    console.log('🎉 Autenticação bem-sucedida!', user.email);
    
    // Verificar se há dados para migrar
    await promptMigration();
    
    // Redirecionar para dashboard
    window.location.href = '/';
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {mode === 'login' ? (
        <LoginForm
          onSuccess={handleAuthSuccess}
          onSwitchToSignup={() => setMode('signup')}
        />
      ) : (
        <SignupForm
          onSuccess={handleAuthSuccess}
          onSwitchToLogin={() => setMode('login')}
        />
      )}
    </div>
  );
}

