/**
 * Supabase Client Configuration
 * 
 * Este arquivo configura a conexão com o Supabase (PostgreSQL + Auth)
 * Substitui o localStorage por um banco de dados real na nuvem
 */

import { createClient } from '@supabase/supabase-js';

// Credenciais do Supabase (vêm das variáveis de ambiente)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validar que as credenciais estão configuradas
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Credenciais do Supabase não configuradas!');
  console.error('Verifique se as variáveis de ambiente estão definidas:');
  console.error('- VITE_SUPABASE_URL');
  console.error('- VITE_SUPABASE_ANON_KEY');
  throw new Error('Supabase credentials not configured');
}

// Criar cliente do Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Configurações de autenticação
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    
    // Storage para sessão (usa localStorage)
    storage: window.localStorage,
  },
  
  // Configurações de realtime (opcional)
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Log de inicialização (apenas em desenvolvimento)
if (import.meta.env.DEV) {
  console.log('🚀 Supabase client inicializado!');
  console.log('📍 URL:', supabaseUrl);
}

// Helper: Verificar se usuário está autenticado
export async function isAuthenticated() {
  const { data: { session } } = await supabase.auth.getSession();
  return !!session;
}

// Helper: Obter usuário atual
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// Helper: Fazer logout
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('❌ Erro ao fazer logout:', error);
    throw error;
  }
  console.log('✅ Logout realizado com sucesso!');
}

// Helper: Escutar mudanças de autenticação
export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange((event, session) => {
    console.log('🔐 Auth state changed:', event);
    callback(event, session);
  });
}

export default supabase;

