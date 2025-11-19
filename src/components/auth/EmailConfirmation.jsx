import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

export default function EmailConfirmation() {
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    handleEmailConfirmation();
  }, []);

  async function handleEmailConfirmation() {
    try {
      // Pegar hash da URL
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const type = hashParams.get('type');

      if (type === 'signup' && accessToken) {
        // Email confirmado com sucesso
        setStatus('success');
        setMessage('Sua conta foi confirmada com sucesso!');
        
        // Redirecionar para dashboard após 3 segundos
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      } else if (type === 'recovery' && accessToken) {
        // Recuperação de senha
        setStatus('success');
        setMessage('Você pode redefinir sua senha agora.');
        
        setTimeout(() => {
          window.location.href = '/reset-password';
        }, 2000);
      } else {
        setStatus('error');
        setMessage('Link inválido ou expirado.');
      }
    } catch (error) {
      console.error('Erro ao confirmar email:', error);
      setStatus('error');
      setMessage('Ocorreu um erro ao confirmar seu email.');
    }
  }

  function handleGoToDashboard() {
    window.location.href = '/';
  }

  if (status === 'loading') {
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
          maxWidth: '500px',
          background: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(255, 193, 7, 0.3)',
          padding: '64px 40px',
          textAlign: 'center'
        }}>
          {/* Logo */}
          <img 
            src="/mcduck-icon.png" 
            alt="McDuck Dashboard" 
            style={{
              width: '120px',
              height: '120px',
              marginBottom: '32px',
              filter: 'drop-shadow(0 4px 12px rgba(255, 193, 7, 0.4))',
              animation: 'pulse 2s ease-in-out infinite'
            }}
          />

          {/* Título */}
          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#1A1A1A',
            marginBottom: '16px',
            letterSpacing: '-0.5px'
          }}>
            Confirmando...
          </h1>

          {/* Mensagem */}
          <p style={{
            fontSize: '16px',
            color: '#666666',
            marginBottom: '32px',
            lineHeight: '1.6'
          }}>
            Aguarde enquanto confirmamos seu email.
          </p>

          {/* Loading spinner */}
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid #FFE082',
            borderTop: '4px solid #FF8F00',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }} />
        </div>

        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
        `}</style>
      </div>
    );
  }

  if (status === 'success') {
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
          maxWidth: '500px',
          background: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(255, 193, 7, 0.3)',
          padding: '64px 40px',
          textAlign: 'center'
        }}>
          {/* Logo */}
          <img 
            src="/mcduck-icon.png" 
            alt="McDuck Dashboard" 
            style={{
              width: '120px',
              height: '120px',
              marginBottom: '32px',
              filter: 'drop-shadow(0 4px 12px rgba(255, 193, 7, 0.4))'
            }}
          />

          {/* Ícone de sucesso */}
          <div style={{
            width: '100px',
            height: '100px',
            background: 'linear-gradient(135deg, #C8E6C9 0%, #81C784 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 32px',
            boxShadow: '0 8px 24px rgba(129, 199, 132, 0.4)',
            animation: 'scaleIn 0.5s ease-out'
          }}>
            <span style={{ fontSize: '56px', color: '#FFFFFF' }}>✓</span>
          </div>

          {/* Título */}
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#1A1A1A',
            marginBottom: '16px',
            letterSpacing: '-0.5px'
          }}>
            Email Confirmado!
          </h1>

          {/* Mensagem */}
          <p style={{
            fontSize: '18px',
            color: '#666666',
            marginBottom: '40px',
            lineHeight: '1.6'
          }}>
            {message}
          </p>

          {/* Botão */}
          <button
            onClick={handleGoToDashboard}
            style={{
              padding: '18px 48px',
              fontSize: '18px',
              fontWeight: '700',
              color: '#FFFFFF',
              background: 'linear-gradient(135deg, #FFB300 0%, #FF8F00 100%)',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(255, 143, 0, 0.4)',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 12px 32px rgba(255, 143, 0, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 24px rgba(255, 143, 0, 0.4)';
            }}
          >
            Ir para o Dashboard
          </button>

          {/* Footer */}
          <p style={{
            fontSize: '14px',
            color: '#999999',
            marginTop: '32px'
          }}>
            Redirecionando automaticamente em 3 segundos...
          </p>
        </div>

        <style>{`
          @keyframes scaleIn {
            0% { transform: scale(0); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}</style>
      </div>
    );
  }

  if (status === 'error') {
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
          maxWidth: '500px',
          background: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(255, 193, 7, 0.3)',
          padding: '64px 40px',
          textAlign: 'center'
        }}>
          {/* Logo */}
          <img 
            src="/mcduck-icon.png" 
            alt="McDuck Dashboard" 
            style={{
              width: '120px',
              height: '120px',
              marginBottom: '32px',
              filter: 'drop-shadow(0 4px 12px rgba(255, 193, 7, 0.4))'
            }}
          />

          {/* Ícone de erro */}
          <div style={{
            width: '100px',
            height: '100px',
            background: 'linear-gradient(135deg, #FFCDD2 0%, #EF5350 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 32px',
            boxShadow: '0 8px 24px rgba(239, 83, 80, 0.4)'
          }}>
            <span style={{ fontSize: '56px', color: '#FFFFFF' }}>✕</span>
          </div>

          {/* Título */}
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#1A1A1A',
            marginBottom: '16px',
            letterSpacing: '-0.5px'
          }}>
            Ops! Algo deu errado
          </h1>

          {/* Mensagem */}
          <p style={{
            fontSize: '18px',
            color: '#666666',
            marginBottom: '40px',
            lineHeight: '1.6'
          }}>
            {message}
          </p>

          {/* Botão */}
          <button
            onClick={handleGoToDashboard}
            style={{
              padding: '18px 48px',
              fontSize: '18px',
              fontWeight: '700',
              color: '#FFFFFF',
              background: 'linear-gradient(135deg, #FFB300 0%, #FF8F00 100%)',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(255, 143, 0, 0.4)',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 12px 32px rgba(255, 143, 0, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 24px rgba(255, 143, 0, 0.4)';
            }}
          >
            Voltar para o Início
          </button>
        </div>
      </div>
    );
  }

  return null;
}

