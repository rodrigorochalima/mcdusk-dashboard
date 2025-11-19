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

      if (password !== confirmPassword) {
        throw new Error('As senhas não coincidem');
      }

      if (password.length < 6) {
        throw new Error('A senha deve ter pelo menos 6 caracteres');
      }

      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      setSuccess(true);
      
      setTimeout(() => {
        if (onSuccess) onSuccess(data.user);
      }, 2000);
    } catch (err) {
      setError(err.message || 'Erro ao criar conta');
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 50%, #FFE082 100%)',
        padding: '20px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '400px',
          background: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(255, 193, 7, 0.3)',
          padding: '48px 32px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #C8E6C9 0%, #81C784 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            boxShadow: '0 8px 24px rgba(129, 199, 132, 0.4)'
          }}>
            <span style={{ fontSize: '40px' }}>✓</span>
          </div>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#1A1A1A',
            marginBottom: '12px'
          }}>
            Conta criada!
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#666666',
            marginBottom: '32px',
            lineHeight: '1.5'
          }}>
            Verifique seu email para confirmar sua conta.
          </p>
          <button
            onClick={onSwitchToLogin}
            style={{
              padding: '16px 40px',
              fontSize: '17px',
              fontWeight: '700',
              color: '#FFFFFF',
              background: 'linear-gradient(135deg, #FFB300 0%, #FF8F00 100%)',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(255, 143, 0, 0.4)'
            }}
          >
            Voltar para Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 50%, #FFE082 100%)',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        background: '#FFFFFF',
        borderRadius: '24px',
        boxShadow: '0 20px 60px rgba(255, 193, 7, 0.3)',
        overflow: 'hidden'
      }}>
        {/* Logo e Título */}
        <div style={{
          padding: '48px 32px 32px',
          textAlign: 'center',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF9C4 100%)'
        }}>
          <img 
            src="/mcduck-icon.png" 
            alt="McDuck" 
            style={{
              width: '100px',
              height: '100px',
              marginBottom: '24px',
              filter: 'drop-shadow(0 4px 12px rgba(255, 193, 7, 0.4))'
            }}
          />
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#1A1A1A',
            marginBottom: '8px',
            letterSpacing: '-0.5px'
          }}>
            Criar Conta
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#666666',
            fontWeight: '400'
          }}>
            Comece a gerenciar seus investimentos
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '32px' }}>
          {/* Email */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '15px',
              fontWeight: '600',
              color: '#333333',
              marginBottom: '8px'
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: '16px',
                border: '2px solid #E0E0E0',
                borderRadius: '12px',
                outline: 'none',
                transition: 'all 0.2s',
                backgroundColor: loading ? '#F5F5F5' : '#FFFFFF',
                color: '#1A1A1A'
              }}
              onFocus={(e) => e.target.style.borderColor = '#FFC107'}
              onBlur={(e) => e.target.style.borderColor = '#E0E0E0'}
            />
          </div>

          {/* Senha */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '15px',
              fontWeight: '600',
              color: '#333333',
              marginBottom: '8px'
            }}>
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={loading}
              minLength={6}
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: '16px',
                border: '2px solid #E0E0E0',
                borderRadius: '12px',
                outline: 'none',
                transition: 'all 0.2s',
                backgroundColor: loading ? '#F5F5F5' : '#FFFFFF',
                color: '#1A1A1A'
              }}
              onFocus={(e) => e.target.style.borderColor = '#FFC107'}
              onBlur={(e) => e.target.style.borderColor = '#E0E0E0'}
            />
            <p style={{
              fontSize: '13px',
              color: '#999999',
              marginTop: '6px',
              marginBottom: 0
            }}>
              Mínimo de 6 caracteres
            </p>
          </div>

          {/* Confirmar Senha */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '15px',
              fontWeight: '600',
              color: '#333333',
              marginBottom: '8px'
            }}>
              Confirmar Senha
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: '16px',
                border: '2px solid #E0E0E0',
                borderRadius: '12px',
                outline: 'none',
                transition: 'all 0.2s',
                backgroundColor: loading ? '#F5F5F5' : '#FFFFFF',
                color: '#1A1A1A'
              }}
              onFocus={(e) => e.target.style.borderColor = '#FFC107'}
              onBlur={(e) => e.target.style.borderColor = '#E0E0E0'}
            />
          </div>

          {/* Erro */}
          {error && (
            <div style={{
              padding: '14px',
              marginBottom: '20px',
              backgroundColor: '#FFEBEE',
              border: '1px solid #FFCDD2',
              borderRadius: '12px',
              color: '#C62828',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              {error}
            </div>
          )}

          {/* Botão Criar Conta */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '17px',
              fontWeight: '700',
              color: '#FFFFFF',
              background: loading 
                ? 'linear-gradient(135deg, #BDBDBD 0%, #9E9E9E 100%)'
                : 'linear-gradient(135deg, #FFB300 0%, #FF8F00 100%)',
              border: 'none',
              borderRadius: '12px',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading ? 'none' : '0 8px 24px rgba(255, 143, 0, 0.4)',
              transition: 'all 0.3s',
              marginBottom: '20px'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 32px rgba(255, 143, 0, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 24px rgba(255, 143, 0, 0.4)';
              }
            }}
          >
            {loading ? 'Criando conta...' : 'Criar Conta'}
          </button>

          {/* Fazer login */}
          <div style={{ textAlign: 'center' }}>
            <span style={{ color: '#666666', fontSize: '15px' }}>
              Já tem uma conta?{' '}
            </span>
            <button
              type="button"
              onClick={onSwitchToLogin}
              disabled={loading}
              style={{
                background: 'none',
                border: 'none',
                color: '#F57C00',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Fazer login
            </button>
          </div>
        </form>

        {/* Footer */}
        <div style={{
          padding: '20px',
          textAlign: 'center',
          borderTop: '1px solid #F0F0F0',
          background: '#FAFAFA'
        }}>
          <p style={{
            fontSize: '13px',
            color: '#999999',
            margin: 0
          }}>
            🔒 Seus dados estão protegidos e criptografados
          </p>
        </div>
      </div>
    </div>
  );
}

