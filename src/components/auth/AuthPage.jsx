import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ForgotPassword from './ForgotPassword';

/**
 * AuthPage - Gerencia o fluxo completo de autenticação
 * Alterna entre: Login, Cadastro e Recuperação de Senha
 */
export default function AuthPage({ onAuthSuccess }) {
  const [view, setView] = useState('login'); // 'login' | 'signup' | 'forgot'

  const handleAuthSuccess = (user) => {
    console.log('✅ AuthPage: Autenticação bem-sucedida!', user?.email);
    if (onAuthSuccess) {
      onAuthSuccess(user);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {view === 'login' && (
        <LoginForm
          onSuccess={handleAuthSuccess}
          onSwitchToSignup={() => setView('signup')}
          onForgotPassword={() => setView('forgot')}
        />
      )}

      {view === 'signup' && (
        <SignupForm
          onSuccess={handleAuthSuccess}
          onSwitchToLogin={() => setView('login')}
        />
      )}

      {view === 'forgot' && (
        <ForgotPassword
          onBackToLogin={() => setView('login')}
        />
      )}
    </div>
  );
}

