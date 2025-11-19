import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import McDuckLogo from './McDuckLogo';

export default function LoginForm({ onSuccess, onSwitchToSignup, onForgotPassword }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);

      console.log('🔐 LoginForm: Tentando fazer login...');

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      console.log('✅ LoginForm: Login bem-sucedido!', data.user.email);

      if (onSuccess) onSuccess(data.user);
    } catch (err) {
      console.error('❌ LoginForm: Erro no login:', err);
      setError(err.message || 'Erro ao fazer login');
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header com gradiente */}
        <div className="bg-gradient-to-br from-green-600 to-emerald-700 px-6 sm:px-8 pt-8 pb-6 text-center">
          <McDuckLogo size={80} />
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            McDuck Dashboard
          </h1>
          <p className="text-green-100 text-sm sm:text-base">
            Faça login para acessar seu portfólio
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 sm:px-8 py-6 space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              📧 Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-base"
              placeholder="seu@email.com"
              required
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              🔒 Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-base"
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm text-green-600 hover:text-green-700 font-medium hover:underline"
              disabled={loading}
            >
              Esqueceu a senha?
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg text-sm">
              <span className="font-semibold">Erro:</span> {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3.5 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Entrando...
              </span>
            ) : (
              '🚀 Entrar'
            )}
          </button>
        </form>

        {/* Switch to Signup */}
        <div className="px-6 sm:px-8 pb-6 text-center border-t border-gray-100 pt-6">
          <p className="text-gray-600 text-sm">
            Não tem uma conta?{' '}
            <button
              onClick={onSwitchToSignup}
              className="text-green-600 hover:text-green-700 font-semibold hover:underline"
              disabled={loading}
            >
              Criar conta
            </button>
          </p>
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-gray-500 text-xs mt-6">
        🔒 Seus dados estão protegidos e criptografados
      </p>
    </div>
  );
}

