import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import McDuckLogo from './McDuckLogo';

export default function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);

      console.log('📧 ForgotPassword: Enviando email de recuperação...');

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (resetError) throw resetError;

      console.log('✅ ForgotPassword: Email enviado com sucesso!');
      setSuccess(true);
    } catch (err) {
      console.error('❌ ForgotPassword: Erro:', err);
      setError(err.message || 'Erro ao enviar email');
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="w-full max-w-md mx-auto p-4 sm:p-6">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden p-8">
          <div className="text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Email enviado!
            </h2>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
            </p>
            <button
              onClick={onBack}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all font-semibold shadow-lg"
            >
              Voltar para Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 px-6 sm:px-8 pt-8 pb-6 text-center">
          <McDuckLogo size={80} />
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Recuperar Senha
          </h1>
          <p className="text-blue-100 text-sm sm:text-base">
            Digite seu email para receber instruções
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
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
              placeholder="seu@email.com"
              required
              disabled={loading}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg text-sm">
              <span className="font-semibold">Erro:</span> {error}
            </div>
          )}

          {/* Info */}
          <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 px-4 py-3 rounded-lg text-sm">
            <p className="font-semibold mb-1">ℹ️ Como funciona:</p>
            <p>Você receberá um email com um link para redefinir sua senha.</p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </span>
            ) : (
              '📧 Enviar Email de Recuperação'
            )}
          </button>
        </form>

        {/* Back to Login */}
        <div className="px-6 sm:px-8 pb-6 text-center border-t border-gray-100 pt-6">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-700 font-medium hover:underline text-sm"
            disabled={loading}
          >
            ← Voltar para Login
          </button>
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-gray-500 text-xs mt-6">
        🔒 Seus dados estão protegidos e criptografados
      </p>
    </div>
  );
}

