import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { getAssetClasses, getTotalPatrimony } from '../../data/portfolioData-supabase';
import AssetClassCard from '../cards/AssetClassCard';
import EditAssetModal from '../modals/EditAssetModal';

export default function OverviewView() {
  const [assetClasses, setAssetClasses] = useState([]);
  const [totalPatrimony, setTotalPatrimony] = useState('0.00');
  const [loading, setLoading] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Carregar dados ao montar componente
  useEffect(() => {
    console.log('📱 OverviewView: Componente montado, verificando autenticação...');
    
    // Verificar autenticação
    checkUser();
    
    // Escutar mudanças de autenticação
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(`🔐 Auth event: ${event}`);
      setUser(session?.user || null);
      
      if (session?.user) {
        loadData();
      } else {
        setAssetClasses([]);
        setTotalPatrimony('0.00');
        setLoading(false);
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Verificar usuário atual
  async function checkUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        await loadData();
      } else {
        console.log('⚠️ OverviewView: Usuário não autenticado');
        setLoading(false);
      }
    } catch (error) {
      console.error('❌ OverviewView: Erro ao verificar usuário:', error);
      setLoading(false);
    }
  }

  // Carregar dados do Supabase
  async function loadData() {
    try {
      console.log('📊 OverviewView: Carregando dados do Supabase...');
      setLoading(true);
      
      const [classes, total] = await Promise.all([
        getAssetClasses(),
        getTotalPatrimony()
      ]);
      
      setAssetClasses(classes);
      setTotalPatrimony(total);
      
      console.log(`✅ OverviewView: Dados carregados! ${classes.length} classes, total: R$ ${total}`);
    } catch (error) {
      console.error('❌ OverviewView: Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  }

  // Abrir modal de edição
  function handleEditAsset(asset) {
    console.log('✏️ OverviewView: Editando ativo:', asset.symbol);
    setSelectedAsset(asset);
    setIsEditModalOpen(true);
  }

  // Fechar modal
  function handleCloseModal() {
    setIsEditModalOpen(false);
    setSelectedAsset(null);
  }

  // Recarregar dados após edição
  async function handleAssetUpdated() {
    console.log('🔄 OverviewView: Ativo atualizado, recarregando dados...');
    await loadData();
    handleCloseModal();
  }

  // Renderizar loading
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando portfólio...</p>
        </div>
      </div>
    );
  }

  // Renderizar tela de login se não autenticado
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">McDuck Dashboard</h2>
          <p className="text-gray-600 mb-6">
            Faça login para acessar seu portfólio de investimentos
          </p>
          <button
            onClick={() => window.location.href = '/login'}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Fazer Login
          </button>
        </div>
      </div>
    );
  }

  // Renderizar portfólio
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Visão Geral do Portfólio
        </h1>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600">Patrimônio Total</p>
            <p className="text-4xl font-bold text-green-600">
              R$ {parseFloat(totalPatrimony).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Logado como:</p>
            <p className="text-sm font-medium">{user.email}</p>
            <button
              onClick={() => supabase.auth.signOut()}
              className="text-sm text-red-600 hover:underline mt-1"
            >
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* Asset Classes */}
      <div className="grid grid-cols-1 gap-6">
        {assetClasses.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600 mb-4">Nenhum ativo encontrado</p>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={() => {/* TODO: Implementar adicionar ativo */}}
            >
              Adicionar Primeiro Ativo
            </button>
          </div>
        ) : (
          assetClasses.map((assetClass) => (
            <AssetClassCard
              key={assetClass.id}
              assetClass={assetClass}
              onEditAsset={handleEditAsset}
            />
          ))
        )}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && selectedAsset && (
        <EditAssetModal
          asset={selectedAsset}
          onClose={handleCloseModal}
          onSave={handleAssetUpdated}
        />
      )}
    </div>
  );
}

