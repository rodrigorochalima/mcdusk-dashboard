import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function LoginForm({ onSuccess, onSwitchToSignup }) {
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

      // Notificar sucesso
      if (onSuccess) onSuccess(data.user);
    } catch (err) {
      console.error('❌ LoginForm: Erro no login:', err);
      setError(err.message || 'Erro ao fazer login');
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          McDuck Dashboard
        </h1>
        <p className="text-gray-600">
          Faça login para acessar seu portfólio
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="seu@email.com"
            required
            disabled={loading}
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Senha
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="••••••••"
            required
            disabled={loading}
          />
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          disabled={loading}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      {/* Switch to Signup */}
      <div className="mt-6 text-center">
        <p className="text-gray-600 text-sm">
          Não tem uma conta?{' '}
          <button
            onClick={onSwitchToSignup}
            className="text-blue-600 hover:underline font-medium"
            disabled={loading}
          >
            Criar conta
          </button>
        </p>
      </div>
    </div>
  );
}

