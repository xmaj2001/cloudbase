'use client';

import { useState } from 'react';
import { conectarGoogleDrive } from '@/lib/firebase/firebaseClient';

export default function ConnectGoogleDriverBtn() {
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    try {
      const tokens = await conectarGoogleDrive();
      
      // Envia o token para a tua API do Next.js guardar na Base de Dados
      const response = await fetch('/api/auth/connect-drive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokens.firebaseIdToken}` // Rota protegida
        },
        body: JSON.stringify({ googleAccessToken: tokens.googleAccessToken }),
      });

      if (response.ok) {
        alert('Google Drive integrado com sucesso no teu ecossistema! 🚀');
      } else {
        alert('A API rejeitou a conexão do Drive.');
      }
    } catch (err) {
      console.error(err);
      alert('Cancelaste ou falhou a integração.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleConnect}
      disabled={loading}
      style={{
        padding: '12px 20px',
        backgroundColor: '#E8500A', // Cor de destaque Ember (Laranja Corporativo)
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '2px', // Bordas de 2px
        cursor: loading ? 'not-allowed' : 'pointer',
        fontWeight: '600',
        fontSize: '14px',
        transition: 'background-color 0.2s ease',
      }}
    >
      {loading ? 'A autorizar Drive...' : 'Ativar Integração Google Drive'}
    </button>
  );
}