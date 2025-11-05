import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function SignupForm({ onSuccess, onSwitchToLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      // Validação
      if (password !== confirmPassword) {
        throw new Error('As senhas não coincidem');
      }

      if (password.length < 6) {
        throw new Error('A senha deve ter pelo menos 6 caracteres');
      }

      console.log('📝 SignupForm: Criando nova conta...');

      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      console.log('✅ SignupForm: Conta criada com sucesso!');

      setSuccess(true);
      
      // Aguardar 2 segundos e notificar sucesso
      setTimeout(() => {
        if (onSuccess) onSuccess(data.user);
      }, 2000);
    } catch (err) {
      console.error('❌ SignupForm: Erro no cadastro:', err);
      setError(err.message || 'Erro ao criar conta');
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <div className="mb-4">
            <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Conta criada com sucesso!
          </h2>
          <p className="text-gray-600 mb-6">
            Verifique seu email para confirmar sua conta.
          </p>
          <button
            onClick={onSwitchToLogin}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Voltar para Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Criar Conta
        </h1>
        <p className="text-gray-600">
          Comece a gerenciar seus investimentos
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
            minLength={6}
          />
          <p className="text-xs text-gray-500 mt-1">
            Mínimo de 6 caracteres
          </p>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirmar Senha
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          {loading ? 'Criando conta...' : 'Criar Conta'}
        </button>
      </form>

      {/* Switch to Login */}
      <div className="mt-6 text-center">
        <p className="text-gray-600 text-sm">
          Já tem uma conta?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-blue-600 hover:underline font-medium"
            disabled={loading}
          >
            Fazer login
          </button>
        </p>
      </div>
    </div>
  );
}

